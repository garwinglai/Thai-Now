import React, { useState, useEffect } from "react";
import DirectoryHeader from "@/components/directories/DirectoryHeader";
import Fab from "@mui/material/Fab";
import MapIcon from "@mui/icons-material/Map";
import HousingCard from "@/components/directories/cards/HousingCard";
import MarketplaceCard from "@/components/directories/cards/MarketplaceCard";
import BusinessCard from "@/components/directories/cards/BusinessCard";
import MainLayout from "@/components/layouts/MainLayout";
import ThaiHelpCategory from "@/components/directories/thai-help/ThaiHelpCategory";
import SearchResultCard from "@/components/directories/thai-help/SearchResultCard";
import Pagination from "@mui/material/Pagination";
import JobFiltersDesktop from "@/components/directories/filters/jobs/desktop/JobFiltersDesktop";
import HousingFiltersDesktop from "@/components/directories/filters/housing/desktop/HousingFiltersDesktop";
import MarketplaceFiltersDesktop from "@/components/directories/filters/marketplace/desktop/MarketplaceFiltersDesktop";
import JobsCard from "@/components/directories/cards/JobsCard";
import { db } from "@/firebase/fireConfig";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useAuth } from "@/components/auth/AuthProvider";
import Map from "@/components/directories/Map";

const tempCount = [1, 2, 3, 4, 5];
const address = "1600 Amphitheatre Parkway, Mountain View, CA";

function Directory({ directory }) {
  const { authUser, loading } = useAuth();
  const { uid } = authUser || {};

  const [isLoading, setIsLoading] = useState(false);
  const [housingPosts, setHousingPosts] = useState([]);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (!uid) return;

    setIsLoading(true);
    const housingCollectionRef = collection(db, "users", uid, "housingPosts");
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

    const unsubUserListener = onSnapshot(doc(db, "users", uid), (snapshot) => {
      const userData = snapshot.data();
      setUserData(userData);
    });

    setIsLoading(false);

    return () => {
      unsubHousingListener();
      unsubUserListener();
    };
  }, [uid]);

  function cardType(directory) {
    if (directory == "jobs") {
      return tempCount.map((item) => (
        <JobsCard key={item} directory={directory} />
      ));
    }

    if (directory == "housing") {
      return housingPosts.map((post) => (
        <HousingCard
          key={post.id}
          isBusinessCenter={false}
          directory={directory}
          post={post}
        />
      ));
    }

    // if (directory == "deals") {
    // 	return tempCount.map((item) => (
    // 		<DealCard key={item} directory={directory} />
    // 	));
    // }

    if (directory == "marketplace") {
      return tempCount.map((item) => (
        <MarketplaceCard key={item} directory={directory} />
      ));
    }

    if (directory == "businesses") {
      return tempCount.map((item) => (
        <BusinessCard key={item} directory={directory} />
      ));
    }
  }

  function displayFilter(directory) {
    if (directory == "jobs") return <JobFiltersDesktop />;

    if (directory == "housing") return <HousingFiltersDesktop />;

    if (directory == "marketplace") return <MarketplaceFiltersDesktop />;
  }

  return (
    <div className="flex">
      <div className="hidden lg:block lg:overflow-y-scroll">
        {displayFilter(directory)}
      </div>
      <div className="flex-grow">
        <DirectoryHeader directory={directory} />
        <div className=" min-h-[0.5rem] bg-[color:var(--divider)] lg:hidden"></div>
        <div className="px-4">{cardType(directory)}</div>
        <div className="fixed bottom-5 z-50 left-[50%] -translate-x-[50%] lg:hidden">
          <button className="flex items-center shadow-md rounded-full bg-[color:var(--map-btn)] text-white px-4 py-2">
            <MapIcon sx={{ mr: 1 }} />
            <p className="text-white font-extralight">View on Map</p>
          </button>
        </div>
        <div className="flex justify-center pt-8 pb-16">
          <Pagination count={10} color="primary" />
        </div>
      </div>
      <div className="hidden lg:block lg:w-2/5">
        <Map address={address} />
      </div>
    </div>
  );
}

export default Directory;

export async function getStaticPaths() {
  const paths = [
    // { params: { directory: "thai-help" } },
    { params: { directory: "jobs" } },
    { params: { directory: "housing" } },
    // { params: { directory: "deals" } },
    { params: { directory: "marketplace" } },
    // { params: { directory: "businesses" } },
    // { params: { directory: "guides" } },
    // { params: { directory: "thai-talks" } },
  ];

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps(context) {
  const { directory } = context.params;
  return {
    props: { directory }, // will be passed to the page component as props
    revalidate: 10,
  };
}

Directory.getLayout = function getLayout(page) {
  return <MainLayout route="directory">{page}</MainLayout>;
};
