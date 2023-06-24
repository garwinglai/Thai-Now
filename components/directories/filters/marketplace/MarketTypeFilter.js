import React from "react";
import styles from "@/styles/components/directory/filters/marketplace/market-type-filter.module.css";

function MarketTypeFilter() {
	return (
		<div className={`${styles.market_type_box}`}>
			<h4 className="lg:text-base">Type</h4>
			<div className="flex w-full gap-2 flex-wrap">
				{marketTypes.map((type) => (
					<button
						key={type}
						className="text-sm font-extralight border rounded-full max-w-fit px-2 py-1"
					>
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
