import React from "react";
import styles from "../../../../styles/components/directory/filters/jobs/job-type-filter.module.css";

function JobTypeFilter() {
	return (
		<div className={`${styles.job_type_filter_box}`}>
			<h4>Job type</h4>
			<div className={`${styles.filter_group} ${styles.flex}`}>
				{jobTypes.map((job) => (
					<button key={job} className={`${styles.job_btn}`}>
						{job}
					</button>
				))}
			</div>
		</div>
	);
}

export default JobTypeFilter;

const jobTypes = [
	"Full-time",
	"Part-time",
	"Intership",
	"On-demand",
	"Seasonal",
	"Volunteer",
	"Freelance",
];
