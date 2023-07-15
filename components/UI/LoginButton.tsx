import { useAuth, useIsAuthenticated } from "@polybase/react";

const LoginButton = ({ setAuthState }: { setAuthState: any }) => {
  const [isLoggedIn] = useIsAuthenticated();
  const { auth } = useAuth();

  const login = async () => {
    const authStaten = await auth.signIn();
    console.log(authStaten);
    setAuthState(authStaten);
  };
  return (
    <button className="btn" onClick={login}>
      {isLoggedIn ? "connected" : "log in"}
    </button>
  );
};

export default LoginButton;
