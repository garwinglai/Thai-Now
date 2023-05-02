import React from "react";
import styles from "../../styles/components/home/guide-book-section.module.css";
import guideVideo from "../../public/images/home/guide-temp-video.png";
import Image from "next/image";
import GuidesCard from "./cards/GuidesCard";

function GuideBookSection() {
	return (
		<div className={`${styles.guide_book}`}>
			<Image
				src={guideVideo}
				alt="guide video image"
				className={`${styles.guide_video_image}`}
			/>
			<div className={`${styles.guide_items_container}`}>
				<GuidesCard className={`${styles.item_1}`} />
				<GuidesCard className={`${styles.item_2}`} />
				<GuidesCard className={`${styles.item_3}`} />
				<GuidesCard className={`${styles.item_4}`} />
			</div>
		</div>
	);
}

export default GuideBookSection;
