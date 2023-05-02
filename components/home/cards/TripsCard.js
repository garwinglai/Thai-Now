import React from "react";
import styles from "../../../styles/components/home/cards/trips-card.module.css";
import Image from "next/image";

function TripsCard({ trip }) {
	const { image, description } = trip;

	return (
		<div className={`${styles.trip_card}`}>
			<Image
				src={image}
				alt="trip banner image"
				
				className={`${styles.trip_image}`}
			/>
			<p>{description}</p>
		</div>
	);
}

export default TripsCard;
