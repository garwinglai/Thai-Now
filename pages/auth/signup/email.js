import React, { useState } from "react";
import NavMobile from "@/components/layouts/NavMobile";
import styles from "@/styles/pages/auth/signup/email.module.css";
import Link from "next/link";
import OAuth from "@/components/auth/OAuth";
import Divider from "@mui/material/Divider";
import { TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

function EmailSignUp() {
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleSignUp = (e) => {
		e.preventDefault();
		window.alert(clicked);
	};
	return (
		<div className={`${styles.email_signup_box}`}>
			<h2>Let&apos;s Get Started</h2>
			<h4>Create a ThaiNow account to Continue</h4>
			<form
				onSubmit={handleSignUp}
				className={`${styles.credentials_box} ${styles.flexCol}`}
			>
				<TextField
					fullWidth
					id="outlined-basic"
					label="First name"
					variant="outlined"
					required
				/>
				<TextField
					fullWidth
					id="outlined-basic"
					label="Last name"
					variant="outlined"
					required
				/>
				<TextField
					fullWidth
					id="outlined-basic"
					label="Email"
					variant="outlined"
					required
				/>
				<FormControl variant="outlined">
					<InputLabel htmlFor="outlined-adornment-password">
						Password
					</InputLabel>
					<OutlinedInput
						fullWidth
						required
						id="outlined-adornment-password"
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
				<div className={`${styles.flex} ${styles.password_check_group_empty}`}>
					<CancelIcon color="disabled" />
					<p>Password must contain 8-20 characters</p>
				</div>
				<div className={`${styles.flex} ${styles.password_check_group_empty}`}>
					<CancelIcon color="disabled" />
					<p>Contains letters, numbers, and special characters</p>
				</div>
				<button type="submit" className={`${styles.login_btn}`}>
					Agree and continue
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
