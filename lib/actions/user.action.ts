"use server";

import { User } from "@/database";
import action from "../handlers/action";
import handleError from "../handlers/error";
import { GetUserSchema } from "../validations";
import { IUser } from "@/database/user.model";

export async function getUser(
  params: GetUserParams
): Promise<ActionResponse<{ user: IUser }>> {
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
