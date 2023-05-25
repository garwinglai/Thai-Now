import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import styles from "@/styles/pages/profile/switch-account.module.css";
import Link from "next/link";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AccountSwitchComponent from "@/components/profile/AccountSwitchComponent";
import marketing_image from "@/public/static/images/switch_account_image.png";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Image from "next/image";

function SwitchAccount() {
	return (
		<div className={`${styles.switch_account_box}`}>
			<div className={`${styles.header_box}`}>
				<Link href="/" className={`${styles.flex} ${styles.back_btn}`}>
					<ChevronLeftIcon />
					<p>Back</p>
				</Link>
				<h2>Switch Account</h2>
			</div>
			<div className={`${styles.flexCol} ${styles.profiles}`}>
				<AccountSwitchComponent isActiveProfile={true} />
				<AccountSwitchComponent isActiveProfile={false} />
			</div>
			<div className={`${styles.marketing_box} ${styles.flexCol}`}>
				<Image
					src={marketing_image}
					alt="create business image"
					className={`${styles.marketing_image}`}
				/>
				<h3>Create a free business account</h3>
				<div className={`${styles.benefits_group}`}>
					<h4>Unlock tools to help:</h4>
					<div className={`${styles.flex} ${styles.context_group}`}>
						<CheckCircleIcon sx={{ color: "#ff3d00" }} />
						<p>Grow your audience</p>
					</div>
					<div className={`${styles.flex} ${styles.context_group}`}>
						<CheckCircleIcon sx={{ color: "#ff3d00" }} />
						<p>Sell more product</p>
					</div>
					<div className={`${styles.flex} ${styles.context_group}`}>
						<CheckCircleIcon sx={{ color: "#ff3d00" }} />
						<p>Lorem ipsum dolor sit amet.</p>
					</div>
				</div>
				<Link
					href="/profile/create-business"
					className={`${styles.signup_link}`}
				>
					Create
				</Link>
			</div>
		</div>
	);
}

export default SwitchAccount;
