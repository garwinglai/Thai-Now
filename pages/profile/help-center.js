import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import styles from "@/styles/pages/profile/help-center.module.css";
import Link from "next/link";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import HelpCenterPanels from "@/components/profile/HelpCenterCustomer";
import GetInTouchLayoutMobile from "@/components/layouts/GetInTouchLayoutMobile";
import HelpCenterCustomer from "@/components/profile/HelpCenterCustomer";
import HelpCenterBusiness from "@/components/profile/HelpCenterBusiness";
import { useRouter } from "next/router";

function HelpCenter() {
	const [value, setValue] = React.useState(0);
	const { back } = useRouter();

	const handleBack = () => {
		back();
	};

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<div className={`${styles.help_box}`}>
			<button
				onClick={handleBack}
				className={`${styles.flex} ${styles.back_btn}`}
			>
				<ChevronLeftIcon />
				<p>Back</p>
			</button>
			<h2>How can we help?</h2>
			<div className={`${styles.search_box}`}>
				<FormControl fullWidth>
					<InputLabel htmlFor="outlined-adornment-amount">
						Tell us about your issue
					</InputLabel>
					<OutlinedInput
						sx={{
							backgroundColor: "rgba(247, 247, 252, 1)",
							borderRadius: "8px",
							border: "none",
							outline: "none",
						}}
						id="outlined-adornment-amount"
						startAdornment={
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						}
						label="Tell us about your issue"
					/>
				</FormControl>
			</div>
			<div className={`${styles.tabs_box}`}>
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label="basic tabs example"
					>
						<Tab
							label="For Customers"
							sx={{ fontSize: "12px", margin: "0", paddingBottom: "0" }}
							{...a11yProps(0)}
						/>
						<Tab
							label="For Business"
							sx={{ fontSize: "12px", paddingBottom: "0" }}
							{...a11yProps(1)}
						/>
					</Tabs>
				</Box>
				<TabPanel value={value} index={0}>
					<HelpCenterCustomer />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<HelpCenterBusiness />
				</TabPanel>
			</div>
		</div>
	);
}

export default HelpCenter;

HelpCenter.getLayout = function getLayout(page) {
	return (
		<MainLayout route="profile">
			{page}
			<GetInTouchLayoutMobile />
		</MainLayout>
	);
};

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}
