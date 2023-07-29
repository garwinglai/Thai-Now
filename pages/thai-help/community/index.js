import DirectoryHeader from "@/components/directories/DirectoryHeader";
import ThaiHelpCategory from "@/components/directories/thai-help/ThaiHelpCategory";
import MainLayout from "@/components/layouts/MainLayout";
import React from "react";
import Pagination from "@mui/material/Pagination";
import SearchResultCard from "@/components/directories/thai-help/SearchResultCard";

function ThaiCommunity() {
  return (
    <div className="flex pt-14">
      <div className="flex-grow lg:mt-4">
        <DirectoryHeader
          directory="Thai help"
          title="Community"
          slug="community"
        />
        <div className=" min-h-[0.5rem] bg-[color:var(--divider)] lg:hidden"></div>

        <ThaiHelpCategory slug="community" />
        <div className="px-4">
          <SearchResultCard
            directory="thai-help"
            postType="housing"
            slug="community"
            breadcrumbTitle="Basic living"
            category="basic-living"
            postId="1"
          />
          <SearchResultCard
            directory="thai-help"
            postType="living"
            slug="community"
            breadcrumbTitle="Living permanently"
            category="living-permanently"
            postId="1"
          />
          <SearchResultCard
            directory="thai-help"
            postType="health"
            slug="community"
            breadcrumbTitle="Health"
            category="health"
            postId="1"
          />
        </div>
        <div className="flex justify-center pt-8 pb-16">
          <Pagination count={10} color="primary" />
        </div>
      </div>
    </div>
  );
}

export default ThaiCommunity;

ThaiCommunity.getLayout = function getLayout(page) {
  return <MainLayout route="directory">{page}</MainLayout>;
};
