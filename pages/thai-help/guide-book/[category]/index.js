import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import DirectoryHeader from "@/components/directories/DirectoryHeader";
import { useRouter } from "next/router";
import GuidesCard from "@/components/home/cards/GuidesCard";
import Pagination from "@mui/material/Pagination";
import ThaiHelpCategory from "@/components/directories/thai-help/ThaiHelpCategory";

function ThaiGuideCategories() {
  const { query } = useRouter();
  const { category } = query;

  // create a title with first letter uppercase and change camel case

  const breadCrumb =
    category && category.charAt(0).toUpperCase() + category.slice(1);
  const breadcrumbTitle = breadCrumb && breadCrumb.replace(/-/g, " ");

  return (
    <div className="pt-10">
      <div className="md:px-[10%]">
        <DirectoryHeader
          directory="Thai help"
          slug="guide-book"
          title="Thai Guide Book"
          category={category}
          breadcrumbTitle={breadcrumbTitle}
        />
      </div>
      <ThaiHelpCategory slug="guide-book" title="Thai Guide Book" />
      <div className="bg-[color:var(--divider)] h-2 md:hidden"></div>
      <div className="p-4 md:px-[10%]">
        <div>
          <div className="pb-4">
            <h3>{breadcrumbTitle}</h3>
            <p>12 posts in {breadcrumbTitle}</p>
          </div>
          <div className="md:grid md:grid-cols-4 md:gap-4">
            <GuidesCard
              isThaiHelpDirectory={true}
              directory="thai-help"
              slug="guide-book"
              category={category}
              postType="post"
              pid="1"
              postTitle={breadcrumbTitle}
            />
            <GuidesCard
              isThaiHelpDirectory={true}
              directory="thai-help"
              slug="guide-book"
              category={category}
              postType="post"
              pid="1"
              postTitle={breadcrumbTitle}
            />
            <GuidesCard
              isThaiHelpDirectory={true}
              directory="thai-help"
              slug="guide-book"
              category={category}
              postType="post"
              pid="1"
              postTitle={breadcrumbTitle}
            />
            <GuidesCard
              isThaiHelpDirectory={true}
              directory="thai-help"
              slug="guide-book"
              category={category}
              postType="post"
              pid="1"
              postTitle={breadcrumbTitle}
            />
            <GuidesCard
              isThaiHelpDirectory={true}
              directory="thai-help"
              slug="guide-book"
              category={category}
              postType="post"
              pid="1"
              postTitle={breadcrumbTitle}
            />
          </div>
        </div>
        {/* <div>
          <div className="pb-4">
            <h3>VDO</h3>
            <p>20 posts in {category}</p>
          </div>
          <div className="md:grid md:grid-cols-4 md:gap-4">
            <GuidesCard
              isThaiHelpDirectory={true}
              directory="thai-help"
              slug="guide-book"
              category={category}
              postType="video"
              pid="1"
              postTitle={breadcrumbTitle}
            />
            <GuidesCard
              isThaiHelpDirectory={true}
              directory="thai-help"
              slug="guide-book"
              category={category}
              postType="video"
              pid="1"
              postTitle={breadcrumbTitle}
            />
            <GuidesCard
              isThaiHelpDirectory={true}
              directory="thai-help"
              slug="guide-book"
              category={category}
              postType="video"
              pid="1"
              postTitle={breadcrumbTitle}
            />
          </div>
        </div> */}
      </div>
      <div className="flex justify-center mt-4 mb-16">
        <Pagination count={10} />
      </div>
    </div>
  );
}

export default ThaiGuideCategories;

ThaiGuideCategories.getLayout = function getLayout(page) {
  return <MainLayout route="directory">{page}</MainLayout>;
};
