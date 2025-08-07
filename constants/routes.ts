const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  DASHBOARD: "/dashboard",
  USERS: "/users",
  STATIONS: "/stations",
  PROFILE: (id: string) => `/profile/${id}`,
  EDIT_PROFILE: "/profile/edit",
};

export default ROUTES;
