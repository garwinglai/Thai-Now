import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import Image from "next/image";
import bannerImageDesktop from "@/public/static/images/home/banner-picture-desktop.svg";
import bannerImageMobile from "@/public/static/images/home/banner-picture-mobile.svg";
import styles from "@/styles/Home.module.css";
import LandingPagePagination from "@/components/home/LandingPagePagination";
import GuideBookSection from "@/components/home/GuideBookSection";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { IconButton } from "@mui/material";
import GuidesCard from "@/components/home/cards/GuidesCard";
import SearchResultCard from "@/components/directories/thai-help/SearchResultCard";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import Link from "next/link";
import { useRouter } from "next/router";

function ThaiHelp() {
  const { push } = useRouter();

  const handleCreateConversationClick = () => {
    push("/thai-help/community/create");
  };

  return (
    <div>
      <section className="relative">
        <Image
          src={bannerImageMobile}
          alt="banner image"
          className="w-screen block md:hidden"
          priority={true}
        />

        <Image
          src={bannerImageDesktop}
          alt="banner image"
          className="hidden md:block md:w-screen"
          priority={true}
        />
        <div className="absolute top-[50%] text-center w-full">
          <h2 className="text-white font-medium">CONNECTING THAI OVERSEAS</h2>
          <h4 className="text-white">Lorem, ipsum.</h4>
        </div>
      </section>
      <section className={`${styles.guide_book_section}`}>
        <div className="flex justify-between items-center px-4 pb-2 pt-4">
          <h3 className="text-[color:var(--deals-primary)]">Thai Guide Book</h3>
          <LandingPagePagination />
          <div className={`${styles.right_arrow_button}`}>
            <Link href="/thai-help/guide-book">
              <ChevronRightIcon />
            </Link>
          </div>
        </div>
        <GuideBookSection isThaiHelpDirectory={true} />
      </section>
      <section className={`${styles.trips_section}`}>
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
        <Link
          href="/thai-help/community"
          className="text-[color:var(--deals-primary)] mb-4 text-xl"
        >
          Thai Help Community
        </Link>
        <p className="font-light my-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
          corrupti.
        </p>
        <div className="mt-4 h-12">
          <PrimaryButton
            handleClick={handleCreateConversationClick}
            name="New Conversation"
          />
        </div>
        <div className="mt-4">
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
        <button className="bg-[color:var(--load-more-btn)] rounded w-full py-2 mt-4 mb-8">
          See more ...
        </button>
      </section>
    </div>
  );
}

export default ThaiHelp;

ThaiHelp.getLayout = function getLayout(page) {
  return <MainLayout route="directory">{page}</MainLayout>;
};
