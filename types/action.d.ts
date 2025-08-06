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
