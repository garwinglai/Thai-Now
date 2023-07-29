import React from "react";
import CloseIcon from "@mui/icons-material/Close";

function ThaiHelpFilters({ closeDrawer }) {
  return (
    <div className="relative">
      <div className="border-b">
        <h4 className="text-center p-4">Sort by</h4>
        <div className="absolute right-4 top-4">
          <CloseIcon onClick={closeDrawer("bottom", false)} fontSize="medium" />
        </div>
      </div>
      <div className="flex flex-col items-start p-4 gap-4">
        <button className="font-light">Top</button>
        <button className="font-light">Posted Date</button>
        <button className="font-light">Last reply</button>
      </div>
    </div>
  );
}

export default ThaiHelpFilters;
