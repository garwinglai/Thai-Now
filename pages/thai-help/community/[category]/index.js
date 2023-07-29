import DirectoryHeader from "@/components/directories/DirectoryHeader";
import MainLayout from "@/components/layouts/MainLayout";
import React from "react";
import { useRouter } from "next/router";
import CategorySearchResultHeader from "@/components/directories/thai-help/CategorySearchResultHeader";
import SearchResultCard from "@/components/directories/thai-help/SearchResultCard";
import Pagination from "@mui/material/Pagination";

function CommunityCategory() {
  const { query } = useRouter();
  const { category } = query;

  const breadCrumb =
    category && category.charAt(0).toUpperCase() + category.slice(1);
  const breadcrumbTitle = breadCrumb && breadCrumb.replace(/-/g, " ");

  return (
    <div className="pt-16">
      <div className="md:px-[10%]">
        <DirectoryHeader
          directory="Thai help"
          title="Community"
          slug="community"
          breadcrumbTitle={breadcrumbTitle}
        />
      </div>
      <div className="px-4 -mt-4 md:px-[10%] md:mt-4">
        <CategorySearchResultHeader title={breadcrumbTitle} />
        <SearchResultCard
          directory="thai-help"
          postType="housing"
          slug="community"
          breadcrumbTitle={breadcrumbTitle}
          category={category}
          postId="1"
        />
        <SearchResultCard
          directory="thai-help"
          postType="living"
          slug="community"
          breadcrumbTitle={breadcrumbTitle}
          category={category}
          postId="1"
        />
        <SearchResultCard
          directory="thai-help"
          postType="health"
          slug="community"
          breadcrumbTitle={breadcrumbTitle}
          category={category}
          postId="1"
        />
        <div className="flex justify-center pt-8 pb-16 w-full">
          <Pagination count={10} color="primary" />
        </div>
      </div>
    </div>
  );
}

export default CommunityCategory;

CommunityCategory.getLayout = function getLayout(page) {
  return <MainLayout route="directory">{page}</MainLayout>;
};
