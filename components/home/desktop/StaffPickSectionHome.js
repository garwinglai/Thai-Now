import React from "react";
import styles from "../../../styles/components/home/desktop/jobs-component-desktop.module.css";
import { IconButton } from "@mui/material";
import LandingPagePagination from "../LandingPagePagination";
import DealsCard from "../cards/DealsCard";
import { dealsOfWeek } from "@/helper/db/staticData";

function StaffPickSectionHome({ allHousingPosts }) {
  return (
    <div className={`${styles.deals_of_week_container}`}>
      <div className={`${styles.deals_of_week_heading}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-light pl-[20px] md:pl-0">Staff Pick Item</h3>
          <LandingPagePagination />
        </div>
      </div>
      <div className={`${styles.deals_card_container} ${styles.flexRow}`}>
        {allHousingPosts.map((deal, idx) => {
          const { id } = deal;
          return <DealsCard key={id} deal={deal} title="Staff pick item" />;
        })}
      </div>
    </div>
  );
}

export default StaffPickSectionHome;
