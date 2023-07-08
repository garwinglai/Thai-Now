import { onIdTokenChanged } from "firebase/auth";
import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "@/firebase/fireConfig";
import nookies from "nookies";

const AuthContext = createContext({
  user: null,
});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return onIdTokenChanged(auth, async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, "token", "", { path: "/" });
        return;
      }
      setUser(user);
      const token = await user.getIdToken();
      nookies.set(undefined, "token", token, { path: "/" });
    });
  }, []);

  // refresh token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => {
  const { user } = useContext(AuthContext);

  return user;
};
