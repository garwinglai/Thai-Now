import React from "react";
import styles from "@/styles/components/directory/filters/housing/property-type-filter.module.css";

function PropertyTypeFilter() {
	return (
		<div className={`${styles.filter_box}`}>
			<h4>Property type</h4>
			<div className={`${styles.filter_group} ${styles.flex}`}>
				{propertyTypes.map((property) => (
					<button key={property} className={`${styles.property_btn}`}>
						{property}
					</button>
				))}
			</div>
		</div>
	);
}

export default PropertyTypeFilter;

const propertyTypes = ["Apartment", "Room", "Condo", "House", "Other"];
