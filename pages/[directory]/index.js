import React, { useState, useEffect } from "react";
import DirectoryHeader from "@/components/directories/DirectoryHeader";
import MapIcon from "@mui/icons-material/Map";
import HousingCard from "@/components/directories/cards/HousingCard";
import MarketplaceCard from "@/components/directories/cards/MarketplaceCard";
import BusinessCard from "@/components/directories/cards/BusinessCard";
import MainLayout from "@/components/layouts/MainLayout";
import Pagination from "@mui/material/Pagination";
import JobFiltersDesktop from "@/components/directories/filters/jobs/desktop/JobFiltersDesktop";
import HousingFiltersDesktop from "@/components/directories/filters/housing/desktop/HousingFiltersDesktop";
import MarketplaceFiltersDesktop from "@/components/directories/filters/marketplace/desktop/MarketplaceFiltersDesktop";
import JobsCard from "@/components/directories/cards/JobsCard";
import { db } from "@/firebase/fireConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { useAuth } from "@/components/auth/AuthProvider";
import DirectoryMap from "@/components/directories/DirectoryMap";

const tempCount = [1, 2, 3, 4, 5];
const address = "603 W camino real ave arcadia ca 91007";

function Directory({ directory }) {
  const { authUser, loading } = useAuth();
  const { uid } = authUser || {};

  const [isLoading, setIsLoading] = useState(false);
  const [housingPosts, setHousingPosts] = useState([]);
  const [marketPosts, setMarketPosts] = useState([]);
  const [jobPosts, setJobPosts] = useState([]);
  const [housingCoords, setHousingCoords] = useState([]);
  const [allMarketAddress, setAllMarketAddress] = useState([]);
  const [allJobsAddress, setAllJobsAddress] = useState([]);

  const [mensen, setMensen] = useState([]);
  const [userLocation, setUserLocation] = useState();

  useEffect(() => {
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setUserLocation({ latitude, longitude });
      });
    }
  }, []);

  // const fetchApiData = async ({ latitude, longitude }) => {
  //   const res = await fetch(
  //     `https://openmensa.org/api/v2/canteens?near[lat]=${latitude}&near[lng]=${longitude}&near[dist]=50000`
  //   );
  //   const data = await res.json();
  //   setMensen(data);
  // };

  // useEffect(() => {
  //   // Fetch data from API if `location` object is set
  //   if (location) {
  //     fetchApiData(location);
  //   }
  // }, [location]);

  useEffect(() => {
    setIsLoading(true);
    const housingCollectionRef = collection(db, "allHousing");
    const marketCollectionRef = collection(db, "allMarketplace");
    const jobsCollectionRef = collection(db, "allJobs");

    const unsubHousingListener = onSnapshot(
      housingCollectionRef,
      (snapshot) => {
        const housingPostsArr = [];
        const housingCoordsArr = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          const { postCoord } = data;
          data.id = doc.id;

          housingCoordsArr.push(postCoord);
          housingPostsArr.push(data);
        });
        setHousingCoords(housingCoordsArr);
        setHousingPosts(housingPostsArr);
        setIsLoading(false);
      }
    );

    const unsubMarketListener = onSnapshot(marketCollectionRef, (snapshot) => {
      const marketPostsArr = [];
      const marketAddressArr = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        const { postAddress } = data;
        data.id = doc.id;

        marketAddressArr.push(postAddress);
        marketPostsArr.push(data);
      });
      setAllMarketAddress(marketAddressArr);
      setMarketPosts(marketPostsArr);
      setIsLoading(false);
    });

    const unsubJobsListener = onSnapshot(jobsCollectionRef, (snapshot) => {
      const jobsPostsArr = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        jobsPostsArr.push(data);
      });
      setJobPosts(jobsPostsArr);
      setIsLoading(false);
    });

    setIsLoading(false);

    return () => {
      unsubHousingListener();
      unsubMarketListener();
      unsubJobsListener();
    };
  }, [uid]);

  function cardType(directory) {
    if (directory == "jobs") {
      return jobPosts.map((post) => (
        <JobsCard
          key={post.id}
          isBusinessCenter={false}
          directory={directory}
          post={post}
        />
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
      return marketPosts.map((post) => (
        <MarketplaceCard
          key={post.id}
          isBusinessCenter={false}
          directory={directory}
          post={post}
        />
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
        <DirectoryMap
          address={address}
          directory={directory}
          housingCoords={housingCoords}
        />
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
