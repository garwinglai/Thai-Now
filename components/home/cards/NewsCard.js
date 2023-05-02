import React from "react";
import styles from "../../../styles/components/home/cards/news-card.module.css";
import Image from "next/image";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function NewsCard({ newsContent }) {
	const { image, description, date } = newsContent;

	return (
		<div className={`${styles.news_card}`}>
			<Image src={image} alt="news image" className={`${styles.card_image}`} />
			<div className={`${styles.card_bottom}`}>
				<h5>{description}</h5>
				<div className={`${styles.date_posted}`}>
					<CalendarMonthIcon sx={{ color: "gray" }} fontSize="small" />
					<p>{date}</p>
				</div>
			</div>
		</div>
	);
}

export default NewsCard;
