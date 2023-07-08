import React, { useState } from "react";
import NavMobile from "@/components/layouts/NavMobile";
import styles from "@/styles/pages/auth/signup/email.module.css";
import Link from "next/link";
import { TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import CancelIcon from "@mui/icons-material/Cancel";
import login_banner from "@/public/static/images/thai-now-main/login_banner.png";
import Image from "next/image";
import thai_now_logo from "@/public/static/images/logos/thai_now_logo_blck.png";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRouter } from "next/router";
import { setLocalStorage } from "@/utils/clientStorage";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { createUser } from "@/helper/client/auth/signup";
import { auth } from "@/firebase/fireConfig";

// TODO: Save to user

function EmailSignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signupValues, setSignupValues] = useState({
    fName: "garwing",
    lName: "lai",
    email: "garwinglai@gmail.com",
    password: "asdfghjkl",
  });

  // destructure signupValues
  const { fName, lName, email, password } = signupValues;

  // Create an onclick function for the back button that uses the useRouter to go back
  const router = useRouter();

  const handleBack = (e) => {
    router.push("/");
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSignupInputChange = (e) => {
    // destructure e.target
    const { name, value } = e.target;

    // set the state
    setSignupValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        const { uid } = user;
        const userNoPassword = {
          fName,
          lName,
          email,
          numHousing: 0,
          numMarket: 0,
          numReviews: 0,
          reviewScore: 0,
        };
        // const { success, value, error } = await createUser(userNoPassword, uid);
        const success = true;
        if (success) {
          console.log("User created successfully");
          setLocalStorage("firstLogin", true);
          setIsLoading(false);
          router.push("/");
        }

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setIsLoading(false);
        console.log("error signing up", error);
        // ..
      });
  };
  return (
    <div className="lg:flex lg:h-screen">
      <div className="hidden lg:block lg:h-screen lg:max-w-1/3">
        <Image
          src={login_banner}
          alt="signup page banner image"
          priority={true}
          className="lg:h-full lg:w-fit"
        />
      </div>
      <div className="lg:flex-grow lg:min-w-5/12 relative">
        <div className="absolute top-3 left-3">
          <IconButton onClick={handleBack}>
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
        </div>
        <div className={`${styles.email_signup_box}`}>
          <Image
            src={thai_now_logo}
            alt="thai now logo"
            className="hidden lg:block lg:mx-auto lg:mb-8 lg:w-20"
          />
          <h2>Let&apos;s Get Started</h2>
          <h4>Create a ThaiNow account to Continue</h4>
          <form
            onSubmit={handleSignUp}
            className={`${styles.credentials_box} ${styles.flexCol}`}
          >
            <TextField
              fullWidth
              id="fName"
              label="First name"
              variant="outlined"
              type="text"
              required
              name="fName"
              value={fName}
              onChange={handleSignupInputChange}
            />
            <TextField
              fullWidth
              id="lName"
              label="Last name"
              variant="outlined"
              type="text"
              required
              value={lName}
              name="lName"
              onChange={handleSignupInputChange}
            />
            <TextField
              fullWidth
              id="email"
              label="Email"
              variant="outlined"
              type="email"
              required
              value={email}
              name="email"
              onChange={handleSignupInputChange}
            />
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                fullWidth
                required
                value={password}
                name="password"
                onChange={handleSignupInputChange}
                id="password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      // onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <div
              className={`${styles.flex} ${styles.password_check_group_empty}`}
            >
              <CancelIcon color="disabled" />
              <p>Password must contain 8-20 characters</p>
            </div>
            <div
              className={`${styles.flex} ${styles.password_check_group_empty}`}
            >
              <CancelIcon color="disabled" />
              <p>Contains letters, numbers, and special characters</p>
            </div>
            <button
              type="submit"
              className={`${styles.login_btn}`}
              disabled={isLoading}
            >
              {isLoading ? "Signing up ..." : "Agree and continue"}
            </button>
          </form>
          <p className={`${styles.footer_message}`}>
            By continuing, you agree to ThaiNow&apos;s
            {` `}
            <Link href="/terms/terms-of-service">Terms of Service</Link>
            {` `}
            and
            {` `} <Link href="/terms/privacy-policy">Privacy Policy</Link>
          </p>
          <div className={`${styles.flex} ${styles.signup_link_group}`}>
            <p>Already have an account? </p>
            <Link href="/auth/signin">Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailSignUp;

EmailSignUp.getLayout = function getLayout(page) {
  return (
    <>
      <NavMobile auth={true} route="signup" />
      {page}
    </>
  );
};
