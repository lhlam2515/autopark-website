"use server";

import mongoose, { PipelineStage } from "mongoose";
import Session, { ISessionDoc } from "@/database/session.model";
import action from "../handlers/action";
import handleError from "../handlers/error";
import {
  CreateSessionSchema,
  GetCurrentSessionSchema,
  LockParkingSessionSchema,
  ProcessPaymentSchema,
} from "../validations";
import { Slot } from "@/database";

export async function createSession(
  params: CreateSessionParams
): Promise<ActionResponse<{ parkingSession: ISessionDoc; user: string }>> {
  const validationResult = await action({
    params,
    schema: CreateSessionSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { slotId } = validationResult.params!;
  const { id: userId, name: userName } = validationResult.session?.user || {};

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
        user: userName!,
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

export async function lockParkingSession(
  params: LockParkingSessionParams
): Promise<ActionResponse<null>> {
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

    return {
      success: true,
      data: null,
    };
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
      data: { userId: userId as string, sessionId: updatedSession._id },
    };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    session.endSession();
  }
}
