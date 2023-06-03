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
import { Alert, IconButton } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

// TODO: get data to prefill business name and email

function CreateBusiness() {
	const [step, setStep] = useState(1);
	const [businessCategory, setBusinessCategory] = useState("Restaurant");
	const [businessValues, setBusinessValues] = useState({
		bizName: "",
		email: "",
		phoneNumber: "",
		address: "",
		website: "",
		about: "",
	});
	const [snackBar, setSnackBar] = useState({
		isSnackBarOpen: false,
		snackMessage: "",
	});

	const { bizName, email, phoneNumber, address, website, about } =
		businessValues;
	const { isSnackBarOpen, snackMessage } = snackBar;

	const { push, back } = useRouter();

	const handleNext = () => {
		if (step === 2) {
			if (bizName === "") {
				setSnackBar((prev) => ({
					isSnackBarOpen: true,
					snackMessage: "Missing business name.",
				}));
				return;
			}
			if (email === "") {
				setSnackBar((prev) => ({
					isSnackBarOpen: true,
					snackMessage: "Missing email.",
				}));
				return;
			}
			if (phoneNumber === "") {
				setSnackBar((prev) => ({
					isSnackBarOpen: true,
					snackMessage: "Missing phone number.",
				}));
				return;
			}

			// TODO: create business, then nav to business profile
			push("/profile/business");
			return;
		}
		setStep((prev) => prev + 1);
	};

	const handleBack = () => {
		if (step === 1) {
			back();
		}

		if (step === 2) {
			setStep((prev) => prev - 1);
		}
	};

	const handleCloseSnackBar = () => {
		setSnackBar({ isSnackBarOpen: false, snackMessage: "" });
	};

	const handleBusinessCategoryChange = (e) => {
		setBusinessCategory(e.target.value);
	};

	const handleChangeBizValues = (e) => {
		const { name, values } = e.target;
		setBusinessValues((prev) => ({ ...prev, [name]: values }));
	};

	return (
		<div className={`${styles.create_business_box}`}>
			<Snackbar
				open={isSnackBarOpen}
				autoHideDuration={6000}
				onClose={handleCloseSnackBar}
			>
				<Alert
					onClose={handleCloseSnackBar}
					severity="error"
					sx={{ width: "100%", marginBottom: "5rem" }}
				>
					{snackMessage}
				</Alert>
			</Snackbar>
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
			{step === 1 &&
				BusinessCategories(handleBusinessCategoryChange, businessCategory)}
			{step === 2 && BusinessDetails(handleChangeBizValues, businessValues)}
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

function BusinessCategories(handleBusinessCategoryChange, businessCategory) {
	return (
		<FormControl sx={{ width: "100%", padding: "0 2rem 0 1rem" }}>
			<RadioGroup
				column
				aria-labelledby="form-control-label-placement"
				name="position"
				defaultValue="top"
				value={businessCategory}
				onChange={handleBusinessCategoryChange}
			>
				{categories.map((category) => (
					<RadioCategory category={category} key={category} />
				))}
			</RadioGroup>
		</FormControl>
	);
}

function BusinessDetails(handleChangeBizValues, businessValues) {
	const { bizName, email, phoneNumber, address, website, about } =
		businessValues;

	return (
		<form className={`${styles.form_box} ${styles.flexCol}`}>
			<div>
				<label htmlFor="business-name">Business Name</label>
				<input
					type="text"
					name="bizName"
					id="bizName"
					value={bizName}
					onChange={handleChangeBizValues}
					className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-4 py-2 "
				/>
			</div>
			<div>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					name="email"
					id="email"
					value={email}
					onChange={handleChangeBizValues}
					className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-4 py-2 "
				/>
			</div>
			<div>
				<label htmlFor="phone-number">
					Phone Number{" "}
					<span className="text-[color:var(--secondary)] ">* </span>
				</label>
				<input
					type="number"
					name="phoneNumber"
					id="phoneNumber"
					value={phoneNumber}
					onChange={handleChangeBizValues}
					className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-4 py-2 "
				/>
			</div>
			<div>
				<label htmlFor="address">
					Business Address
					<span className="text-[color:var(--secondary)] ">* </span>
				</label>
				<input
					type="text"
					name="address"
					id="address"
					value={address}
					onChange={handleChangeBizValues}
					className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-4 py-2 "
				/>
			</div>
			<div>
				<label htmlFor="website">
					Website
					<span className={`${styles.optional_text}`}>{` (Optional)`}</span>
				</label>
				<input
					type="text"
					name="website"
					id="website"
					value={website}
					onChange={handleChangeBizValues}
					className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-4 py-2 "
				/>
			</div>
			<div>
				<label htmlFor="about">
					About your business
					<span className={`${styles.optional_text}`}>{` (Optional)`}</span>
				</label>
				<textarea
					value={about}
					onChange={handleChangeBizValues}
					name="about"
					id="about"
					rows="5"
					className="w-full bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] rounded p-4 "
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
