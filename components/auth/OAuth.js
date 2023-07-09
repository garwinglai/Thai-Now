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
    signInWithPopup(auth, provider)
      .then((result) => {
        // // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // // The signed-in user info.
        const user = result.user;

        if (user) push("/");
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

        handleOpenSnackBar("Error signing in.");
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
