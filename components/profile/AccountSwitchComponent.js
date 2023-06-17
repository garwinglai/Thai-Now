import React from "react";
import Image from "next/image";
import avatar_image from "@/public/static/images/temp_avatar.png";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import styles from "@/styles/components/profile/account-switch-component.module.css";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";

function AccountSwitchComponent({ isActiveProfile }) {
	return (
		<div className={`${styles.flex} ${styles.account_box}`}>
			<div className={`${styles.account_right_box} ${styles.flex}`}>
				{isActiveProfile ? (
					<React.Fragment>
						<Image
							className={`${styles.profile_image}`}
							src={avatar_image}
							alt="profile image"
						/>
						<div className={`${styles.text_group}`}>
							<h4>Lorla Ramsey</h4>
							<p>Classic Account</p>
						</div>
					</React.Fragment>
				) : (
					<Link
						href="/auth/signin"
						className={`${styles.signin_link} ${styles.flex}`}
					>
						<div className={`${styles.no_profile_image} ${styles.flex}`}>
							<AddIcon color="action" />
						</div>
						<div className={`${styles.text_group}`}>
							<h4>Add an existing business account</h4>
						</div>
					</Link>
				)}
			</div>
			{isActiveProfile ? (
				<CheckCircleIcon color="primary" fontSize="large" />
			) : (
				<span style={{ visibility: "hidden" }}>x</span>
			)}
		</div>
	);
}

export default AccountSwitchComponent;
