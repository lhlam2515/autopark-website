"use server";

import { User } from "@/database";
import action from "../handlers/action";
import handleError from "../handlers/error";
import { GetUserSchema, UpdateUserSchema } from "../validations";
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
