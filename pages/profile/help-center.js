import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import GetInTouchLayoutMobile from "@/components/layouts/GetInTouchLayoutMobile";
import HelpCenterCustomer from "@/components/profile/HelpCenterCustomer";
import HelpCenterBusiness from "@/components/profile/HelpCenterBusiness";
import { useRouter } from "next/router";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

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
    <div className="p-4 pb-12 lg:pt-24">
      <button
        onClick={handleBack}
        className="flex items-center gap-2 lg:hidden"
      >
        <ChevronLeftIcon />
        <p>Back</p>
      </button>
      <div className="hidden lg:block lg:ml-24">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            href="/"
            className="text-[color:var(--deals-primary)]"
          >
            Home
          </Link>
          <p className="font-light text-[color:var(--label-color)]">
            Help Center
          </p>
        </Breadcrumbs>
      </div>
      <h2 className="text-center pt-4 pb-8 text-[color:var(--deals-primary)]">
        How can we help?
      </h2>
      <div className="w-full mb-4 relative lg:w-4/12 lg:mx-auto">
        <label htmlFor="search" className="absolute top-2 left-4">
          <SearchIcon />
        </label>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Tell us about your issue "
          className="w-full rounded-md indent-8 bg-[color:var(--input-bg-secondary)] border-none"
        />
      </div>
      <div className="lg:px-52 lg:mx-auto">
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
