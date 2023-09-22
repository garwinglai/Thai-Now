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
const guideTopics = ["All", "Popular", "Trending"];

function ThaiGuideBook() {
  return (
    <div className="pt-10">
      <div className="md:px-[10%]">
        <DirectoryHeader
          directory="Thai help"
          title="Thai Guide Book"
          slug="guide-book"
        />
      </div>

      <ThaiHelpCategory slug="guide-book" title="Thai Guide Book" />

      <section className={`${styles.guide_book_section}`}>
        <div className="flex justify-between items-center px-4 pb-2 pt-4 md:px-[10%]">
          <h3 className="text-[color:var(--deals-primary)]">Latest</h3>
        </div>
        <GuideBookSection isThaiHelpDirectory={true} />
      </section>
      {/* <section className="bg-[color:var(--pride-bg)] pt-4"> */}
      {/* <div className={`${styles.flexRow} ${styles.trips_header}`}>
          <h3 className="text-[color:var(--deals-primary)]">VDO</h3>
          <LandingPagePagination />
          <div className={`${styles.right_arrow_button}`}>
            <IconButton>
              <ChevronRightIcon />
            </IconButton>
          </div>
        </div>
        <div className="flex w-full overflow-x-scroll px-4 gap-4 md:px-[10%] md:pb-4">
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
        </div> */}
      {/* </section> */}
      <section className="p-4  md:px-[10%]">
        <h3 className="text-[color:var(--deals-primary)] mb-4">
          Thai Guide Book Topics
        </h3>
        <div className="flex gap-x-4 gap-y-2 flex-wrap">
          {guideTopics.map((topic, index) => (
            <button
              key={index}
              className="border rounded-full px-4 py-1 font-extralight text-xs"
            >
              {topic}
            </button>
          ))}
        </div>
        <div className="mt-8 md:grid md:grid-cols-3 md:gap-4">
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
