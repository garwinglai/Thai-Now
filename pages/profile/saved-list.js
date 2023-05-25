import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import styles from "@/styles/pages/profile/saved-list.module.css";
import Link from "next/link";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import no_saved_list_image from "@/public/static/images/saved_list_none.png";
import Image from "next/image";
import SavedListSection from "@/components/profile/SavedListSection";
import { useRouter } from "next/router";

function SavedList() {
	const menuList = ["All", "Jobs", "Housing", "Deals", "Marketplace"];
	const { back } = useRouter();

	const handleBack = () => {
		back();
	};

	return (
		<div className={`${styles.saved_list_box}`}>
			<div className={`${styles.header_box}`}>
				<button
					onClick={handleBack}
					className={`${styles.flex} ${styles.back_btn}`}
				>
					<ChevronLeftIcon />
					<p>Back</p>
				</button>
				<h2>Saved List</h2>
				<div className={`${styles.flex} ${styles.list_filter_box}`}>
					{menuList.map((menu, idx) => (
						<button className={`${styles.menu_btn}`} key={menu}>
							{menu}
						</button>
					))}
				</div>
			</div>
			<div className={`${styles.divider}`}></div>
			{/* <div className={`${styles.no_saved_list_box}`}>
				<Image src={no_saved_list_image} alt="vector image of no saved list" />
				<h3>No favorites yet</h3>
				<p>
					Tap the star on store page to save your favorite deals, jobs,
					marketplace, or living for later.
				</p>
			</div> */}
			<SavedListSection />
		</div>
	);
}

export default SavedList;

SavedList.getLayout = function getLayout(page) {
	return <MainLayout route="profile">{page}</MainLayout>;
};
