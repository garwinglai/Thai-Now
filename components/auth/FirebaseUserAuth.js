import { auth } from "@/firebase/fireConfig";
import React, { createContext, useState, useEffect, useContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = authListener();
    return () => unsubscribe();
  }, []);

  const authListener = () => {
    const auth = getAuth();
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        const formattedUser = formatAuthUser(user);
        setAuthUser(formattedUser);
        setLoading(false);
      } else {
        setAuthUser(null);
        setLoading(false);
      }
    });
  };

  return {
    authUser,
    loading,
  };
}
