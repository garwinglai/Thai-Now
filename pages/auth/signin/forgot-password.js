import React from "react";
import NavMobile from "@/components/layouts/NavMobile";
import styles from "@/styles/pages/auth/signin/forgot-password.module.css";
import Link from "next/link";
import OAuth from "@/components/auth/OAuth";
import Divider from "@mui/material/Divider";
import { TextField } from "@mui/material";
import login_banner from "@/public/static/images/thai-now-main/login_banner.png";
import Image from "next/image";
import thai_now_logo from "@/public/static/images/logos/thai_now_logo_blck.png";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";

function ForgotPassword() {
  const router = useRouter();

  const handleBack = (e) => {
    router.push("/");
  };

  return (
    <div className="lg:flex lg:h-screen">
      <div className="hidden lg:block lg:h-screen lg:max-w-1/3">
        <Image src={login_banner} className="lg:h-full lg:w-fit" />
      </div>
      <div className="lg:flex-grow lg:min-w-5/12 relative">
        <div className="absolute top-3 left-3">
          <IconButton onClick={handleBack}>
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
        </div>
        <div className={`${styles.forgot_password_box}`}>
          <Image
            src={thai_now_logo}
            className="hidden lg:block lg:mx-auto lg:mb-8 lg:w-20"
          />
          <h2>Log in with Email</h2>
          <p>
            Please enter your email address and we will send you an email about
            how to reset your password.
          </p>
          <div className={`${styles.credentials_box} ${styles.flexCol}`}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Email"
              variant="outlined"
            />
            <button className={`${styles.login_btn}`}>Reset Password</button>
          </div>
          <div className={`${styles.back_to_login_link}`}>
            <Link href="/auth/signin/email">Back to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

ForgotPassword.getLayout = function getLayout(page) {
  return (
    <>
      <NavMobile auth={true} route="signin" />
      {page}
    </>
  );
};
