import React from "react";
import bannerImage from "../../public/images/home/banner.png";
import styles from "../../styles/components/home/ads-banner.module.css";
import Image from "next/image";

function AdsBanner() {
	return (
		<div className={`${styles.ads_banner}`}>
			<Image
				src={bannerImage}
				alt="ads banner"
				className={`${styles.banner_image}`}
				priority={true}
			/>
		</div>
	);
}

export default AdsBanner;
