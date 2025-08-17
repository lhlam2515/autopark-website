"use server";

import mongoose, { PipelineStage } from "mongoose";
import Slot, { ISlot } from "@/database/slot.model";
import action from "../handlers/action";
import handleError from "../handlers/error";
import {
  CheckSlotAvailabilitySchema,
  CreateSlotSchema,
  GetSlotSchema,
} from "../validations";
import { NotFoundError } from "../http-errors";

export const createSlot = async (
  params: CreateSlotParams
): Promise<ActionResponse<{ slot: ISlot }>> => {
  const validationResult = await action({
    params,
    schema: CreateSlotSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { slotId, location, deviceId } = validationResult.params!;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const [newSlot] = await Slot.create(
      [
        {
          slotId,
          location,
          deviceId,
        },
      ],
      { session }
    );

    await session.commitTransaction();

    return {
      success: true,
      data: {
        slot: JSON.parse(JSON.stringify(newSlot)),
      },
    };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    session.endSession();
  }
};

export const getSlots = async (): Promise<
  ActionResponse<{ slots: ISlot[] }>
> => {
  const validationResult = await action({ authorize: true });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    const slots = await Slot.find();

    return {
      success: true,
      data: {
        slots: JSON.parse(JSON.stringify(slots)),
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const getSlot = async (
  params: GetSlotParams
): Promise<ActionResponse<{ slot: ISlot }>> => {
  const validationResult = await action({
    params,
    schema: GetSlotSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { slotId } = validationResult.params!;

  try {
    const slot = await Slot.findOne({ slotId });

    if (!slot) throw new NotFoundError("Slot");

    return {
      success: true,
      data: {
        slot: JSON.parse(JSON.stringify(slot)),
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const checkSlotAvailability = async (
  params: CheckSlotAvailabilityParams
): Promise<ActionResponse<{ isAvailable: boolean }>> => {
  const validationResult = await action({
    params,
    schema: CheckSlotAvailabilitySchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { slotId } = validationResult.params!;

  try {
    const pipeline: PipelineStage[] = [
      { $match: { slotId } },
      {
        $lookup: {
          from: "sessions",
          localField: "_id",
          foreignField: "slotId",
          as: "session",
        },
      },
      { $unwind: "$session" },
      { $project: { isActive: "$session.isActive" } },
    ];

    const activatedSessions = await Slot.aggregate(pipeline);
    const isAvailable = !activatedSessions.some((session) => session.isActive);

    return {
      success: true,
      data: {
        isAvailable,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};
