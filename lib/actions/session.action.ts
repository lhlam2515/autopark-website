"use server";

import mongoose, { PipelineStage } from "mongoose";
import Session, { ISessionDoc } from "@/database/session.model";
import action from "../handlers/action";
import handleError from "../handlers/error";
import {
  CreateSessionSchema,
  GetCurrentSessionSchema,
  GetParkingHistorySchema,
  LockParkingSessionSchema,
  ProcessPaymentSchema,
} from "../validations";
import { Slot } from "@/database";
import { calculateDuration } from "../utils";
import { child, ref, set } from "firebase/database";
import { database } from "../firebase";

export async function createSession(
  params: CreateSessionParams
): Promise<ActionResponse<{ parkingSession: ISessionDoc }>> {
  const validationResult = await action({
    params,
    schema: CreateSessionSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { slotId } = validationResult.params!;
  const { id: userId } = validationResult.session?.user || {};

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const [newSession] = await Session.create(
      [
        {
          userId,
          slotId,
          checkInTime: new Date(),
        },
      ],
      { session }
    );

    if (!newSession) {
      throw new Error("Failed to create session");
    }

    await session.commitTransaction();

    return {
      success: true,
      data: {
        parkingSession: JSON.parse(JSON.stringify(newSession)),
      },
    };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    session.endSession();
  }
}

export async function getCurrentSession(
  params: GetCurrentSessionParams
): Promise<ActionResponse<{ session: ParkingSession }>> {
  const validationResult = await action({
    params,
    schema: GetCurrentSessionSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { userId } = validationResult.params!;

  try {
    const pipeline: PipelineStage[] = [
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          isActive: true,
        },
      },
      {
        $lookup: {
          from: "slots",
          localField: "slotId",
          foreignField: "_id",
          as: "slot",
        },
      },
      { $unwind: "$slot" }, // flatten slot array
      {
        $project: {
          slot: {
            slotId: "$slot.slotId",
            location: "$slot.location",
            deviceId: "$slot.deviceId",
          },
          checkInTime: 1,
          locked: 1,
          paymentStatus: 1,
        },
      },
    ];

    const [detailedSession] = await Session.aggregate(pipeline);

    if (!detailedSession) {
      throw new Error("Parking session not found");
    }

    return {
      success: true,
      data: {
        session: JSON.parse(JSON.stringify(detailedSession)),
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getParkingHistory(
  params: GetParkingHistoryParams
): Promise<
  ActionResponse<{
    totalSessions: number;
    totalSpent: number;
    averageDuration: number;
    history: HistoryEntry[];
  }>
> {
  const validationResult = await action({
    params,
    schema: GetParkingHistorySchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { userId } = validationResult.params!;

  try {
    const pipeline: PipelineStage[] = [
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "slots",
          localField: "slotId",
          foreignField: "_id",
          as: "slot",
        },
      },
      { $unwind: "$slot" },
      {
        $project: {
          slotId: "$slot.slotId",
          checkInTime: 1,
          checkOutTime: 1,
          fee: 1,
          paymentStatus: 1,
        },
      },
      {
        $sort: {
          checkInTime: -1,
        },
      },
    ];

    const history = await Session.aggregate(pipeline);

    const totalSessions = history.length;
    let totalSpent = 0;
    let averageDuration = 0;

    history.forEach(({ checkInTime, checkOutTime, fee }) => {
      const duration = calculateDuration(checkInTime, checkOutTime);
      totalSpent += fee || 0;
      averageDuration += duration;
    });
    averageDuration = totalSessions > 0 ? averageDuration / totalSessions : 0;

    return {
      success: true,
      data: {
        totalSessions,
        totalSpent,
        averageDuration,
        history: JSON.parse(JSON.stringify(history)),
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function lockParkingSession(
  params: LockParkingSessionParams
): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: LockParkingSessionSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { userId, slotId, lock } = validationResult.params!;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const slot = await Slot.findOne({ slotId }).session(session);
    if (!slot) {
      throw new Error("Slot not found");
    }

    const updatedSession = await Session.findOneAndUpdate(
      { userId, slotId: slot._id, isActive: true },
      { locked: lock, isActive: lock },
      { new: true }
    );

    if (!updatedSession) {
      throw new Error("Parking session not found");
    }

    await session.commitTransaction();

    const slotIndex = slotId.split("-")[1];
    const slotRef = ref(
      database,
      `/devices/${slot.deviceId}/slots/${slotIndex}`
    );

    await set(child(slotRef, "locked"), lock);

    if (!lock) {
      await set(child(slotRef, "available"), true);
      await set(child(slotRef, "name"), "");
      await set(child(slotRef, "userId"), null);
    }

    return { success: true };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    session.endSession();
  }
}

export async function processPayment(
  params: ProcessPaymentParams
): Promise<ActionResponse<{ userId: string; sessionId: string }>> {
  const validationResult = await action({
    params,
    schema: ProcessPaymentSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { fee } = validationResult.params!;
  const userId = validationResult.session?.user?.id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const updatedSession = await Session.findOneAndUpdate(
      { userId, isActive: true },
      { paymentStatus: "paid", fee, checkOutTime: new Date() },
      { new: true }
    ).session(session);

    if (!updatedSession) {
      throw new Error("Parking session not found");
    }

    await session.commitTransaction();

    return {
      success: true,
      data: {
        userId: userId as string,
        sessionId: updatedSession._id as string,
      },
    };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    session.endSession();
  }
}
