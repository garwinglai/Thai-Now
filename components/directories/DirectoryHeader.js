import React, { useState, useEffect } from "react";
import styles from "../../styles/components/directory/directory-header.module.css";
import Link from "next/link";
import Image from "next/image";
import SortIcon from "@mui/icons-material/Sort";
import TuneIcon from "@mui/icons-material/Tune";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import SortSearchResults from "./filters/SortSearchResults";
import thai_business_icon from "../../public/static/images/icons/thai_business_icon.svg";
import thai_deals_icon from "../../public/static/images/icons/thai_deals_icon.svg";
import thai_guidebook_icon from "../../public/static/images/icons/thai_guidebook_icon.svg";
import thai_help_icon from "../../public/static/images/icons/thai_help_icon.svg";
import thai_housing_icon from "../../public/static/images/icons/thai_housing_icon.svg";
import thai_jobs_icon from "../../public/static/images/icons/thai_jobs_icon.svg";
import thai_marketplace_icon from "../../public/static/images/icons/thai_marketplace_icon.svg";
import thai_talks_icon from "../../public/static/images/icons/thai_talks_icon.svg";
import JobFilters from "./filters/jobs/JobFilters";
import ThaiHelpFilters from "./filters/thai-help/ThaiHelpFilters";
import TalksFilters from "./filters/talks/TalksFilters";
import GuidesFilters from "./filters/guides/GuidesFilters";
import BusinessFilters from "./filters/businesses/BusinessFilters";
import MarketplaceFilters from "./filters/marketplace/MarketplaceFilters";
import DealsFilters from "./filters/deals/DealsFilters";
import HousingFilters from "./filters/housing/HousingFilters";
import Breadcrumbs from "@mui/material/Breadcrumbs";

function DirectoryHeader({
  directory,
  slug,
  category,
  title,
  breadcrumbTitle,
}) {
  const [capitalizedDirectory, setCapitalizedDirectory] = useState("");
  const [openSortDrawer, setOpenSortDrawer] = useState(false);
  const [drawers, setDrawers] = useState({
    openThaiHelp: false,
    openThaiJobs: false,
    openHousing: false,
    openDeals: false,
    openMarketplace: false,
    openBusinesses: false,
    openGuides: false,
    openTalks: false,
  });

  const {
    openThaiHelp,
    openThaiJobs,
    openHousing,
    openDeals,
    openMarketplace,
    openBusinesses,
    openGuides,
    openTalks,
  } = drawers;

  useEffect(() => {
    if (directory === "businesses") {
      setCapitalizedDirectory("Thai business");
      return;
    }

    if (slug === "community") {
      if (breadcrumbTitle) {
        setCapitalizedDirectory(breadcrumbTitle);
        return;
      }
      setCapitalizedDirectory("ThaiNow Community");
      return;
    }

    const firstLetter = directory.charAt(0);
    const firstLetterCap = firstLetter.toUpperCase();
    const remainingLetters = directory.slice(1);
    const capitalizedDirectory = firstLetterCap + remainingLetters;

    setCapitalizedDirectory(capitalizedDirectory);
  }, [directory]);

  const toggleDrawerPostedDate = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenSortDrawer(open);
  };

  const toggleDrawerFilter = (directory, open) => (e) => {
    if (directory === "Thai help")
      return setDrawers((prev) => ({ ...prev, openThaiHelp: open }));
    if (directory === "jobs")
      return setDrawers((prev) => ({ ...prev, openThaiJobs: open }));
    if (directory === "housing")
      return setDrawers((prev) => ({ ...prev, openHousing: open }));
    if (directory === "deals")
      return setDrawers((prev) => ({ ...prev, openDeals: open }));
    if (directory === "marketplace")
      return setDrawers((prev) => ({ ...prev, openMarketplace: open }));
    if (directory === "businesses")
      return setDrawers((prev) => ({ ...prev, openBusinesses: open }));
    if (directory === "guides")
      return setDrawers((prev) => ({ ...prev, openGuides: open }));
    if (directory === "thai-talks")
      return setDrawers((prev) => ({ ...prev, openTalks: open }));
  };

  function showFilterDrawers(directory) {
    if (directory === "Thai help")
      return (
        <SwipeableDrawer
          anchor={"bottom"}
          open={openThaiHelp}
          onClose={toggleDrawerFilter(directory, false)}
          onOpen={toggleDrawerFilter(directory, true)}
        >
          <ThaiHelpFilters
            directory={directory}
            closeDrawer={toggleDrawerFilter}
          />
        </SwipeableDrawer>
      );
    if (directory === "jobs")
      return (
        <SwipeableDrawer
          anchor={"bottom"}
          open={openThaiJobs}
          onClose={toggleDrawerFilter(directory, false)}
          onOpen={toggleDrawerFilter(directory, true)}
        >
          <JobFilters directory={directory} closeDrawer={toggleDrawerFilter} />
        </SwipeableDrawer>
      );
    if (directory === "housing")
      return (
        <SwipeableDrawer
          anchor={"bottom"}
          open={openHousing}
          onClose={toggleDrawerFilter(directory, false)}
          onOpen={toggleDrawerFilter(directory, true)}
        >
          <HousingFilters
            directory={directory}
            closeDrawer={toggleDrawerFilter}
          />
        </SwipeableDrawer>
      );
    if (directory === "deals")
      return (
        <SwipeableDrawer
          anchor={"bottom"}
          open={openDeals}
          onClose={toggleDrawerFilter(directory, false)}
          onOpen={toggleDrawerFilter(directory, true)}
        >
          <DealsFilters
            directory={directory}
            closeDrawer={toggleDrawerFilter}
          />
        </SwipeableDrawer>
      );
    if (directory === "marketplace")
      return (
        <SwipeableDrawer
          anchor={"bottom"}
          open={openMarketplace}
          onClose={toggleDrawerFilter(directory, false)}
          onOpen={toggleDrawerFilter(directory, true)}
        >
          <MarketplaceFilters
            directory={directory}
            closeDrawer={toggleDrawerFilter}
          />
        </SwipeableDrawer>
      );
    if (directory === "businesses")
      return (
        <SwipeableDrawer
          anchor={"bottom"}
          open={openBusinesses}
          onClose={toggleDrawerFilter(directory, false)}
          onOpen={toggleDrawerFilter(directory, true)}
        >
          <BusinessFilters
            directory={directory}
            closeDrawer={toggleDrawerFilter}
          />
        </SwipeableDrawer>
      );
    if (directory === "guides")
      return (
        <SwipeableDrawer
          anchor={"bottom"}
          open={openGuides}
          onClose={toggleDrawerFilter(directory, false)}
          onOpen={toggleDrawerFilter(directory, true)}
        >
          <GuidesFilters
            directory={directory}
            closeDrawer={toggleDrawerFilter}
          />
        </SwipeableDrawer>
      );
    if (directory === "thai-talks")
      return (
        <SwipeableDrawer
          anchor={"bottom"}
          open={openTalks}
          onClose={toggleDrawerFilter(directory, false)}
          onOpen={toggleDrawerFilter(directory, true)}
        >
          <TalksFilters
            directory={directory}
            closeDrawer={toggleDrawerFilter}
          />
        </SwipeableDrawer>
      );
  }

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      className="hover:underline"
    >
      Home
    </Link>,
    <p key="2" className="text-sm mt-1 text-[color:var(--text-body-color)]">
      {directory}
    </p>,
  ];

  const breadcrumbsThaiHelp = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      className="hover:underlin text-[color:var(--deals-primary)] font-base text-sm"
    >
      Home
    </Link>,
    <Link
      href="/thai-help"
      key="2"
      className="hover:underline text-[color:var(--deals-primary)] font-base text-sm"
    >
      {directory}
    </Link>,
    <p key="2" className="text-sm mt-1 text-[color:var(--text-body-color)]">
      {title}
    </p>,
  ];

  const breadcrumbsThaiHelpCategory = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      className="hover:underlin text-[color:var(--deals-primary)] font-base text-sm"
    >
      Home
    </Link>,
    <Link
      href="/thai-help"
      key="2"
      className="hover:underline text-[color:var(--deals-primary)] font-base text-sm"
    >
      {directory}
    </Link>,
    <Link
      href={`/thai-help/${slug}`}
      key="2"
      className="hover:underline text-[color:var(--deals-primary)] font-base text-sm"
    >
      {title}
    </Link>,
    <p
      key="2"
      className="text-sm mt-1 text-[color:var(--text-body-color)] break-normal"
    >
      {breadcrumbTitle}
    </p>,
  ];

  return (
    <div className="pt-6 pb-4 px-4">
      <div
        className={`flex flex-nowrap w-full bg-white overflow-x-scroll ${
          slug === "guide-book" && "mt-4 mb-4"
        }`}
      >
        <Breadcrumbs
          separator="›"
          aria-label="breadcrumb"
          sx={{ overflow: "scroll", display: "flex", flexWrap: "nowrap" }}
        >
          {slug === "guide-book" || slug === "community"
            ? breadcrumbTitle
              ? breadcrumbsThaiHelpCategory
              : breadcrumbsThaiHelp
            : breadcrumbs}
        </Breadcrumbs>
      </div>
      {slug !== "guide-book" && (
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2">
            {slug !== "community" && directoryIcon(directory)}
            {slug === "community" &&
              (!breadcrumbTitle || breadcrumbTitle === "My Conversation") && (
                <h4 className="text-[color:var(--deals-primary)]">
                  {capitalizedDirectory}
                  {slug !== "community" && "near Los Angeles, CA"}
                </h4>
              )}
          </div>
          {slug === "community" && !breadcrumbTitle && (
            <Link
              href="/thai-help/community/my-conversation"
              className="border px-2 py-1 border-[color:var(--deals-primary)] font-light text-[color:var(--deals-primary)] rounded"
            >
              My Conversation
            </Link>
          )}
        </div>
      )}
      {directory !== "Thai help" && (
        <div className={`${styles.filters_group} ${styles.flex}`}>
          <button
            onClick={toggleDrawerPostedDate(true)}
            className={`${styles.flex} ${styles.button_box} ${styles.posted_date_filter}`}
          >
            <SortIcon />
            <p>Posted Date</p>
          </button>
          <SwipeableDrawer
            anchor={"bottom"}
            open={openSortDrawer}
            onClose={toggleDrawerPostedDate(false)}
            onOpen={toggleDrawerPostedDate(true)}
          >
            <SortSearchResults closeDrawer={toggleDrawerPostedDate} />
          </SwipeableDrawer>

          <button
            onClick={toggleDrawerFilter(directory, true)}
            className={`${styles.flex} ${styles.button_box} ${styles.fitler_button}`}
          >
            <TuneIcon />
            <p>Filter</p>
          </button>
          {showFilterDrawers(directory)}
        </div>
      )}
      <div className={`${styles.footer_desktop} ${styles.flex}`}>
        <div className={`${styles.footer_left}`}>
          <p className={`${styles.footer_color_p_gray}`}>
            18 results for{" "}
            <span
              className={`${styles.directory_color}`}
            >{`"${capitalizedDirectory}"`}</span>
          </p>
        </div>
        <div className={`${styles.footer_right} ${styles.flex}`}>
          <p
            className={`${styles.footer_sort_p} ${styles.footer_color_p_gray}`}
          >
            Sort :
          </p>
          <button className={`${styles.flex} ${styles.desktop_sort_button} `}>
            <p className={`${styles.footer_posted_p}`}>Posted Date</p>
            <KeyboardArrowDownIcon fontSize="small" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default DirectoryHeader;

function directoryIcon(directory) {
  if (directory === "Thai help")
    return (
      <Image
        src={thai_help_icon}
        alt="thai help icon"
        className={`${styles.directory_icon}`}
      />
    );
  if (directory === "jobs")
    return (
      <Image
        src={thai_jobs_icon}
        alt="job icon"
        className={`${styles.directory_icon}`}
      />
    );
  if (directory === "housing")
    return (
      <Image
        src={thai_housing_icon}
        alt="housing icon"
        className={`${styles.directory_icon}`}
      />
    );
  if (directory === "deals")
    return (
      <Image
        src={thai_deals_icon}
        alt="deals icon"
        className={`${styles.directory_icon}`}
      />
    );
  if (directory === "marketplace")
    return (
      <Image
        src={thai_marketplace_icon}
        alt="marketplace icon"
        className={`${styles.directory_icon}`}
      />
    );
  if (directory === "businesses")
    return (
      <Image
        src={thai_business_icon}
        alt="business icon"
        className={`${styles.directory_icon}`}
      />
    );
  if (directory === "guides")
    return (
      <Image
        src={thai_guidebook_icon}
        alt="guide icon"
        className={`${styles.directory_icon}`}
      />
    );
  if (directory === "thai-talks")
    return (
      <Image
        src={thai_talks_icon}
        alt="thai talks icon"
        className={`${styles.directory_icon}`}
      />
    );
}
