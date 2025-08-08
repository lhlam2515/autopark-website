import { User } from "@/database";
import action from "../handlers/action";
import handleError from "../handlers/error";
import {
  SendNotificationEmailSchema,
  SendWelcomeEmailParams,
} from "../validations";
import { Resend } from "resend";
import WelcomeEmail from "@/components/emails/WelcomeEmail";
import NotificationEmail from "@/components/emails/NotificationEmail";

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

  const { userId } = validationResult.params!;

  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    const { name, email } = user;

    // Sending with dummy data right now
    const checkInTime = new Date().toLocaleString();
    const checkOutTime = new Date(
      Date.now() + 2 * 60 * 60 * 1000
    ).toLocaleString();
    const location = "227 Nguyen Van Cu, District 5, Ho Chi Minh City";
    const slotID = "S25-3";

    const emailContent = NotificationEmail({
      name,
      checkInTime,
      checkOutTime,
      location,
      slotID,
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
