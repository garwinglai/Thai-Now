import React from "react";
import { useRouter } from "next/router";
import JobPostDetail from "@/components/directories/posts/JobPostDetail";
import MarketplacePostDetail from "@/components/directories/posts/MarketplacePostDetail";
import HousingPostDetail from "@/components/directories/posts/HousingPostDetail";
import MainLayout from "@/components/layouts/MainLayout";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import ThaiHelpDetail from "@/components/directories/posts/ThaiHelpDetail";

function PostDetail() {
  const { query } = useRouter();
  const { directory, pid } = query;

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      className="hover:underline text-[color:var(--deals-primary)] font-light"
    >
      Home
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href={`/${directory}`}
      className="hover:underline text-[color:var(--deals-primary)] font-light"
    >
      {directory}
    </Link>,
    <p key="3" className="font-light text-opacity-50">
      post title
    </p>,
  ];

  function displayPostDetail(directory, pid) {
    if (directory === "jobs") return <JobPostDetail />;
    if (directory === "marketplace") return <MarketplacePostDetail />;
    if (directory === "housing") return <HousingPostDetail />;
    if (directory === "thai-help") return <ThaiHelpDetail />;
  }

  return (
    <div className="">
      <div className="p-4 lg:w-9/12 lg:mx-auto lg:pl-0 lg:mb-4">
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </div>
      {displayPostDetail(directory, pid)}
    </div>
  );
}

export default PostDetail;

PostDetail.getLayout = function getLayout(page) {
  return <MainLayout route="post-detail">{page}</MainLayout>;
};
