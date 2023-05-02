import React from "react";
import styles from "../../../styles/components/directory/cards/marketplace-card.module.css";
import massageImage from "../../../public/images/directory/massage_large.png";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import { yellow } from "@mui/material/colors";

function MarketplaceCard() {
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
					<h4>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h4>
					<p className={`${styles.business_location_p}`}>Los Angeles</p>
					<div className={`${styles.business_type} ${styles.flex}`}>
						<span>•</span>
						<p>Restaurant</p>
					</div>
					<div className={`${styles.negotiate_price}`}>
						<p>Negotiate Price</p>
					</div>
				</div>
				<div className={`${styles.context_box_bottom}`}>
					<p className={`${styles.days_ago_p}`}>29 days ago</p>
				</div>
			</div>
		</div>
	);
}

export default MarketplaceCard;
