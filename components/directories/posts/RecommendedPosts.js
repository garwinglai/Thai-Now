import React from "react";
import JobsCard from "../cards/JobsCard";
import DealsCard from "@/components/home/cards/DealsCard";
import tripsImage from "@/public/static/images/home/trips-image.svg";
import JobsSectionHomePage from "@/components/home/desktop/JobsSectionHomePage";
import HousingSectionHome from "@/components/home/desktop/HousingSectionHome";
import DealsSectionHome from "@/components/home/desktop/DealsSectionHome";

function RecommendedPosts({ postType, allPostsInCategory }) {
  const deal = {
    reviewScore: "2.93",
    reviewCount: "24",
    description: "hot deal",
    bizName: "Thai Food",
    location: "123 W Adams",
    image: tripsImage,
  };

  function displayDealCard(postType) {
    if (postType === "Jobs") {
      return (
        <div className="w-full">
          <JobsSectionHomePage
            postType={postType}
            isRecommended={true}
            allJobsPosts={allPostsInCategory}
          />
        </div>
      );
    }

    if (postType === "Housing")
      return (
        <div className="w-full">
          <HousingSectionHome
            postType={postType}
            isRecommended={true}
            allHousingPosts={allPostsInCategory}
          />
        </div>
      );

    if (postType === "Marketplace")
      return (
        <div className="w-full">
          <DealsSectionHome
            postType={postType}
            isRecommended={true}
            allMarketPosts={allPostsInCategory}
          />
        </div>
      );
  }

  return (
    <div className="bg-white text-[color:var(--deals-primary)]  pt-8">
      <div className="flex overflow-x-scroll gap-4 pt-4 pb-16 ">
        {displayDealCard(postType)}
      </div>
    </div>
  );
}

export default RecommendedPosts;
