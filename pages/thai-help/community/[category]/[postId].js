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
import PrimaryButton from "@/components/buttons/PrimaryButton";
import Comments from "@/components/directories/thai-help/Comments";

function CommunityPost() {
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
      href="/thai-help/community"
      key="2"
      className="hover:underline text-[color:var(--deals-primary)] font-base text-sm"
    >
      Community
    </Link>,
    <Link
      href={`/thai-help/community/${category}`}
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
      <div className="p-4 md:px-[10%] md:pt-8">
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </div>
      <div className="bg-[color:var(--divider)] h-2 md:hidden"></div>
      <div className="mt-4 md:px-[10%]">
        <ThaiHelpDetail
          slug="community"
          postTitle="post title"
          category={category}
          breadcrumbTitle={breadcrumbTitle}
        />
      </div>
      <div className="p-4 md:px-[10%]">
        <h5 className="my-4">Enter Your Reply</h5>
        <textarea
          name="reply"
          id="reply"
          rows="10"
          className="w-full rounded border-none bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)]"
        />
        <div className="flex gap-4 items-center my-4">
          <input
            type="checkbox"
            name="anonymous"
            id="anonymous"
            className="w-4 h-4 rounded focus:ring-0"
          />
          <label htmlFor="anonymous" className="font-extralight text-sm">
            Post as anonymouse
          </label>
        </div>
        <PrimaryButton name="Reply" />
      </div>
      <div className="px-4 py-8 md:px-[10%]">
        <h4>6 Replies</h4>
        <Comments />
        <Comments />
        <Comments />
      </div>
    </div>
  );
}

export default CommunityPost;

CommunityPost.getLayout = function getLayout(page) {
  return <MainLayout route="directory">{page}</MainLayout>;
};
