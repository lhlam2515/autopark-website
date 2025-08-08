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
