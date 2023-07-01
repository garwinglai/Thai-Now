import NavMobile from "@/components/layouts/NavMobile";
import React from "react";
import styles from "@/styles/pages/auth/signin/signin.module.css";
import Link from "next/link";
import OAuth from "@/components/auth/OAuth";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Divider from "@mui/material/Divider";
import login_banner from "@/public/static/images/thai-now-main/login_banner.png";
import Image from "next/image";
import thai_now_logo from "@/public/static/images/logos/thai_now_logo_blck.png";

function SignIn() {
  return (
    <div className="lg:flex lg:h-screen">
      <div className="hidden lg:block lg:h-screen lg:max-w-1/3">
        <Image src={login_banner} className="lg:h-full lg:w-fit" />
      </div>
      <div className="lg:flex-grow lg:min-w-5/12">
        <div className={`${styles.signin_box}`}>
          <Image
            src={thai_now_logo}
            className="hidden lg:block lg:mx-auto lg:mb-8 lg:w-20"
          />
          <h2>Welcome Back!</h2>
          <h4>Login to your ThaiNow to Conitnue</h4>
          <div className={`${styles.flex} ${styles.signup_link_group}`}>
            <p>Don&apos;t have an account? </p>
            <Link href="/auth/signup">Sign up</Link>
          </div>
          <div className={`${styles.oauth_box} ${styles.flex}`}>
            <OAuth />
          </div>
          <div className={`${styles.divider_group}`}>
            <Divider>
              <p>Or log in with</p>
            </Divider>
          </div>
          <Link
            href="/auth/signin/email"
            className={`${styles.email_login_link} ${styles.flex}`}
          >
            <EmailOutlinedIcon />
            <p>Log in with email</p>
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

export default SignIn;

SignIn.getLayout = function getLayout(page) {
  return (
    <>
      <NavMobile auth={true} route="signin" />
      {page}
    </>
  );
};
