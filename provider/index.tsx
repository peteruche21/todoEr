"use client";
import { PolybaseProvider, AuthProvider } from "@polybase/react";
import { PropsWithChildren } from "react";
import TodoErDB from "../db/client";
import auth from "../db/auth";

const PolybaseProviders = ({ children }: PropsWithChildren) => {
  return (
    <PolybaseProvider polybase={TodoErDB}>
      <AuthProvider auth={auth!} polybase={TodoErDB}>
        {children}
      </AuthProvider>
    </PolybaseProvider>
  );
};

export default PolybaseProviders;
