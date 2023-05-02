import React from "react";
import styles from "../../../../styles/components/directory/filters/jobs/job-filters.module.css";
import CloseIcon from "@mui/icons-material/Close";

function MarketplaceFilters({ directory, closeDrawer }) {
	return (
		<div className={`${styles.filter_box}`}>
			<div className={`${styles.title_box}`}>
				<h1>Filter</h1>
				<div className={`${styles.close_sort_box}`}>
					<CloseIcon
						onClick={closeDrawer(directory, false)}
						fontSize="medium"
					/>
				</div>
			</div>
			{/* <div className={`${styles.filter_section_box}`}>
				<SalaryFilter />
			</div>
			<div className={`${styles.filter_section_box}`}>
				<JobTypeFilter />
			</div>
			<div className={`${styles.filter_section_box}`}>
				<DatePostedFilter />
			</div>
			<div className={`${styles.filter_section_box}`}>
				<ExperienceFilter />
			</div> */}
		</div>
	);
}

export default MarketplaceFilters;
