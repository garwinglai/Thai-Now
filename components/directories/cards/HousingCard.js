import React from "react";
import styles from "../../../styles/components/directory/cards/housing-card.module.css";
import massageImage from "../../../public/images/directory/massage_large.png";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import { yellow } from "@mui/material/colors";

function HousingCard() {
	return (
		<div className={`${styles.jobs_card_container} ${styles.flex}`}>
			<div className={`${styles.image_box}`}>
				<Image
					src={massageImage}
					alt="massage image"
					className={`${styles.card_image}`}
				/>
			</div>
			<div className={`${styles.card_context_box} ${styles.flexCol}`}>
				<div className={`${styles.context_box_top}`}>
					<div className={`${styles.flex} ${styles.review_box}`}>
						<StarIcon style={{ color: yellow[700] }} fontSize="small" />
						<p>4.69</p>
						<p className={`${styles.review_count_p}`}>{`(20 Reviews)`}</p>
					</div>
					<h4>ใกล้ little Toyo</h4>
					<p className={`${styles.business_location_p}`}>Los Angeles</p>
					<div className={`${styles.amenities_desktop_p} ${styles.flex}`}>
						<span>•</span>
						<p>1 Guest(s), 1 Bed(s), 1 Bath(s), 1 Parking(s)</p>
					</div>
					<div className={`${styles.amenities_desktop_p} ${styles.flex}`}>
						<span>•</span>
						<p>Apartment</p>
					</div>
					<div className={`${styles.housing_deal} ${styles.flex}`}>
						<span>$ 100</span>
						<p>/night</p>
					</div>
				</div>
				<div className={`${styles.context_box_bottom}`}>
					<p className={`${styles.days_ago_p}`}>29 days ago</p>
				</div>
			</div>
		</div>
	);
}

export default HousingCard;
