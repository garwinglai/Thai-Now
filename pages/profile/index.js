import MainLayout from "@/components/layouts/MainLayout";
import React from "react";
import styles from "@/styles/pages/profile/profile.module.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { TextField } from "@mui/material";
import Image from "next/image";
import avatar_image from "@/public/static/images/temp_avatar.png";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { useRouter } from "next/router";
import Link from "next/link";

function Profile() {
	const { back } = useRouter();

	const handleBack = () => {
		back();
	};

	return (
		<div className={`${styles.profile_box}`}>
			<button
				onClick={handleBack}
				className={`${styles.flex} ${styles.back_btn}`}
			>
				<ChevronLeftIcon />
				<p>Back</p>
			</button>
			<h2>Personal info</h2>
			<div className={`${styles.image_group}`}>
				<Image
					className="mx-auto"
					src={avatar_image}
					alt="profile image"
				/>

				<button className={`${styles.edit_btn} ${styles.flex}`}>
					<CameraAltOutlinedIcon fontSize="small" />
					<p>Edit</p>
				</button>
			</div>
			<form className={`${styles.form_box} ${styles.flexCol}`}>
				<TextField
					required
					id="first-name"
					label="First name"
					fullWidth
					type="text"
					defaultValue="Hello World"
				/>
				<TextField
					required
					id="last-name"
					label="Last name"
					fullWidth
					type="text"
				/>
				<TextField
					required
					id="phone-number"
					label="Phone number"
					fullWidth
					type="number"
				/>
				<TextField required id="email" label="Email" fullWidth type="email" />
				<TextField
					required
					id="location"
					label="Location"
					fullWidth
					type="text"
				/>
				<button className={`${styles.submit_btn}`}>Save</button>
			</form>
		</div>
	);
}

export default Profile;

Profile.getLayout = function getLayout(page) {
	return <MainLayout route="profile">{page}</MainLayout>;
};
