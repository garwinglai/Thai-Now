import React from "react";
import styles from "@/styles/components/directory/filters/filter-sort-button.module.css";

function FilterSortButtonGroup() {
	return (
		<div className={`${styles.sort_button_box}`}>
			<button className={`${styles.btn} ${styles.clear_btn}`}>Clear all</button>
			<button className={`${styles.btn} ${styles.apply_btn}`}>Apply</button>
		</div>
	);
}

export default FilterSortButtonGroup;
