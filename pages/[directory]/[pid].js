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
import { getLocalStorage } from "@/utils/clientStorage";

// TODO: get post from fetch post

function PostDetail() {
  const { authUser, loading } = useAuth();
  const { uid } = authUser || {};

  const [userData, setUserData] = useState(null);
  const [postData, setPostData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isBusinessUser, setIsBusinessUser] = useState(false);

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
  }, [uid, pid]);

  const fetchPosts = (uid, directory, pid) => {
    const postCollection =
      directory === "housing"
        ? "allHousing"
        : directory === "jobs"
        ? "allJobs"
        : directory === "marketplace"
        ? "allMarketplace"
        : directory === "thai-help"
        ? "thaiHelpPosts"
        : null;

    const allPostRef = doc(db, postCollection, pid);

    // const housingDocRef = doc(db, "users", uid, postCollection, pid);
    const unsubPostListener = onSnapshot(allPostRef, (doc) => {
      const postData = doc.data();
      console.log("postDat", postData);
      setPostData(postData);
      setIsLoading(false);
    });

    return unsubPostListener;
  };

  const fetchUsers = (uid) => {
    const bizUser = JSON.parse(getLocalStorage("bizUser"));
    let userRef = doc(db, "users", uid);

    if (bizUser) {
      const { id: bizId } = bizUser;
      userRef = doc(db, "users", uid, "biz", bizId);
      setIsBusinessUser(true);
    } else {
      setIsBusinessUser(false);
    }
    const userListener = onSnapshot(userRef, (doc) => {
      const userData = doc.data();
      setUserData(userData);
    });

    return userListener;
  };
  console.log("userData", userData);

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
    if (directory === "marketplace")
      return (
        <MarketplacePostDetail
          postData={postData}
          pid={pid}
          userData={userData}
          authUser={authUser}
          isBusinessUser={isBusinessUser}
        />
      );
    if (directory === "housing")
      return (
        <HousingPostDetail
          pid={pid}
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
