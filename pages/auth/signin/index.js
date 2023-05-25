import NavMobile from "@/components/layouts/NavMobile";
import React from "react";
import styles from "@/styles/pages/auth/signin/signin.module.css";
import Link from "next/link";
import OAuth from "@/components/auth/OAuth";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Divider from "@mui/material/Divider";

function SignIn() {
	return (
		<div className={`${styles.signin_box}`}>
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
