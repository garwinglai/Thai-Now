import React, { useState } from "react";
import styles from "@/styles/components/auth/o-auth.module.css";
import facebook_logo from "@/public/static/images/logos/facebook_login_icon.svg";
import apple_logo from "@/public/static/images/logos/apple_login_icon.svg";
import google_logo from "@/public/static/images/logos/google_login_icon.svg";
import line_logo from "@/public/static/images/logos/line_login_icon.svg";
import Image from "next/image";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "@firebase/auth";
import { auth } from "@/firebase/fireConfig";
import { useRouter } from "next/router";
import { createUser } from "@/helper/client/auth/signup";
import { Timestamp } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/fireConfig";

function OAuth() {
  const { push } = useRouter();

  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    console.log("clicked");
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // const credential = FacebookAuthProvider.credentialFromResult(result);
        // const accessToken = credential.accessToken;

        console.log("user", user);
        if (user) push("/");

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        // const credential = FacebookAuthProvider.credentialFromError(error);
        console.log("error signing in with facebook", error);
      });
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    // TODO: check if user email signed up via other methods yet
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // // The signed-in user info.
        const user = result.user;

        if (user) {
          const { uid, displayName, email } = user;
          const userRef = doc(db, "users", uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            push("/");
            return;
          }

          const fName = displayName.split(" ")[0];
          const lName = displayName.split(" ")[1];

          const userNoPassword = {
            createdAt: Timestamp.now(),
            fName,
            lName,
            email,
            numHousing: 0,
            numMarket: 0,
            numReviews: 0,
            numJobs: 0,
            numDeals: 0,
            reviewScore: 0,
          };

          const { success, value, error } = await createUser(
            userNoPassword,
            uid
          );

          if (success) {
            console.log("User created successfully");
            // setLocalStorage("firstLogin", true);
            // setIsLoading(false);
            push("/");
          }
        }
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);

        // handleOpenSnackBar("Error signing in.", error);
        console.log("error signing in with google", error);
      });
  };

  return (
    <React.Fragment>
      <button
        onClick={handleFacebookLogin}
        className={`${styles.oauth_group} ${styles.flexCol}`}
      >
        <Image
          src={facebook_logo}
          alt="facebook logo"
          className={`${styles.oauth_logo}`}
        />
        <p>Facebook</p>
      </button>
      <button
        onClick={handleGoogleLogin}
        className={`${styles.oauth_group} ${styles.flexCol}`}
      >
        <Image
          src={google_logo}
          alt="google logo"
          className={`${styles.oauth_logo}`}
        />
        <p>Google</p>
      </button>
      <button className={`${styles.oauth_group} ${styles.flexCol}`}>
        <Image
          src={apple_logo}
          alt="apple logo"
          className={`${styles.oauth_logo}`}
        />
        <p>Apple</p>
      </button>
      <button className={`${styles.oauth_group} ${styles.flexCol}`}>
        <Image
          src={line_logo}
          alt="line logo"
          className={`${styles.oauth_logo}`}
        />
        <p>Line</p>
      </button>
    </React.Fragment>
  );
}

export default OAuth;
