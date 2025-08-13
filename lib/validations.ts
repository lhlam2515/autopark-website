import { z } from "zod";

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please provide a valid email address." }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long. " })
    .max(100, { message: "Password cannot exceed 100 characters." }),
});

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(30, { message: "Username cannot exceed 30 characters." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores.",
    }),

  name: z
    .string()
    .min(1, { message: "Name is required." })
    .max(50, { message: "Name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name can only contain letters and spaces.",
    }),

  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please provide a valid email address." }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password cannot exceed 100 characters." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    }),
});

export const UserSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." }),
  email: z.string().email({ message: "Please provide a valid email address." }),
  image: z.string().url({ message: "Image must be a valid URL." }).optional(),
  phone: z.string().optional(),
});

export const AccountSchema = z.object({
  userId: z.string().min(1, { message: "User ID is required." }),
  name: z.string().min(1, { message: "Name is required." }),
  image: z.string().url({ message: "Please provide a valid URL." }).optional(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password cannot exceed 100 characters." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    })
    .optional(),
  provider: z.string().min(1, { message: "Provider is required." }),
  providerAccountId: z
    .string()
    .min(1, { message: "Provider Account ID is required." }),
});

export const SigninWithOAuthSchema = z.object({
  provider: z.enum(["google"]),
  providerAccountId: z
    .string()
    .min(1, { message: "Provider Account ID is required." }),
  user: z.object({
    name: z.string().min(1, { message: "Name is required." }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long." }),
    email: z
      .string()
      .email({ message: "Please provide a valid email address." }),
    image: z.string().url({ message: "Invalid image URL." }).optional(),
  }),
});

export const ProfileSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(30, { message: "Username cannot exceed 30 characters." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores.",
    }),
  phone: z
    .string()
    .regex(/^\d{10}$/, { message: "Phone number must be 10 digits long." })
    .optional(),
  cardNumber: z
    .string()
    .regex(/^\d{16}$/, { message: "Card number must be 16 digits long." })
    .optional(),
  cardExpiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
      message: "Card expiry must be in MM/YY format.",
    })
    .optional(),
});

export const GetUserSchema = z.object({
  userId: z.string().min(1, { message: "User ID is required." }),
});

export const UpdateUserSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }).optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." })
    .optional(),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits long." })
    .optional(),
  cardNumber: z
    .string()
    .min(16, { message: "Card number must be at least 16 digits long." })
    .optional(),
  cardExpiry: z
    .string()
    .min(5, { message: "Card expiry must be at least 5 characters long." })
    .optional(),
});

export const SendWelcomeEmailParams = z.object({
  userId: z.string().min(1, { message: "User ID is required." }),
});

export const SendNotificationEmailSchema = z.object({
  userId: z.string().min(1, { message: "User ID is required." }),
  sessionId: z.string().min(1, { message: "Session ID is required." }),
});

export const CreateSlotSchema = z.object({
  slotId: z.string().min(1, { message: "Slot ID is required." }),
  location: z.string().min(1, { message: "Location is required." }),
  deviceId: z.string().min(1, { message: "Device ID is required." }),
});

export const GetSlotSchema = z.object({
  slotId: z.string().min(1, { message: "Slot ID is required." }),
});

export const CreateSessionSchema = z.object({
  slotId: z.string().min(1, { message: "Slot ID is required." }),
});

export const GetCurrentSessionSchema = z.object({
  userId: z.string().min(1, { message: "User ID is required." }),
});

export const LockParkingSessionSchema = z.object({
  userId: z.string().min(1, { message: "User ID is required." }),
  slotId: z.string().min(1, { message: "Slot ID is required." }),
  lock: z.boolean().optional().default(true),
});

export const ProcessPaymentSchema = z.object({
  fee: z.number().min(0, { message: "Fee must be a positive number." }),
});

export const VerifyOTPSchema = z.object({
  OTP: z
    .string()
    .min(6, { message: "OTP must be at least 6 characters long." }),
  slotId: z.string().min(1, { message: "Slot ID is required." }),
});

export const UpdatePushTokenSchema = z.object({
  userId: z.string().min(1, { message: "User ID is required." }),
  token: z.string().min(1, { message: "Push token is required." }),
});

export const GetPushTokenSchema = z.object({
  userId: z.string().min(1, { message: "User ID is required." }),
});
