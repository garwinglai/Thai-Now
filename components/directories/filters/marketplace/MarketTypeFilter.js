import React from "react";
import styles from "@/styles/components/directory/filters/marketplace/market-type-filter.module.css";

function MarketTypeFilter() {
	return (
		<div className={`${styles.market_type_box}`}>
			<h4>Type</h4>
			<div className={`${styles.filter_group} ${styles.flex}`}>
				{marketTypes.map((type) => (
					<button key={type} className={`${styles.property_btn}`}>
						{type}
					</button>
				))}
			</div>
		</div>
	);
}

export default MarketTypeFilter;

const marketTypes = [
	"Product",
	"Service",
	"Home & Garden",
	"Food",
	"Freelance",
	"Handmade",
	"Vehicles",
	"Handyman",
	"Taxi",
	"Other",
];
