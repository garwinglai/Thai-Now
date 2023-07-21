import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import BusinessCenterPageHeader from "@/components/business-center/BusinessCenterPageHeader";
import BusinessCenterBodyHeader from "@/components/business-center/BusinessCenterBodyHeader";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HousingCard from "@/components/directories/cards/HousingCard";
import MarketplaceCard from "@/components/directories/cards/MarketplaceCard";
import BusinessCenterReview from "@/components/business-center/BusinessCenterReview";
import Drawer from "@mui/material/Drawer";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { IconButton } from "@mui/material";
import Link from "next/link";
import AccountPrivateMenu from "@/components/menus/AccountPrivateMenu";
import PrivateProfileBreadcrumbs from "@/components/menus/PrivateProfileBreadcrumbs";
import marketplace_gray_icon from "@/public/static/images/icons/marketplace_gray_icon.png";
import Image from "next/image";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import UserPostDesktopRow from "@/components/business-center/UserPostDesktopRow";

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

function BusinessCenter() {
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
    <div className="lg:pt-20 lg:bg-[color:var(--profile-bg)] lg:p-4">
      <div className="hidden lg:block lg:ml-[10%] lg:pb-6 lg:pt-4">
        <PrivateProfileBreadcrumbs breadcrumb="My Business" />
      </div>
      <div className="lg:flex lg:mx-auto  lg:gap-4 lg:w-[80%]">
        <div className="hidden lg:block lg:bg-white lg:rounded-md lg:shadow-md lg:h-fit lg:min-w-[11rem] ">
          <AccountPrivateMenu currentRoute="business-center" />
        </div>
        <div className="lg:flex-grow lg:pb-16">
          <div className="flex flex-col gap-2 h-screen">
            <div className="lg:shadow">
              <BusinessCenterPageHeader />
            </div>
            <div className=" bg-white border-t-4 border-gray-100 lg:shadow lg:rounded-md">
              <BusinessCenterBodyHeader route="classic" />
              <div className="bg-gray-100">
                <StyledTabs
                  value={value}
                  onChange={handleChange}
                  aria-label="menu tabs"
                  variant="scrollable"
                >
                  <StyledTab label="Housing" />
                  <StyledTab label="Marketplace" />
                  <StyledTab label="Drafts" />
                  <StyledTab label="Review" />
                </StyledTabs>
              </div>
              {/* //* No posts */}
              {/* <div className="p-4 flex flex-col items-center justify-center lg:mt-12 lg:mb-24">
                <div className="flex flex-col items-center justify-center w-1/2 gap-2 pt-8">
                  <Image src={marketplace_gray_icon} alt="no post icon" />
                  <p className="text-center text-[color:var(--label-color)] text-xs font-light lg:w-2/5 lg:text-sm">
                    There are no posted Housing available at the moment
                  </p>
                </div>
              </div> */}
              {getMobileViewDisplayPosts(value)}
              {getDesktopViewDisplayPosts()}
              <div className="py-5 px-4 bg-white border-t border-gray-100 fixed w-full bottom-0 lg:hidden">
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
                        href="/business-center/classic/create/housing"
                        className="text-center w-full py-2 border border-[color:var(--deals-primary-med)] border-opacity-50 text-[color:var(--deals-primary)] rounded hover:text-white hover:bg-[color:var(--deals-primary-med)] active:text-white active:bg-[color:var(--deals-primary-med)]"
                      >
                        Housing
                      </Link>
                      <Link
                        href="/business-center/classic/create/marketplace"
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
        </div>
      </div>
    </div>
  );
}

export default BusinessCenter;

BusinessCenter.getLayout = function getLayout(page) {
  return <MainLayout route="business-center">{page}</MainLayout>;
};

function getMobileViewDisplayPosts(value) {
  return (
    <div className="px-4 mb-16 pb-8 lg:hidden">
      <TabPanel value={value} index={0}>
        <HousingCard isBusinessCenter={true} directory="housing" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MarketplaceCard isBusinessCenter={true} directory="marketplace" />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MarketplaceCard isBusinessCenter={true} directory="marketplace" />
        <HousingCard isBusinessCenter={true} directory="housing" />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <BusinessCenterReview />
        <BusinessCenterReview />
      </TabPanel>
    </div>
  );
}

function getDesktopViewDisplayPosts() {
  return (
    <div className="hidden lg:p-4 lg:block">
      <div className="flex justify-between items-center">
        <h4 className="">10 Listings</h4>
        <Link
          href="/business-center/classic/create"
          className="text-white bg-[color:var(--secondary)] rounded px-3 py-2 font-light text-xs"
        >
          Create your post
        </Link>
      </div>
      <div className="hidden lg:block my-4">
        <table className="w-full">
          <thead className="w-full pb-20 border-b">
            <tr className="">
              <th className="text-center pb-2 w-1/12">
                <input
                  type="checkbox"
                  className="form-checkbox checked:accent-[color:var(--deals-primary-med)] w-4 h-4 rounded border-[color:var(--placeholder-color)] focus:ring-0"
                />
              </th>
              <th className="text-left font-medium text-xs pb-2 w-4/12">
                Name
              </th>
              <th className="text-left font-medium text-xs pb-2 w-1/12">
                Type
              </th>
              <th className="text-left font-medium text-xs pb-2 w-1/12">
                Price
              </th>
              <th className="text-left font-medium text-xs pb-2">Location</th>
              <th className="text-center font-medium text-xs pb-2 whitespace-nowrap ">
                Last Modified
              </th>
              <th className="text-center font-medium text-xs pb-2">Author</th>
            </tr>
          </thead>
          <tbody className="w-full">
            <UserPostDesktopRow />
            <UserPostDesktopRow even={true} />
            <UserPostDesktopRow />
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center pt-4">
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            name="select-all"
            id="select-all"
            className=""
          />
          <p className="text-sm font-light opacity-70">Select All</p>
          <button className="text-[color:var(--deals-primary)]  border-[color:var(--deals-primary)] border border-opacity-50 rounded px-2 ">
            Delete
          </button>
        </div>
        <div className="flex gap-2 items-center">
          <IconButton>
            <NavigateBeforeIcon />
          </IconButton>
          <p className="mr-4 font-light text-[color:var(--secondary)] ">1</p>
          <p className=" font-light">2</p>
          <IconButton>
            <NavigateNextIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
