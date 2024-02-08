import React, { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Role from "@/src/enums/roles";

type AuthContextType = {
  auth: {
    userId: string | null;
    token: string | null;
    role: Role | null;
    userPicture: string | null;
  };
  setAuth?: React.Dispatch<
    React.SetStateAction<{
      userId: string | null;
      token: string | null;
      role: Role | null;
      userPicture: string | null;
    }>
  >;
};

export const AuthContext = createContext<AuthContextType>({
  auth: {
    userId: null,
    token: null,
    role: null,
    userPicture: null,
  },
  setAuth: undefined,
});
export default function AuthProvider({ children }: any) {
  const isClient = typeof window !== "undefined";
  const [decoded, setDecoded] = useState(
    isClient
      ? localStorage.getItem("token") !== null
        ? {
            email: jwtDecode(localStorage.getItem("token")!).email,
            exp: new Date(jwtDecode(localStorage.getItem("token")!).exp),
            iat: new Date(jwtDecode(localStorage.getItem("token")!).iat),
            role: jwtDecode(localStorage.getItem("token")!).role,
            sub: jwtDecode(localStorage.getItem("token")!).sub,
            userPicture: jwtDecode(localStorage.getItem("token")!).userPicture,
          }
        : null
      : null
  );
  const [auth, setAuth] = useState({
    userId: isClient ? localStorage.getItem("user") : null,
    token: isClient ? localStorage.getItem("token") : null,
    role: isClient
      ? localStorage.getItem("token") !== null
        ? decoded?.role
        : null
      : null,
    userPicture: isClient
      ? localStorage.getItem("token") !== null
        ? decoded.userPicture
        : null
      : null,
  });
  console.log(auth)
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
