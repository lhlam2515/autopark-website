"use server";

import { Session, User } from "@/database";
import action from "../handlers/action";
import handleError from "../handlers/error";
import {
  SendNotificationEmailSchema,
  SendWelcomeEmailParams,
} from "../validations";
import { Resend } from "resend";
import WelcomeEmail from "@/components/emails/WelcomeEmail";
import NotificationEmail from "@/components/emails/NotificationEmail";
import { formatDate } from "../utils";
import mongoose, { PipelineStage } from "mongoose";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";

export async function sendWelcomeEmail(
  params: SendWelcomeEmailParams
): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: SendWelcomeEmailParams,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { userId } = validationResult.params!;

  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    const { name, email } = user;

    const emailContent = WelcomeEmail({ name });

    const result = await resend.emails.send({
      from: `AutoPark <${fromEmail}>`,
      to: email,
      subject: "Welcome to AutoPark!",
      react: emailContent,
    });

    if (result.error) {
      throw new Error(`Failed to send email: ${result.error.message}`);
    }

    return {
      success: true,
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function sendNotificationEmail(
  params: SendNotificationEmailParams
): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: SendNotificationEmailSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { userId, sessionId } = validationResult.params!;

  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    const { name, email } = user;

    const pipeline: PipelineStage[] = [
      {
        $match: {
          _id: new mongoose.Types.ObjectId(sessionId),
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
      { $unwind: "$slot" }, // flatten slot array
      {
        $project: {
          slot: {
            slotId: "$slot.slotId",
            location: "$slot.location",
          },
          checkInTime: 1,
          checkOutTime: 1,
          fee: 1,
        },
      },
    ];

    const [parkingSession] = await Session.aggregate(pipeline);

    const slotID = parkingSession.slot?.slotId || "Unknown Slot";
    const location = parkingSession.slot?.location || "Unknown Location";
    const checkInTime = formatDate(parkingSession.checkInTime);
    const checkOutTime = formatDate(parkingSession.checkOutTime);
    const fee = parkingSession.fee;

    const emailContent = NotificationEmail({
      name,
      slotID,
      location,
      checkInTime,
      checkOutTime,
      fee,
    });

    const result = await resend.emails.send({
      from: `AutoPark <${fromEmail}>`,
      to: email,
      subject: "Your Parking Session Details",
      react: emailContent,
    });

    if (result.error) {
      throw new Error(`Failed to send email: ${result.error.message}`);
    }

    return {
      success: true,
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
