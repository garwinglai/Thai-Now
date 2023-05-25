import React from "react";
import NavMobile from "@/components/layouts/NavMobile";
import styles from "@/styles/pages/auth/signin/forgot-password.module.css";
import Link from "next/link";
import OAuth from "@/components/auth/OAuth";
import Divider from "@mui/material/Divider";
import { TextField } from "@mui/material";

function ForgotPassword() {
	return (
		<div className={`${styles.forgot_password_box}`}>
			<h2>Log in with Email</h2>
			<p>
				Please enter your email address and we will send you an email about how
				to reset your password.
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
