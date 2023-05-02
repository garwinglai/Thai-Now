import React from "react";
import styles from "../../../styles/components/home/cards/deals-card.module.css";
import gStyles from "../../../styles/global.module.css";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import { yellow } from "@mui/material/colors";

function DealsCard({ deal, title }) {
	const {
		discount,
		reviewScore,
		reviewCount,
		description,
		bizName,
		location,
		image,
	} = deal;

	const footerTag = () => {
		switch (title) {
			case "Deals of the week":
				return (
					<p className={`${styles.biz_type}`}>
						<span className={`${styles.bullet_point_bit_type}`}>•</span>{" "}
						Restaurant
					</p>
				);
				break;
			case "Job available":
				return (
					<p className={`${styles.biz_type}`}>
						<span className={`${styles.bullet_point_bit_type}`}>•</span> $ - $
						per Hour | Fulltime
					</p>
				);
				break;
			case "Room for rent":
				return (
					<p className={`${styles.biz_type}`}>
						<span className={`${styles.bullet_point_bit_type}`}>•</span> Los
						Angeles, CA
					</p>
				);
				break;
			case "Staff pick item":
				return (
					<p className={`${styles.biz_type}`}>
						<span className={`${styles.bullet_point_bit_type}`}>•</span> Los
						Angeles, CA
					</p>
				);
				break;

			default:
				break;
		}
	};

	return (
		<div className={`${styles.deals_card}`}>
			<Image
				src={image}
				alt="business image"
				className={`${styles.card_image}`}
			/>
			<div className={`${styles.card_bottom}`}>
				<div className={`${styles.card_review}`}>
					<StarIcon sx={{ color: yellow[700] }} />
					<p className={`${gStyles.p_xs}`}>{reviewScore}</p>
					<p className={`${gStyles.p_xs} ${styles.review_count}`}>
						({reviewCount} Reviews)
					</p>
				</div>
				<h5>{description}</h5>
				<p className={`${styles.biz_name_location}`}>
					{bizName} - {location}
				</p>
				{footerTag()}
			</div>
		</div>
	);
}

export default DealsCard;