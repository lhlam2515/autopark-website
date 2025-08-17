"use server";

import { Slot } from "@/database";
import handleError from "../handlers/error";
import {
  PingSlotSchema,
  UpdatePushTokenSchema,
  VerifyOTPSchema,
} from "../validations";
import { child, DataSnapshot, off, onValue, ref, set } from "firebase/database";
import { database } from "../firebase";
import { createSession } from "./session.action";
import { getUser } from "./user.action";
import action from "../handlers/action";

export async function verifyOTP(
  params: VerifyOTPParams
): Promise<ActionResponse> {
  const validation = VerifyOTPSchema.safeParse(params);
  if (!validation.success) {
    return handleError(validation.error.flatten().fieldErrors) as ErrorResponse;
  }

  const { OTP, slotId, userId } = validation.data;

  try {
    const slot = await Slot.findOne({ slotId });
    if (!slot) throw new Error("Slot not found");

    const slotIndex = slotId.split("-")[1];
    const slotRef = ref(
      database,
      `devices/${slot.deviceId}/slots/${slotIndex}`
    );

    // Return a Promise that resolves when OTP is verified
    return new Promise<ActionResponse>((resolve, reject) => {
      const listener = async (snapshot: DataSnapshot) => {
        try {
          const receivedOTP = snapshot.val();
          if (receivedOTP && receivedOTP != "") {
            if (receivedOTP !== OTP) {
              resolve({ success: false });
            }

            off(child(slotRef, "OTP"), "value", listener);

            // Remove OTP from Firebase
            await set(child(slotRef, "OTP"), "");

            // Create parking session
            const { success, data, error } = await createSession({
              userId,
              slotId: slot.id as string,
            });

            if (!success) {
              throw new Error(error?.message || "Failed to create session");
            }

            const {
              success: userSuccess,
              data: userData,
              error: userError,
            } = await getUser({
              userId: data?.parkingSession?.userId.toString() || "",
            });

            if (!userSuccess) {
              throw new Error(userError?.message || "Failed to get user");
            }

            // Set user name and availability
            await set(
              child(slotRef, "name"),
              userData?.user?.name || "Unknown User"
            );
            await set(child(slotRef, "checkInTime"), new Date().toISOString());
            await set(child(slotRef, "userId"), userData?.user?._id || "");
            await set(child(slotRef, "available"), false);

            resolve({ success: true });
          }
        } catch (error) {
          off(child(slotRef, "OTP"), "value", listener);
          reject(handleError(error));
        }
      };

      onValue(child(slotRef, "OTP"), listener);
    });
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function updatePushToken(
  params: UpdatePushTokenParams
): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: UpdatePushTokenSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { userId, token } = validationResult.params!;

  try {
    const usersRef = ref(database, `users`);

    await set(child(usersRef, userId), { fcmToken: token });

    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function pingSlot(
  params: PingSlotParams
): Promise<ActionResponse> {
  const validation = PingSlotSchema.safeParse(params);
  if (!validation.success) {
    return handleError(validation.error.flatten().fieldErrors) as ErrorResponse;
  }

  const { deviceId, slotId, ping } = validation.data;

  try {
    const slotIndex = slotId.split("-")[1];
    const slotRef = ref(database, `devices/${deviceId}/slots/${slotIndex}`);

    await set(child(slotRef, "ping"), ping);

    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
