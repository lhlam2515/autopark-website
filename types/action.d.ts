interface SignInWithOAuthParams {
  provider: "google";
  providerAccountId: string;
  user: {
    name: string;
    username: string;
    email: string;
    image?: string;
  };
}

interface AuthCredentials {
  email: string;
  password: string;
  username: string;
  name: string;
}

interface GetUserParams {
  userId: string;
}

interface UpdateUserParams {
  name?: string;
  username?: string;
  phone?: string;
  cardNumber?: string;
  cardExpiry?: string;
}

interface SendWelcomeEmailParams {
  userId: string;
}

interface SendNotificationEmailParams {
  userId: string;
}

interface CreateSlotParams {
  slotId: string;
  location: string;
  deviceId: string;
}

interface GetSlotParams {
  slotId: string;
}

interface CreateSessionParams {
  slotId: string;
}

interface GetCurrentSessionParams {
  userId: string;
}
interface LockParkingSessionParams {
  userId: string;
  slotId: string;
  lock?: boolean;
}

interface ProcessPaymentParams {
  fee: number;
}
