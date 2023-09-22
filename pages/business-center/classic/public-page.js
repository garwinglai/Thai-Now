import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useRouter } from "next/router";
import Image from "next/image";
import business_temp_img from "@/public/static/images/business_temp_img.png";
import PostProfile from "@/components/posts/PostProfile";
import PostContactInfo from "@/components/posts/PostContactInfo";
import PostOfferOptions from "@/components/posts/PostOfferOptions";
import PostDescription from "@/components/posts/PostDescription";
import PostLocation from "@/components/posts/PostLocation";
import BusinessHours from "@/components/business-center/BusinessHours";
import UserPosts from "@/components/business-center/UserPosts";
import BusinessCenterReview from "@/components/business-center/BusinessCenterReview";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import BusinessCenterDesktopBreadcrumbs from "@/components/menus/BusinessCenterDesktopBreadcrumbs";
import { useAuth } from "@/components/auth/AuthProvider";
import { db } from "@/firebase/fireConfig";
import { collection, doc, onSnapshot } from "firebase/firestore";

function ClassicPublicPage() {
  const { authUser, loading } = useAuth();
  const { uid } = authUser || {};
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [housingPosts, setHousingPosts] = useState([]);
  const [marketplacePosts, setMarketplacePosts] = useState([]);

  // create this page similar to BusinessPublicPage
  const { back } = useRouter();

  useEffect(() => {
    if (!uid) return;

    setIsLoading(true);
    const housingCollectionRef = collection(db, "users", uid, "housingPosts");
    const marketplaceColectionRef = collection(db, "users", uid, "marketPosts");

    const unsubHousingListener = onSnapshot(
      housingCollectionRef,
      (snapshot) => {
        const housingPostsArr = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          housingPostsArr.push(data);
        });
        setHousingPosts(housingPostsArr);
        setIsLoading(false);
      }
    );

    const unsubMarketplaceListener = onSnapshot(
      marketplaceColectionRef,
      (snapshot) => {
        const marketplacePostsArr = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          marketplacePostsArr.push(data);
        });
        setMarketplacePosts(marketplacePostsArr);
        setIsLoading(false);
      }
    );

    const unsubUserListener = onSnapshot(doc(db, "users", uid), (snapshot) => {
      const userData = snapshot.data();
      setUserData(userData);
    });

    setIsLoading(false);

    return () => {
      unsubHousingListener();
      unsubMarketplaceListener();
      unsubUserListener();
    };
  }, [uid]);

  const handleBack = () => {
    back();
  };

  return (
    <div className="lg:pt-24 lg:w-3/4 lg:mx-auto ">
      <button
        onClick={handleBack}
        className="flex items-center gap-1 bg-transparent pl-4 py-4 lg:hidden"
      >
        <ChevronLeftIcon />
        <p className="text-[color:var(--deals-primary-med)] text-base">Back</p>
      </button>
      <div className="flex flex-col gap-[1px] bg-[color:var(--border)] lg:bg-white">
        <div className="lg:pb-4">
          <div className="hidden lg:block">
            <BusinessCenterDesktopBreadcrumbs />
          </div>
          <PostProfile isPublicPage={true} userData={userData} />
        </div>
        <div className="lg:flex lg:flex-row-reverse lg:bg-white lg:gap-4">
          <div className="lg:w-1/3 lg:border lg:h-fit lg:rounded-md lg:shadow-sm ">
            <PostContactInfo isBusinessUser={false} userData={userData} />
          </div>
          <div className="lg:w-2/3">
            {housingPosts.length > 0 && (
              <UserPosts
                groupPostTitle="Housing"
                posts={housingPosts}
                isBusinessUser={false}
              />
            )}
            {marketplacePosts.length > 0 && (
              <UserPosts
                groupPostTitle="Marketplace"
                posts={marketplacePosts}
                isBusinessUser={false}
              />
            )}
            <div className="bg-white p-4 lg:px-0">
              <h4 className="text-[color:var(--deals-primary)]">
                Lolar Ramsey&apos;s reviews
              </h4>
              <BusinessCenterReview />
              <BusinessCenterReview />
              <div className="py-4 bg-white mt-4">
                <button className="bg-[color:#E9ECEE] w-full py-2 rounded font-light">
                  Show more reviews...
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassicPublicPage;

ClassicPublicPage.getLayout = function getLayout(page) {
  return <MainLayout route="public-page">{page}</MainLayout>;
};
