import admin from "firebase-admin";
import { Message } from "firebase-admin/messaging";

import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-errors";
import { NotificationSchema } from "@/lib/validations";
import { firebaseConfig } from "@/lib/firebase";
import { NextResponse } from "next/server";
import { getPushToken } from "@/lib/actions/user.action";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({ ...firebaseConfig }),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validatedData = NotificationSchema.safeParse(body);

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const { userId, title, message, link } = validatedData.data;

    const { success, data, error } = await getPushToken({ userId });
    if (!success) {
      throw new Error(error?.message);
    }

    const { token } = data!;

    const payload: Message = {
      token,
      notification: {
        title: title,
        body: message,
      },
      webpush: link && {
        fcmOptions: {
          link,
        },
      },
    };

    await admin.messaging().send(payload);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
