import React, { useState, useEffect } from "react";
import JobPostDetail from "@/components/directories/posts/JobPostDetail";
import MarketplacePostDetail from "@/components/directories/posts/MarketplacePostDetail";
import HousingPostDetail from "@/components/directories/posts/HousingPostDetail";
import MainLayout from "@/components/layouts/MainLayout";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import ThaiHelpDetail from "@/components/directories/posts/ThaiHelpDetail";
import { useAuth } from "@/components/auth/AuthProvider";
import { useRouter } from "next/router";
import { db } from "@/firebase/fireConfig";
import { doc, onSnapshot } from "firebase/firestore";

function PostDetail() {
  const { authUser, loading } = useAuth();
  const { uid } = authUser || {};

  const [userData, setUserData] = useState(null);
  const [postData, setPostData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { query } = useRouter();
  const { directory, pid } = query;

  useEffect(() => {
    if (!uid) return;

    setIsLoading(true);

    const unsubPostListener = fetchPosts(uid, directory, pid);
    const unsubUserListener = fetchUsers(uid);

    setIsLoading(false);

    return () => {
      unsubPostListener();
      unsubUserListener();
    };
  }, [uid]);

  const fetchPosts = (uid, directory, pid) => {
    const postCollection =
      directory === "housing"
        ? "housingPosts"
        : directory === "jobs"
        ? "jobPosts"
        : directory === "marketplace"
        ? "marketPosts"
        : directory === "thai-help"
        ? "thaiHelpPosts"
        : null;

    const housingDocRef = doc(db, "users", uid, postCollection, pid);
    const unsubPostListener = onSnapshot(housingDocRef, (doc) => {
      const postData = doc.data();
      setPostData(postData);
      setIsLoading(false);
    });

    return unsubPostListener;
  };

  const fetchUsers = (uid) => {
    const userListener = onSnapshot(doc(db, "users", uid), (doc) => {
      const userData = doc.data();
      setUserData(userData);
    });

    return userListener;
  };

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
      {postData.postTitle ? postData.postTitle : "..."}
    </p>,
  ];

  function displayPostDetail(directory, pid) {
    if (directory === "jobs") return <JobPostDetail />;
    if (directory === "marketplace") return <MarketplacePostDetail />;
    if (directory === "housing")
      return (
        <HousingPostDetail
          postData={postData}
          userData={userData}
          authUser={authUser}
        />
      );
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
