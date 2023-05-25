import React from "react";
import NavMobile from "@/components/layouts/NavMobile";
import styles from "@/styles/pages/auth/signin/email.module.css";
import Link from "next/link";
import OAuth from "@/components/auth/OAuth";
import Divider from "@mui/material/Divider";
import { TextField } from "@mui/material";

function EmailSignIn() {
	const handleSignUp = (e) => {
		e.preventDefault();
		window.alert(clicked);
	};
	return (
		<div className={`${styles.email_login_box}`}>
			<h2>Log in with Email</h2>
			<h4>Login to your ThaiNow to Conitnue</h4>
			<form
				onSubmit={handleSignUp}
				className={`${styles.credentials_box} ${styles.flexCol}`}
			>
				<TextField
					fullWidth
					id="outlined-basic"
					label="Email"
					variant="outlined"
					required
				/>
				<TextField
					fullWidth
					id="outlined-basic"
					label="Password"
					variant="outlined"
					required
				/>
				<button type="submit" className={`${styles.login_btn}`}>
					Log in
				</button>
			</form>
			<div className={`${styles.forgot_password_link}`}>
				<Link href="/auth/signin/forgot-password">Forgot password</Link>
			</div>
			<div className={`${styles.divider_group}`}>
				<Divider>
					<p>Or log in with</p>
				</Divider>
			</div>
			<div className={`${styles.oauth_box} ${styles.flex}`}>
				<OAuth />
			</div>
			<p className={`${styles.footer_message}`}>
				By continuing, you agree to ThaiNow&apos;s
				{` `}
				<Link href="/terms/terms-of-service">Terms of Service</Link>
				{` `}
				and
				{` `} <Link href="/terms/privacy-policy">Privacy Policy</Link>
			</p>
			<div className={`${styles.flex} ${styles.signup_link_group}`}>
				<p>Don&apos;t have an account? </p>
				<Link href="/auth/signup">Sign up</Link>
			</div>
		</div>
	);
}

export default EmailSignIn;

EmailSignIn.getLayout = function getLayout(page) {
	return (
		<>
			<NavMobile auth={true} route="signin" />
			{page}
		</>
	);
};