import { Auth } from "@polybase/auth";

const auth = typeof window !== "undefined" ? new Auth() : null;

export const signMessage = async (message: string) => {
  auth?.isAuthenticated ? null : await signIn();
  return await auth?.ethPersonalSign(message);
};

export const signIn = async () => {
  return await auth?.signIn();
};

export const signOut = async () => {
  return await auth?.signOut();
};

export default auth;
