import DirectoryHeader from "@/components/directories/DirectoryHeader";
import MainLayout from "@/components/layouts/MainLayout";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SearchResultCard from "@/components/directories/thai-help/SearchResultCard";

function MyConversation() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="pt-16">
      <div className="md:px-[10%]">
        <DirectoryHeader
          directory="Thai help"
          title="Community"
          slug="community"
          breadcrumbTitle="My Conversation"
        />
        <h4 className=" px-4 pb-4 text-[color:var(--deals-primary)] md:my-4 md:pb-0">
          My Conversation
        </h4>
      </div>
      <div className="bg-[--input-bg-secondary] md:mx-[10%] md:bg-white md:border-b">
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
          variant="scrollable"
        >
          <StyledTab label="My Conversation" />
          <StyledTab label="Reply" />
        </StyledTabs>
      </div>
      <div className="px-4 md:px-[10%]">
        <SearchResultCard
          directory="thai-help"
          postType="housing"
          slug="community"
          breadcrumbTitle="Basic living"
          category="basic-living"
          postId="1"
          myConversation={true}
        />
        <SearchResultCard
          directory="thai-help"
          postType="living"
          slug="community"
          breadcrumbTitle="Living permanently"
          category="living-permanently"
          postId="1"
          myConversation={true}
        />
        <SearchResultCard
          directory="thai-help"
          postType="health"
          slug="community"
          breadcrumbTitle="Health"
          category="health"
          postId="1"
          myConversation={true}
        />
      </div>
    </div>
  );
}

export default MyConversation;

MyConversation.getLayout = function getLayout(page) {
  return <MainLayout route="directory">{page}</MainLayout>;
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
