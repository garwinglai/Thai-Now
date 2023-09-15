import React from "react";
import styles from "../../../styles/components/home/desktop/jobs-component-desktop.module.css";
import { IconButton } from "@mui/material";
import LandingPagePagination from "../LandingPagePagination";
import DealsCard from "../cards/DealsCard";
import { dealsOfWeek } from "@/helper/db/staticData";
import OfferCards from "../cards2/OfferCards";
import JobsCardHome from "../cards/JobsCardHome";

function JobsSectionHomePage({ allJobsPosts }) {
  return (
    <div className={`${styles.deals_of_week_container}`}>
      <div className={`${styles.deals_of_week_heading}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-light">Jobs Available</h3>
          <LandingPagePagination />
        </div>
      </div>
      <div className={`${styles.deals_card_container} ${styles.flexRow}`}>
        {allJobsPosts.map((deal, idx) => {
          const { id } = deal;
          return <JobsCardHome key={id} deal={deal} directory="jobs" />;
        })}
      </div>
    </div>
  );
}

export default JobsSectionHomePage;
