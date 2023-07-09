import React, { useState } from "react";
import styles from "@/styles/pages/auth/signup/signup.module.css";
import Link from "next/link";
import OAuth from "@/components/auth/OAuth";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Divider from "@mui/material/Divider";
import NavMobile from "@/components/layouts/NavMobile";
import login_banner from "@/public/static/images/thai-now-main/login_banner.png";
import Image from "next/image";
import thai_now_logo from "@/public/static/images/logos/thai_now_logo_blck.png";
import { Snackbar } from "@mui/material";
import { IconButton } from "@mui/material";
// import { CloseIcon } from "@mui/icons-material";

function SignUp() {
  const [Snackbar, setSnackbar] = useState({
    isSnackbarOpen: true,
    snackbarMessage: "stuff",
  });

  // destructure snackbar
  const { isSnackbarOpen, snackbarMessage } = Snackbar;

  const handleSnackbarClose = () => {
    setSnackbar({
      isSnackbarOpen: false,
      snackbarMessage: "",
    });
  };

  const handleOpenSnackBar = (message) => {
    setSnackbar({
      isSnackbarOpen: true,
      snackbarMessage: message,
    });
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackbarClose}
      >
        {/* <CloseIcon fontSize="small" /> */}
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className="lg:flex lg:h-screen">
      {/* <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={action}
      /> */}
      <div className="hidden lg:block lg:h-screen lg:max-w-1/3">
        <Image
          src={login_banner}
          className="lg:h-full lg:w-fit"
          alt="signup page banner image"
          priority={true}
        />
      </div>
      <div className="lg:flex-grow lg:min-w-5/12">
        <div className={`${styles.signup_box}`}>
          <Image
            src={thai_now_logo}
            alt="ThaiNow Logo"
            className="hidden lg:block lg:mx-auto lg:mb-8 lg:w-20"
          />
          <h2>Let&apos;s Get Started</h2>
          <h4>Create a ThaiNow account to Continue</h4>
          <div className={`${styles.flex} ${styles.signup_link_group}`}>
            <p>Already have an account? </p>
            <Link href="/auth/signin">Log in</Link>
          </div>
          <div className={`${styles.oauth_box} ${styles.flex}`}>
            <OAuth handleOpenSnackBar={handleOpenSnackBar} />
          </div>
          <div className={`${styles.divider_group}`}>
            <Divider>
              <p>Or log in with</p>
            </Divider>
          </div>
          <Link
            href="/auth/signup/email"
            className={`${styles.email_login_link} ${styles.flex}`}
          >
            <EmailOutlinedIcon />
            <p>Sign up with email</p>
          </Link>
          <p className={`${styles.footer_message}`}>
            By continuing, you agree to ThaiNow&apos;s
            {` `}
            <Link href="/terms/terms-of-service">Terms of Service</Link>
            {` `}
            and
            {` `} <Link href="/terms/privacy-policy">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

SignUp.getLayout = function getLayout(page) {
  return (
    <>
      <NavMobile auth={true} route="signup" />
      {page}
    </>
  );
};
