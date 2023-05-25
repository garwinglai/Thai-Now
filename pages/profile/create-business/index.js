import React, { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import styles from "@/styles/pages/profile/create-business/index.module.css";
import Link from "next/link";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import RadioCategory from "@/components/profile/create-business/RadioCategory";
import { useRouter } from "next/router";
import { TextField } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function CreateBusiness() {
	const [step, setStep] = useState(1);

	const { push } = useRouter();

	const handleNext = () => {
		setStep((prev) => prev + 1);
	};

	const handleBack = () => {
		if (step === 1) {
			push("/");
		}

		if (step === 2) {
			setStep((prev) => prev - 1);
		}
	};

	return (
		<div className={`${styles.create_business_box}`}>
			<div className={`${styles.header_box}`}>
				<button
					onClick={handleBack}
					className={`${styles.flex} ${styles.back_btn}`}
				>
					<ChevronLeftIcon />
					<p>Back</p>
				</button>
				<h3>
					{step === 1
						? "What is the catogry of your business?"
						: "Tell us about your Business"}
				</h3>
			</div>
			{step === 1 && BusinessCategories()}
			{step === 2 && BusinessDetails()}
			<div className={`${styles.btn_box}`}>
				<button className={`${styles.next_btn}`} onClick={handleNext}>
					{step === 1 ? "Next" : "Create your Business"}
				</button>
			</div>
		</div>
	);
}

export default CreateBusiness;

CreateBusiness.getLayout = function getLayout(page) {
	return <MainLayout route="create-business">{page}</MainLayout>;
};

function BusinessCategories() {
	return (
		<FormControl sx={{ width: "100%", padding: "0 2rem 0 1rem" }}>
			<RadioGroup
				column
				aria-labelledby="form-control-label-placement"
				name="position"
				defaultValue="top"
			>
				{categories.map((category) => (
					<RadioCategory category={category} key={category} />
				))}
			</RadioGroup>
		</FormControl>
	);
}

function BusinessDetails() {
	return (
		<form className={`${styles.form_box} ${styles.flexCol}`}>
			<div>
				<label htmlFor="business-name">Business Name</label>
				<TextField
					// required
					id="business-name"
					// label="Business Name"
					fullWidth
					type="text"
					defaultValue="Apop Burger"
					sx={{
						backgroundColor: "rgba(247, 247, 252, 1)",
						marginTop: "0.5rem",
					}}
				/>
			</div>
			<div>
				<label htmlFor="email">Email</label>
				<TextField
					// required
					id="email"
					// label="Email"
					fullWidth
					type="email"
					defaultValue="apopburger@gmail.com"
					sx={{
						backgroundColor: "rgba(247, 247, 252, 1)",
						marginTop: "0.5rem",
					}}
				/>
			</div>
			<div>
				<label htmlFor="phone-number">Phone Number *</label>
				<TextField
					required
					id="phone-number"
					// label="Phone Number"
					fullWidth
					type="number"
					defaultValue="555 555-5555"
					sx={{
						backgroundColor: "rgba(247, 247, 252, 1)",
						marginTop: "0.5rem",
					}}
				/>
			</div>
			<div>
				<label htmlFor="address">Business Address *</label>
				<TextField
					required
					id="address"
					// label="Address"
					fullWidth
					type="text"
					defaultValue="5910 W sunset, Los Angeles CA 90028"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<LocationOnIcon />
							</InputAdornment>
						),
					}}
					sx={{
						backgroundColor: "rgba(247, 247, 252, 1)",
						marginTop: "0.5rem",
					}}
				/>
			</div>
			<div>
				<label htmlFor="website">
					Website
					<span className={`${styles.optional_text}`}>{` (Optional)`}</span>
				</label>
				<TextField
					id="website"
					// label="Website (Optional)"
					fullWidth
					type="text"
					sx={{
						backgroundColor: "rgba(247, 247, 252, 1)",
						marginTop: "0.5rem",
					}}
				/>
			</div>
			<div>
				<label htmlFor="about">
					About your business
					<span className={`${styles.optional_text}`}>{` (Optional)`}</span>
				</label>
				<TextField
					required
					id="about"
					// label="About your business (Optional)"
					fullWidth
					type="text"
					multiline
					rows={4}
					sx={{
						backgroundColor: "rgba(247, 247, 252, 1)",
						marginTop: "0.5rem",
					}}
				/>
				<p className={`${styles.textarea_count}`}>151/500</p>
			</div>
		</form>
	);
}

const categories = [
	"Restaurant",
	"Massage / Spa",
	"Beauty",
	"Insurance",
	"Auto Services",
	"Travel",
	"Retail",
	"Market",
	"Factory",
	"Financial",
	"Other",
];
