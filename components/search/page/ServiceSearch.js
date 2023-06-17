import React from "react";
import thai_housing_icon from "@/public/static/images/icons/thai_housing_icon.svg";
import thai_jobs_icon from "@/public/static/images/icons/thai_jobs_icon.svg";
import thai_marketplace_icon from "@/public/static/images/icons/thai_marketplace_icon.svg";
import thai_help_icon from "@/public/static/images/icons/thai_help_icon.svg";
import Image from "next/image";
import Link from "next/link";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

function ServiceSearch({ handleServiceChange, service }) {
	return (
		<div className="px-4">
			<p className="text-sm">Services</p>
			<FormControl sx={{ width: "100%", padding: "0.5rem 1rem 0 0" }}>
				<RadioGroup
					aria-labelledby="demo-radio-buttons-group-label"
					name="radio-buttons-group"
					defaultValue={service ? service : "jobs"}
					value={service}
					onChange={handleServiceChange}
				>
					<FormControlLabel
						value="jobs"
						control={
							<Radio
								sx={{
									"& .MuiSvgIcon-root": {
										fontSize: 18,
									},
								}}
							/>
						}
						label={
							<div className="flex gap-2 items-center font-light">
								<Image
									src={thai_jobs_icon}
									alt="jobs icon"
									className="w-6 h-6"
								/>
								<p>Jobs</p>
							</div>
						}
						labelPlacement="start"
						sx={{
							display: "flex",
							justifyContent: "space-between",
							width: "100%",
							color: "#717171",
							"& .MuiTypography-root": {
								fontSize: 14,
							},
						}}
					/>
					<FormControlLabel
						value="housing"
						control={
							<Radio
								sx={{
									"& .MuiSvgIcon-root": {
										fontSize: 18,
									},
								}}
							/>
						}
						label={
							<div className="flex gap-2 items-center font-light">
								<Image
									src={thai_housing_icon}
									alt="housing icon"
									className="w-6 h-6"
								/>
								<p>housing</p>
							</div>
						}
						labelPlacement="start"
						sx={{
							display: "flex",
							justifyContent: "space-between",
							width: "100%",
							color: "#717171",
							"& .MuiTypography-root": {
								fontSize: 14,
							},
						}}
					/>
					<FormControlLabel
						value="marketplace"
						control={
							<Radio
								sx={{
									"& .MuiSvgIcon-root": {
										fontSize: 18,
									},
								}}
							/>
						}
						label={
							<div className="flex gap-2 items-center font-light">
								<Image
									src={thai_marketplace_icon}
									alt="marketplace icon"
									className="w-6 h-6"
								/>
								<p>Marketplace</p>
							</div>
						}
						labelPlacement="start"
						sx={{
							display: "flex",
							justifyContent: "space-between",
							width: "100%",
							color: "#717171",
							"& .MuiTypography-root": {
								fontSize: 14,
							},
						}}
					/>
					<FormControlLabel
						value="thai help"
						control={
							<Radio
								sx={{
									"& .MuiSvgIcon-root": {
										fontSize: 18,
									},
								}}
							/>
						}
						label={
							<div className="flex gap-2 items-center font-light">
								<Image
									src={thai_help_icon}
									alt="thai help icon"
									className="w-6 h-6"
								/>
								<p>Thai Help</p>
							</div>
						}
						labelPlacement="start"
						sx={{
							display: "flex",
							justifyContent: "space-between",
							width: "100%",
							color: "#717171",
							"& .MuiTypography-root": {
								fontSize: 14,
							},
						}}
					/>
				</RadioGroup>
			</FormControl>
			{/* <button className="flex gap-2 items-center mt-4 ml-2">
				<Image src={thai_jobs_icon} alt="jobs icon" className="w-6 h-6" />
				<p className="text-[color:var(--deals-primary)] font-extralight text-sm">
					Jobs
				</p>
			</button>
			<button className="flex gap-2 items-center mt-4 ml-2">
				<Image src={thai_housing_icon} alt="jobs icon" className="w-6 h-6" />
				<p className="text-[color:var(--deals-primary)] font-extralight text-sm">
					Housing
				</p>
			</button>
			<button className="flex gap-2 items-center mt-4 ml-2">
				<Image
					src={thai_marketplace_icon}
					alt="jobs icon"
					className="w-6 h-6"
				/>
				<p className="text-[color:var(--deals-primary)] font-extralight text-sm">
					Marketplace
				</p>
			</button>
			<button className="flex gap-2 items-center mt-4 ml-2">
				<Image src={thai_help_icon} alt="jobs icon" className="w-6 h-6" />
				<p className="text-[color:var(--deals-primary)] font-extralight text-sm">
					Thai help
				</p>
			</button> */}
		</div>
	);
}

export default ServiceSearch;
