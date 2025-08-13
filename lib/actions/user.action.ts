"use server";

import { User } from "@/database";
import action from "../handlers/action";
import handleError from "../handlers/error";
import {
  GetPushTokenSchema,
  GetUserSchema,
  UpdatePushTokenSchema,
  UpdateUserSchema,
} from "../validations";
import { IUserDoc } from "@/database/user.model";

export async function getUser(
  params: GetUserParams
): Promise<ActionResponse<{ user: IUserDoc }>> {
  const validationResult = await action({
    params,
    schema: GetUserSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { userId } = validationResult.params!;

  try {
    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");

    return {
      success: true,
      data: {
        user: JSON.parse(JSON.stringify(user)),
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function updateUser(
  params: UpdateUserParams
): Promise<ActionResponse<{ user: IUserDoc }>> {
  const validationResult = await action({
    params,
    schema: UpdateUserSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { user } = validationResult.session!;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      user?.id,
      {
        ...validationResult.params,
      },
      { new: true }
    );

    return {
      success: true,
      data: {
        user: JSON.parse(JSON.stringify(updatedUser)),
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function updatePushToken(
  params: UpdatePushTokenParams
): Promise<ActionResponse<{ success: boolean }>> {
  const validationResult = await action({
    params,
    schema: UpdatePushTokenSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { userId, token } = validationResult.params!;

  try {
    await User.findByIdAndUpdate(userId, { pushToken: token });

    return {
      success: true,
      data: {
        success: true,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getPushToken(
  params: GetPushTokenParams
): Promise<ActionResponse<{ token: string }>> {
  const validationResult = await action({
    params,
    schema: GetPushTokenSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { userId } = validationResult.params!;

  try {
    const user = await User.findById(userId);

    if (!user || !user.pushToken) {
      throw new Error("Push token not found for this user");
    }

    return {
      success: true,
      data: {
        token: user.pushToken,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
