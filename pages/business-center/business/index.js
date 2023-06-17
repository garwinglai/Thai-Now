import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import BusinessCenterPageHeader from "@/components/business-center/BusinessCenterPageHeader";
import BusinessCenterBodyHeader from "@/components/business-center/BusinessCenterBodyHeader";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import marketplace_gray_icon from "@/public/static/images/icons/marketplace_gray_icon.png";
import Image from "next/image";
import HousingCard from "@/components/directories/cards/HousingCard";
import MarketplaceCard from "@/components/directories/cards/MarketplaceCard";
import BusinessCenterReview from "@/components/business-center/BusinessCenterReview";
import Drawer from "@mui/material/Drawer";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { IconButton } from "@mui/material";
import Link from "next/link";
import JobsCard from "@/components/directories/cards/JobsCard";

function BusinessCenterBusiness() {
	const [value, setValue] = React.useState(0);
	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const handleCreatePost = () => {
		toggleDrawer("bottom", true);
	};

	return (
		<div className="flex flex-col gap-2 h-screen w-full">
			<BusinessCenterPageHeader isBusinessUser={true} />
			<div className="bg-white border-t-4 border-gray-100">
				<BusinessCenterBodyHeader route="business" />
				<div className="bg-gray-100">
					<StyledTabs
						value={value}
						onChange={handleChange}
						aria-label="styled tabs example"
						variant="scrollable"
					>
						<StyledTab label="Jobs" />
						<StyledTab label="Housing" />
						<StyledTab label="Marketplace" />
						<StyledTab label="Drafts" />
						<StyledTab label="Review" />
					</StyledTabs>
				</div>
				{/* //* No posts */}
				{/* <div className="p-4 flex flex-col items-center justify-center">
					<div className="flex flex-col items-center justify-center w-1/2 gap-2 pt-8">
						<Image src={marketplace_gray_icon} alt="no post icon" />
						<p className="text-center text-gray-300 text-xs font-light">
							There are no posted Housing available at the moment
						</p>
					</div>
				</div> */}
				<div className="px-4 mb-16 pb-8">
					<TabPanel value={value} index={0}>
						<JobsCard isBusinessCenter={true} isBusinessUser={true} />
					</TabPanel>
					<TabPanel value={value} index={1}>
						<HousingCard isBusinessCenter={true} isBusinessUser={true} />
					</TabPanel>
					<TabPanel value={value} index={2}>
						<MarketplaceCard isBusinessCenter={true} isBusinessUser={true} />
					</TabPanel>
					<TabPanel value={value} index={3}>
						<HousingCard isBusinessCenter={true} isBusinessUser={true} />
						<JobsCard isBusinessCenter={true} isBusinessUser={true} />
						<MarketplaceCard isBusinessCenter={true} isBusinessUser={true} />
					</TabPanel>
					<TabPanel value={value} index={4}>
						<BusinessCenterReview />
						<BusinessCenterReview />
					</TabPanel>
				</div>
				<div className="py-5 px-4 bg-white border-t border-gray-100 fixed w-full bottom-0">
					<button
						className="bg-orange-600 text-white text-sm rounded-md py-3 px-4 w-full"
						onClick={toggleDrawer("bottom", true)}
					>
						Create your post
					</button>
					<Drawer
						anchor={"bottom"}
						open={state["bottom"]}
						onClose={toggleDrawer("bottom", false)}
					>
						<div className="relative">
							<div className="p-4 border-b border-gray-100">
								<h4 className="text-center">Type of Post</h4>
								<div className="absolute right-3 top-3">
									<IconButton onClick={toggleDrawer("bottom", false)}>
										<CloseOutlinedIcon />
									</IconButton>
								</div>
							</div>
							<div className="flex flex-col gap-4 p-8">
								<Link
									href="/business-center/business/create/jobs"
									className="text-center w-full py-2 border border-[color:var(--deals-primary-med)] border-opacity-50 text-[color:var(--deals-primary)] rounded hover:text-white hover:bg-[color:var(--deals-primary-med)] active:text-white active:bg-[color:var(--deals-primary-med)]"
								>
									Jobs
								</Link>
								<Link
									href="/business-center/business/create/housing"
									className="text-center w-full py-2 border border-[color:var(--deals-primary-med)] border-opacity-50 text-[color:var(--deals-primary)] rounded hover:text-white hover:bg-[color:var(--deals-primary-med)] active:text-white active:bg-[color:var(--deals-primary-med)]"
								>
									Housing
								</Link>
								<Link
									href="/business-center/business/create/marketplace"
									className="text-center w-full text-[color:var(--deals-primary)]  py-2 border border-[color:var(--deals-primary-med)] border-opacity-50 rounded hover:text-white hover:bg-[color:var(--deals-primary-med)] active:text-white active:bg-[color:var(--deals-primary-med)]"
								>
									Marketplace
								</Link>
							</div>
						</div>
					</Drawer>
				</div>
			</div>
		</div>
	);
}

export default BusinessCenterBusiness;

BusinessCenterBusiness.getLayout = function getLayout(page) {
	return <MainLayout route="business-center">{page}</MainLayout>;
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
			{value === index && <div>{children}</div>}
		</div>
	);
}

const StyledTabs = styled((props) => (
	<Tabs
		{...props}
		TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
	/>
))({
	"& .MuiTabs-indicator": {
		display: "flex",
		justifyContent: "center",
		backgroundColor: "transparent",
	},
	"& .MuiTabs-indicatorSpan": {
		width: "100%",
		backgroundColor: "rgba(2, 68, 155, 1)",
	},
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
	({ theme }) => ({
		textTransform: "none",
		fontWeight: theme.typography.fontWeightRegular,
		fontSize: theme.typography.pxToRem(15),
		marginRight: theme.spacing(1),
		color: "rgba(51, 51, 51, 1)",
		"&.Mui-selected": {
			color: "rgba(2, 68, 155, 1)",
		},
		"&.Mui-focusVisible": {
			backgroundColor: "rgba(100, 95, 228, 0.32)",
		},
	})
);
