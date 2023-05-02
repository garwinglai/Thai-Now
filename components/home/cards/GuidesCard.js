import React from "react";
import styles from "../../../styles/components/home/cards/guides-card.module.css";
import guideImage from "../../../public/images/home/guide-temp-image.png";
import Image from "next/image";

function GuidesCard() {
	return (
		<div className={`${styles.guides_card}`}>
			<Image
				src={guideImage}
				alt="guide book image"
				className={`${styles.guide_image}`}
			/>
			<h5>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h5>
		</div>
	);
}

export default GuidesCard;
