import React from "react";
import styles from "../../../styles/components/home/desktop/jobs-component-desktop.module.css";
import { IconButton } from "@mui/material";
import LandingPagePagination from "../LandingPagePagination";
import DealsCard from "../cards/DealsCard";
import { dealsOfWeek } from "@/helper/db/staticData";
import MarketCard from "../cards/MarketCard";

function DealsSectionHome({ isRecommended, postType, allMarketPosts }) {
  return (
    <div className={`${styles.deals_of_week_container}`}>
      <div className={`${styles.deals_of_week_heading}`}>
        <div className="flex justify-between items-center mb-4">
          {isRecommended ? (
            <h4 className="">More {postType} posted by ThaiNow</h4>
          ) : (
            <h3 className="font-light pl-[20px] md:pl-0">Deal of the week</h3>
          )}
          <LandingPagePagination />
        </div>
      </div>
      <div className={`${styles.deals_card_container} ${styles.flexRow}`}>
        {allMarketPosts.map((deal, idx) => {
          const { id } = deal;
          return <MarketCard key={id} deal={deal} directory="marketplace" />;
        })}
      </div>
    </div>
  );
}

export default DealsSectionHome;
