import React from "react";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";

function JobsFormFour({ handleSalaryRangeChange, salaryRange }) {
	const { minPrice, maxPrice, interval } = salaryRange;

	return (
		<form className="p-4">
			<h4 className="pt-4">Salary Information</h4>
			<h4
				htmlFor="title"
				className="block text-[color:var(--deals-primary)] pt-4 pb-2 text-sm"
			>
				Salary Range
				<span className="text-[color:var(--secondary)] ">* </span>
			</h4>
			<div className=" transition-opacity duration-300 h-auto opacity-100 flex items-center gap-4 w-full">
				<div className="relative flex-grow">
					<i className="absolute top-2 left-4  text-[color:var(--deals-primary)]">
						$
					</i>
					<input
						type="number"
						name="minPrice"
						id="minPrice"
						value={minPrice}
						onChange={handleSalaryRangeChange}
						className="pl-4 rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-4 py-3 h-full "
					/>
				</div>
				<span className="text-[color:var(--deals-primary)]">-</span>
				<div className="relative flex-grow">
					<i className="absolute top-2 left-4  text-[color:var(--deals-primary)]">
						$
					</i>
					<input
						type="number"
						name="maxPrice"
						id="maxPrice"
						value={maxPrice}
						onChange={handleSalaryRangeChange}
						className="pl-4 rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-4 py-3 h-full "
					/>
				</div>
			</div>
			<div className="mt-2 w-full">
				<select
					name="interval"
					id="interval"
					value={interval}
					onChange={handleSalaryRangeChange}
					className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full p-2 h-full "
				>
					<option value="Hour">Hour</option>
					<option value="Month">Month</option>
					<option value="Year">Year</option>
				</select>
			</div>
		</form>
	);
}

export default JobsFormFour;
