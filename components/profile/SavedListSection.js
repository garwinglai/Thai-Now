import React from "react";
import JobsCard from "../directories/cards/JobsCard";
import HousingCard from "../directories/cards/HousingCard";
import DealCard from "../directories/cards/DealCard";

function SavedList() {
  return (
    <div className="p-4 lg:px-0">
      <div>
        <h4 className=" text-[color:var(--deals-primary)] lg:mb-4">Jobs</h4>
        <div className="lg:grid lg:grid-cols-2">
          <JobsCard />
          <JobsCard />
          <JobsCard />
        </div>
      </div>
      <div>
        <h4 className="mt-4 text-[color:var(--deals-primary)] lg:mb-4">Housing</h4>
        <div className="lg:grid lg:grid-cols-2">
          <HousingCard />
          <HousingCard />
          <HousingCard />
        </div>
      </div>
      <div>
        <h4 className="mt-4 text-[color:var(--deals-primary)] lg:mb-4">Deals</h4>
        <div className="lg:grid lg:grid-cols-2">
          <DealCard />
          <DealCard />
          <DealCard />
        </div>
      </div>
    </div>
  );
}

export default SavedList;
