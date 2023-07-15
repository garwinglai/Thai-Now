import React from "react";
import styles from "../../../styles/components/home/desktop/deals-component-desktop.module.css";
import { IconButton } from "@mui/material";
import LandingPagePagination from "../LandingPagePagination";
import DealsCard from "../cards/DealsCard";
import { dealsOfWeek } from "@/helper/db/staticData";

function DealsComponentDesktop() {
  return (
    <div className={`${styles.deals_of_week_container}`}>
      <div className={`${styles.deals_of_week_heading}`}>
        <h3>New this week</h3>
        <div
          className={`${styles.deals_of_week_links_container} ${styles.flexRow}`}
        >
          <div className={`${styles.deal_of_weeks_links}`}>
            <IconButton>Deals</IconButton>
            <IconButton>Jobs</IconButton>
            <IconButton>Housing</IconButton>
            <IconButton>Marketplace</IconButton>
          </div>
          <LandingPagePagination />
        </div>
      </div>
      <div className={`${styles.deals_card_container} ${styles.flexRow}`}>
        {dealsOfWeek.map((deal, idx) => {
          return <DealsCard key={idx} deal={deal} />;
        })}
      </div>
    </div>
  );
}

export default DealsComponentDesktop;
