import React from "react";
import styles from "@/styles/components/profile/saved-list-section.module.css";
import JobsCard from "../directories/cards/JobsCard";
import HousingCard from "../directories/cards/HousingCard";
import DealCard from "../directories/cards/DealCard";

function SavedList() {
	return (
		<div className={`${styles.saved_list_box}`}>
			<h3>Jobs</h3>
			<JobsCard />
			<JobsCard />
			<JobsCard />
			<h3>Housing</h3>
			<HousingCard />
			<HousingCard />
			<HousingCard />
			<h3>Deals</h3>
			<DealCard />
			<DealCard />
			<DealCard />
		</div>
	);
}

export default SavedList;
