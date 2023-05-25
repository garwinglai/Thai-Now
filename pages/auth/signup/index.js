import React from "react";
import styles from "@/styles/pages/auth/signup/signup.module.css";
import Link from "next/link";
import OAuth from "@/components/auth/OAuth";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Divider from "@mui/material/Divider";
import NavMobile from "@/components/layouts/NavMobile";

function SignUp() {
	return (
		<div className={`${styles.signup_box}`}>
			<h2>Let&apos;s Get Started</h2>
			<h4>Create a ThaiNow account to Continue</h4>
			<div className={`${styles.flex} ${styles.signup_link_group}`}>
				<p>Already have an account? </p>
				<Link href="/auth/signin">Log in</Link>
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
