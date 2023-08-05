import React, { createContext, useState, useEffect, useContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import useFirebaseAuth from "./FirebaseUserAuth";

const AuthContext = createContext({
  authUser: null,
  loading: true,
});

function AuthProvider({ children }) {
  const auth = useFirebaseAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
