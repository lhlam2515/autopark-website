"use server";

import mongoose from "mongoose";
import Session, { ISessionDoc } from "@/database/session.model";
import action from "../handlers/action";
import handleError from "../handlers/error";
import { CreateSessionSchema } from "../validations";

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
  const userId = validationResult.session?.user?.id;

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
    return handleError(error) as ErrorResponse;
  }
}
