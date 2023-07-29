import DirectoryHeader from "@/components/directories/DirectoryHeader";
import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import ThaiHelpCategory from "@/components/directories/thai-help/ThaiHelpCategory";
import styles from "@/styles/Home.module.css";
import GuideBookSection from "@/components/home/GuideBookSection";
import LandingPagePagination from "@/components/home/LandingPagePagination";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { IconButton } from "@mui/material";
import Link from "next/link";
import Pagination from "@mui/material/Pagination";
import GuidesCard from "@/components/home/cards/GuidesCard";
import { useRouter } from "next/router";

// Create an array of guide Topics, capitalize the first letter of each word: all, basic living, moving to US, living permanently, travel, learning, transfer, health, kids, thai pride, business and investment
const guideTopics = [
  "All",
  "Basic living",
  "Moving to US",
  "Living permanently",
  "Travel",
  "Learning",
  "Transfer",
  "Health",
  "Kids",
  "Thai pride",
  "Business and investment",
];

function ThaiGuideBook() {
  return (
    <div className="pt-10">
      <DirectoryHeader
        directory="Thai help"
        title="Thai Guide Book"
        slug="guide-book"
      />
      <ThaiHelpCategory slug="guide-book" title="Thai Guide Book" />
      <section className={`${styles.guide_book_section}`}>
        <div className="flex justify-between items-center px-4 pb-2 pt-4">
          <h3 className="text-[color:var(--deals-primary)]">Thai Guide Book</h3>
          <LandingPagePagination />
        </div>
        <GuideBookSection isThaiHelpDirectory={true} />
      </section>
      <section className="bg-[color:var(--pride-bg)] pt-4">
        <div className={`${styles.flexRow} ${styles.trips_header}`}>
          <h3 className="text-[color:var(--deals-primary)]">VDO</h3>
          <LandingPagePagination />
          <div className={`${styles.right_arrow_button}`}>
            <IconButton>
              <ChevronRightIcon />
            </IconButton>
          </div>
        </div>
        <div className={`${styles.trips_container} ${styles.flexRow}`}>
          <GuidesCard
            isThaiHelpDirectory={true}
            postTitle="Basic living"
            postType="video"
            directory="thai-help"
            slug="guide-book"
            pid="1"
            category="basic-living"
          />
          <GuidesCard
            isThaiHelpDirectory={true}
            postTitle="Basic living"
            postType="video"
            directory="thai-help"
            slug="guide-book"
            pid="1"
            category="basic-living"
          />
          <GuidesCard
            isThaiHelpDirectory={true}
            postTitle="Basic living"
            postType="video"
            directory="thai-help"
            slug="guide-book"
            pid="1"
            category="basic-living"
          />
          <GuidesCard
            isThaiHelpDirectory={true}
            postTitle="Basic living"
            postType="video"
            directory="thai-help"
            slug="guide-book"
            pid="1"
            category="basic-living"
          />
        </div>
      </section>
      <section className="p-4">
        <h3 className="text-[color:var(--deals-primary)] mb-4">
          Thai Guide Book Topics
        </h3>
        <div className="flex gap-x-4 gap-y-2 flex-wrap">
          {guideTopics.map((topic, index) => (
            <button
              key={index}
              className="border rounded-full px-4 py-1 font-light text-sm"
            >
              {topic}
            </button>
          ))}
        </div>
        <div className="mt-8">
          <GuidesCard
            isThaiHelpDirectory={true}
            postTitle="Basic living"
            postType="post"
            directory="thai-help"
            slug="guide-book"
            pid="1"
            category="basic-living"
          />
          <GuidesCard
            isThaiHelpDirectory={true}
            postTitle="Basic living"
            postType="post"
            directory="thai-help"
            slug="guide-book"
            pid="1"
            category="basic-living"
          />
        </div>
        <div className="flex justify-center mt-4 mb-16">
          <Pagination count={10} />
        </div>
      </section>
    </div>
  );
}

export default ThaiGuideBook;

ThaiGuideBook.getLayout = function getLayout(page) {
  return <MainLayout route="directory">{page}</MainLayout>;
};
