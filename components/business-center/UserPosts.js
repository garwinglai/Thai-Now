import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IconButton } from "@mui/material";
import DealsCard from "../home/cards/DealsCard";

import OfferCards from "../home/cards2/OfferCards";

function UserPosts({ groupPostTitle }) {
  return (
    <div className="bg-white">
      <div className="flex justify-between items-center p-4">
        <h4 className="text-[color:var(--deals-primary)]">
          {groupPostTitle} posted by business
        </h4>
        <IconButton>
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </div>
      <div className="flex px-4 pb-6 overflow-x-scroll gap-4">
        <OfferCards groupPostTitle={groupPostTitle} />
        <OfferCards groupPostTitle={groupPostTitle} />
        <OfferCards groupPostTitle={groupPostTitle} />
        <OfferCards groupPostTitle={groupPostTitle} />
      </div>
    </div>
  );
}

export default UserPosts;
