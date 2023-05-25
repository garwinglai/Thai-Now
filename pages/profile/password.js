import React from "react";
import styles from "@/styles/pages/profile/password.module.css";
import { useRouter } from "next/router";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MainLayout from "@/components/layouts/MainLayout";
import Link from "next/link";
import { TextField } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

function ProfilePassword() {
	const { back } = useRouter();

	const navigateBack = () => {
		back();
	};
	return (
		<div className={`${styles.password_box}`}>
			<Link href="/" className={`${styles.flex} ${styles.back_btn}`}>
				<ChevronLeftIcon />
				<p>Back</p>
			</Link>
			<h2>Personal info</h2>
			<p>
				You haven&apos;t set a password for ThaiNow yet. Set a password so that
				you can login to ThaiNow with just your email address.
			</p>
			<form className={`${styles.form_box} ${styles.flexCol}`}>
				<div>
					<TextField
						fullWidth
						id="current-password"
						label="Current Password"
						variant="outlined"
						required
						type="password"
					/>
					<div className={`${styles.forgot_password_link}`}>
						<Link href="/auth/signin/forgot-password">Forgot password</Link>
					</div>
				</div>
				<div className={`${styles.new_password_box}`}>
					<TextField
						fullWidth
						id="new-password"
						label="New Password"
						variant="outlined"
						required
						type="password"
					/>
					<div>
						<div
							className={`${styles.flex} ${styles.password_check_group_empty}`}
						>
							<CancelIcon color="disabled" fontSize="small" />
							<p>Passwword must contain 8-20 characters</p>
						</div>
						<div
							className={`${styles.flex} ${styles.password_check_group_empty}`}
						>
							<CancelIcon color="disabled" fontSize="small" />
							<p>Contains letters, numbers, and special characters</p>
						</div>
					</div>
				</div>
				<TextField
					fullWidth
					id="reenter-password"
					label="Reenter Password"
					variant="outlined"
					required
					type="password"
				/>
				<button className={`${styles.submit_btn}`}>Save</button>
			</form>
		</div>
	);
}

export default ProfilePassword;

ProfilePassword.getLayout = function getLayout(page) {
	return <MainLayout route="profile">{page}</MainLayout>;
};
