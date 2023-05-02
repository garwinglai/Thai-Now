import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import styles from "../../../../styles/components/directory/filters/jobs/salary-filter.module.css";

function SalaryFilter() {
	return (
		<div className={`${styles.filter_box}`}>
			<h4>Salary</h4>
			<div className={`${styles.radio_box}`}>
				<FormControl sx={{ width: "100%", marginLeft: "-16px" }}>
					<RadioGroup
						aria-labelledby="demo-radio-buttons-group-label"
						defaultValue="hourly"
						name="radio-buttons-group"
					>
						<FormControlLabel
							value="monthly"
							control={<Radio />}
							label="Montly"
							labelPlacement="start"
							sx={{
								display: "flex",
								justifyContent: "space-between",
								width: "100%",
								color: "#717171",
							}}
						/>
						<FormControlLabel
							value="hourly"
							control={<Radio />}
							label="hourly"
							labelPlacement="start"
							sx={{
								display: "flex",
								justifyContent: "space-between",
								width: "100%",
								color: "#717171",
							}}
						/>
					</RadioGroup>
				</FormControl>
			</div>
			<div className={`${styles.salary_range_box} ${styles.flexCol}`}>
				<p>Salary range:</p>
				<div className={`${styles.flex} ${styles.input_group_both}`}>
					<div className={`${styles.flexCol} ${styles.input_box}`}>
						<input id="min-salary" type="text" placeholder="$100" />
						<label htmlFor="min-salary">Min</label>
					</div>

					<div className={`${styles.flexCol} ${styles.input_box}`}>
						<input id="max-salary" type="text" placeholder="$300" />
						<label htmlFor="max-salary">Max</label>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SalaryFilter;
