import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IconButton } from "@mui/material";
import DealsCard from "../home/cards/DealsCard";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import OfferCards from "../home/cards2/OfferCards";

function UserPosts({ groupPostTitle, housingPosts }) {
  return (
    <div className="bg-white">
      <div className="flex justify-between items-center p-4 lg:pt-0 lg:px-0">
        <h4 className="text-[color:var(--deals-primary)]">
          {groupPostTitle} posted by business
        </h4>
        <div className="hidden lg:flex gap-4">
          <div className="shadow-md rounded-full">
            <IconButton>
              <ChevronLeftIcon
                sx={{ color: "var(--secondary)" }}
                fontSize="small"
              />
            </IconButton>
          </div>
          <div className="shadow-md rounded-full">
            <IconButton>
              <ChevronRightIcon
                sx={{ color: "var(--secondary)" }}
                fontSize="small"
              />
            </IconButton>
          </div>
        </div>
        <div className="lg:hidden">
          <IconButton>
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
      <div className="flex px-4 pb-6 overflow-x-scroll gap-4 lg:px-0">
        {housingPosts.map((post) => (
          <OfferCards
            key={post.id}
            groupPostTitle={groupPostTitle}
            housingPost={post}
          />
        ))}
      </div>
    </div>
  );
}

export default UserPosts;
