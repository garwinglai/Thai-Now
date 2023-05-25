import React from "react";
import styles from "../../../../styles/components/directory/filters/filter-title.module.css";
import CloseIcon from "@mui/icons-material/Close";
import SalaryFilter from "./SalaryFilter";
import JobTypeFilter from "./JobTypeFilter";
import DatePostedFilter from "./DatePostedFilter";
import ExperienceFilter from "./ExperienceFilter";
import { IconButton } from "@mui/material";
import FilterSortButtonGroup from "../FilterSortButtonGroup";

function JobFilters({ directory, closeDrawer }) {
	return (
		<div className={`${styles.filter_box}`}>
			<div className={`${styles.title_box}`}>
				<h1>Filter</h1>
				<div className={`${styles.close_sort_box}`}>
					<IconButton onClick={closeDrawer(directory, false)}>
						<CloseIcon fontSize="medium" />
					</IconButton>
				</div>
			</div>
			<div className={`${styles.filter_section_box}`}>
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
			</div>
			<FilterSortButtonGroup />
		</div>
	);
}

export default JobFilters;
