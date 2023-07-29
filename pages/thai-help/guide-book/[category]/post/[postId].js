import ThaiHelpDetail from "@/components/directories/posts/ThaiHelpDetail";
import MainLayout from "@/components/layouts/MainLayout";
import { useRouter } from "next/router";
import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import LandingPagePagination from "@/components/home/LandingPagePagination";
import GuidesCard from "@/components/home/cards/GuidesCard";
import { IconButton } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function ThaiHelpPost() {
  const { query } = useRouter();
  const { directory, category, slug, postId } = query;

  const breadCrumb =
    category && category.charAt(0).toUpperCase() + category.slice(1);
  const breadcrumbTitle = breadCrumb && breadCrumb.replace(/-/g, " ");

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      className="hover:underlin text-[color:var(--deals-primary)] font-base text-sm"
    >
      Home
    </Link>,
    <Link
      href="/thai-help"
      key="2"
      className="hover:underline text-[color:var(--deals-primary)] font-base text-sm"
    >
      Thai Help
    </Link>,
    <Link
      href="/thai-help/guide-book"
      key="2"
      className="hover:underline text-[color:var(--deals-primary)] font-base text-sm"
    >
      Thai Guide Book
    </Link>,
    <Link
      href={`/thai-help/guide-book/${category}`}
      key="2"
      className="hover:underline text-[color:var(--deals-primary)] font-base text-sm"
    >
      {breadcrumbTitle}
    </Link>,
    <p
      key="2"
      className="text-sm mt-1 text-[color:var(--text-body-color)] break-normal"
    >
      post title
    </p>,
  ];

  return (
    <div className="pt-16">
      <div className="p-4 lg:w-9/12 lg:mx-auto lg:pl-0 lg:mb-4">
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </div>
      <div className="bg-[color:var(--divider)] h-2"></div>
      <div className="mt-4">
        <ThaiHelpDetail
          slug="guide-book"
          postTitle="post title"
          category={category}
          breadcrumbTitle={breadcrumbTitle}
        />
      </div>
      <section className="bg-[color:var(--pride-bg)] pt-4">
        <div className={`${styles.flexRow} ${styles.trips_header}`}>
          <h3 className="text-[color:var(--deals-primary)]">
            You may also like
          </h3>
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
      </section>
    </div>
  );
}

export default ThaiHelpPost;

ThaiHelpPost.getLayout = function getLayout(page) {
  return <MainLayout route="directory">{page}</MainLayout>;
};
