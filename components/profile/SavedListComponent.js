import React from "react";
import SavedListSection from "@/components/profile/SavedListSection";
import no_saved_list_image from "@/public/static/images/saved_list_none.png";
import Image from "next/image";

function SavedListComponent() {
  const menuList = ["All", "Jobs", "Housing", "Deals", "Marketplace"];
  return (
    <React.Fragment>
      <h3 className="text-center my-4 lg:text-left lg:mb-0">Saved List</h3>
      <div className="flex px-4 pb-4 gap-2 overflow-x-scroll lg:pl-0 lg:mt-6">
        {menuList.map((menu, idx) => (
          <button
            className="text-sm text-[color:var(--deals-primary)] font-light rounded-full py-1 px-3 border "
            key={menu}
          >
            {menu}
          </button>
        ))}
      </div>
      <div className="bg-[color:var(--divider)] h-2 lg:h-[1px]"></div>
      {/* <div className="flex flex-col items-center justify-center gap-4 mt-4 lg:mt-16 lg:mb-8">
        <Image
          src={no_saved_list_image}
          alt="vector image of no saved list"
          className="w-40"
        />
        <h4>No favorites yet</h4>
        <p className="text-center font-extralight text-sm px-4 lg:w-2/5">
          Tap the star on store page to save your favorite deals, jobs,
          marketplace, or living for later.
        </p>
      </div> */}
      <SavedListSection />
    </React.Fragment>
  );
}

export default SavedListComponent;
