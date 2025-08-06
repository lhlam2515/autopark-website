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
