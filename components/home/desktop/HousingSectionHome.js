import React from "react";
import styles from "../../../styles/components/home/desktop/jobs-component-desktop.module.css";
import LandingPagePagination from "../LandingPagePagination";
import HouseCard from "../cards/HouseCard";

function HousingSectionHome({ isRecommended, postType, allHousingPosts }) {
  return (
    <div className={`${styles.deals_of_week_container}`}>
      <div className={`${styles.deals_of_week_heading}`}>
        <div className="flex justify-between items-center mb-4">
          {isRecommended ? (
            <h4 className="">More {postType} posted by ThaiNow</h4>
          ) : (
            <h3 className="font-light">Jobs Available</h3>
          )}
          <LandingPagePagination />
        </div>
      </div>
      <div className={`${styles.deals_card_container} ${styles.flexRow}`}>
        {allHousingPosts.map((deal, idx) => {
          const { id } = deal;
          return <HouseCard key={id} deal={deal} directory="housing" />;
        })}
      </div>
    </div>
  );
}

export default HousingSectionHome;
