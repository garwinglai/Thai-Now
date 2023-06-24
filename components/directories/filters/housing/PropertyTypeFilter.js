import React from "react";
import styles from "@/styles/components/directory/filters/housing/property-type-filter.module.css";

function PropertyTypeFilter() {
	return (
		<div className={`${styles.filter_box}`}>
			<h4 className="lg:text-base">Property type</h4>
			<div className="flex w-full gap-2 flex-wrap">
				{propertyTypes.map((property) => (
					<button
						key={property}
						className="text-sm font-extralight border rounded-full max-w-fit px-2 py-1"
					>
						{property}
					</button>
				))}
			</div>
		</div>
	);
}

export default PropertyTypeFilter;

const propertyTypes = ["Apartment", "Room", "Condo", "House", "Other"];
