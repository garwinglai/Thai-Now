import Head from "next/head";
import styles from "@/styles/Home.module.css";
import gStyles from "../styles/global.module.css";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import bannerImageDesktop from "../public/static/images/home/banner-picture-desktop.svg";
import bannerImageMobile from "../public/static/images/home/banner-picture-mobile.svg";
import SearchBarMobile from "@/components/search/SearchBarMobile";
import NavOptions from "@/components/home/NavOptions";
import LandingPagePagination from "@/components/home/LandingPagePagination";
import { news, trips } from "@/helper/db/staticData";
import { IconButton } from "@mui/material";
import NewsCard from "@/components/home/cards/NewsCard";
import AdsBanner from "@/components/home/AdsBanner";
import GuideBookSection from "@/components/home/GuideBookSection";
import TripsCard from "@/components/home/cards/TripsCard";
import DealsComponentMobile from "@/components/home/mobile/DealsComponentMobile";
import JobsSectionHomePage from "@/components/home/desktop/JobsSectionHomePage";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MainLayout from "@/components/layouts/MainLayout";
import SearchDrawer from "@/components/search/page/SearchDrawer";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import thai_now_logo from "@/public/static/images/logos/thai_now_logo_blck.png";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/fireConfig";
import DealsSectionHome from "@/components/home/desktop/DealsSectionHome";
import StaffPickSectionHome from "@/components/home/desktop/StaffPickSectionHome";
import HouseCard from "@/components/home/cards/HouseCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};

export default function Home({
  allHousingPosts,
  allMarketPosts,
  allJobsPosts,
}) {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [lastScrollYMobile, setLastScrollYMobile] = useState(0);
  // Search drawer state
  const [state, setState] = useState({
    right: false,
  });
  const [openCompleteSignupModal, setOpenCompleteSignupModal] = useState(false);

  const offersRef = useRef();
  const offersMobileRef = useRef();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (offersRef !== "undefined") {
        const offersYPosition = offersRef.current.offsetTop;
        const offersYPositionMobile = offersMobileRef.current.offsetTop;
        localStorage.setItem("offersYPosition", offersYPosition);
        localStorage.setItem("offersYPositionMobile", offersYPositionMobile);
      }
    }
  }, [lastScrollY, lastScrollYMobile]);

  useEffect(() => {
    const detectScroll = () => {
      if (typeof window !== "undefined") {
        window.addEventListener("scroll", controlNavbar);
      } else {
        return () => {
          window.removeEventListener("scroll", controlNavbar);
        };
      }
    };

    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const scrollPosition = window.scrollY;

        setLastScrollY(scrollPosition);
        setLastScrollYMobile(scrollPosition);
      }
    };

    detectScroll();
  }, [lastScrollY, lastScrollYMobile]);

  // useEffect(() => {
  //   // if user exists and getlocalstorage firstLogin is true, set openCompleteSIgnupmodal to true
  //   const firstLoginLS = getLocalStorage("firstLogin");

  //   if (user && firstLoginLS) {
  //     setOpenCompleteSignupModal(true);
  //     deleteLocalStorage("firstLogin");
  //   }
  // }, [user]);

  // * Actions
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleOpenCompleteSignupModal = () => setOpenCompleteSignupModal(true);

  const handleCloseCompleteSignupModal = () =>
    setOpenCompleteSignupModal(false);

  // * Displays
  function jobSectionDesktop() {
    return <JobsSectionHomePage allJobsPosts={allJobsPosts} />;
  }

  function dealsSectionDesktop() {
    return <DealsSectionHome allMarketPosts={allMarketPosts} />;
  }

  function staffPickSectionDesktop() {
    return <StaffPickSectionHome allHousingPosts={allHousingPosts} />;
  }

  function offersSectionMobile(offersMobileRef) {
    const titles = [
      "Deals of the week",
      "Job available",
      "Room for rent",
      "Staff pick item",
    ];
    return (
      <div ref={offersMobileRef}>
        {titles.map((title, idx) => (
          <DealsComponentMobile
            key={idx}
            title={title}
            allHousingPosts={allHousingPosts}
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Thai Now</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" as={`image`} href="/images/logos/logo_white.svg" />
      </Head>
      <main className={styles.main}>
        <Modal
          open={openCompleteSignupModal}
          onClose={handleCloseCompleteSignupModal}
          aria-labelledby="signup-complete-modal"
          aria-describedby="sigup-complete-modal"
        >
          <Box sx={style}>
            <div className="flex flex-col items-center gap-2">
              <div className="absolute top-2 right-2">
                <IconButton onClick={handleCloseCompleteSignupModal}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </div>
              <Image src={thai_now_logo} alt="thai now logo" />
              <h4 className="text-[color:var(--deals-primary)] font-medium">
                Welcome to ThaiNow
              </h4>
              <p className="text-xs font-light">
                Connect with great, Deals, Jobs, Marketplcae, Housing
              </p>
              <div className="w-full mt-4">
                <PrimaryButton
                  name="Close"
                  handleClick={handleCloseCompleteSignupModal}
                />
              </div>
            </div>
          </Box>
        </Modal>
        <section className={`${styles.banner_section}`}>
          <Image
            src={bannerImageMobile}
            alt="banner image"
            className="w-screen md:hidden"
            priority={true}
          />

          <Image
            src={bannerImageDesktop}
            alt="banner image"
            className="hidden md:block md:w-screen"
            priority={true}
          />
          {/* <div className="md:hidden">
						<SearchBarGeo />
					</div> */}
          <span ref={offersRef}>
            <SearchBarMobile handleClick={toggleDrawer("right", true)} />
            <SearchDrawer
              toggleDrawer={toggleDrawer}
              state={state}
              route="home"
            />
          </span>
        </section>
        <section className={`${styles.navigation_options_section}`}>
          <div className={`${styles.navgation_options_container}`}>
            <h3>Feast Like Never Before</h3>
            <p className={`${gStyles.p_small}`}>
              Learn More{" "}
              <br className={`${styles.navigation_subheading_break}`} /> About
              Our Revolutionary Packages
            </p>
            <NavOptions source="home" />
          </div>
        </section>
        <section className={`${styles.ad_section}`}>
          <AdsBanner />
        </section>
        <section className={`${styles.offers_section}`}>
          {offersSectionMobile(offersMobileRef)}
          {jobSectionDesktop()}
        </section>
        <section className={`${styles.news_section}`}>
          <div className={`${styles.flexRow} ${styles.news_header}`}>
            <h3>Room For Rent</h3>
            <LandingPagePagination />
            <div className={`${styles.right_arrow_button}`}>
              <IconButton>
                <ChevronRightIcon fontSize="large" />
              </IconButton>
            </div>
          </div>
          <div className={`${styles.news_card_container} ${styles.flexRow}`}>
            {allHousingPosts.map((deal, idx) => {
              return <HouseCard key={idx} directory="housing" deal={deal} />;
            })}
          </div>
        </section>
        <section className={`${styles.ad_section}`}>
          <AdsBanner />
        </section>
        <section className={`${styles.offers_section}`}>
          {offersSectionMobile(offersMobileRef)}
          {staffPickSectionDesktop()}
        </section>
        <section className={`${styles.offers_section}`}>
          {offersSectionMobile(offersMobileRef)}
          {dealsSectionDesktop()}
        </section>
        <section className={`${styles.ad_section}`}>
          <AdsBanner />
        </section>
        <section className={`${styles.offers_section}`}>
          {offersSectionMobile(offersMobileRef)}
        </section>
        <section className={`${styles.news_section}`}>
          <div className={`${styles.flexRow} ${styles.news_header}`}>
            <h3>Hot News</h3>
            <LandingPagePagination />
            <div className={`${styles.right_arrow_button}`}>
              <IconButton>
                <ChevronRightIcon fontSize="large" />
              </IconButton>
            </div>
          </div>
          <div className={`${styles.news_card_container} ${styles.flexRow}`}>
            {news.map((newsContent, idx) => {
              return <NewsCard key={idx} newsContent={newsContent} />;
            })}
          </div>
        </section>
        <section className={`${styles.ad_section}`}>
          <AdsBanner />
        </section>
        <section className={`${styles.guide_book_section}`}>
          <div className={`${styles.flexRow} ${styles.guide_book_header}`}>
            <h3>Guide Book</h3>
            <LandingPagePagination />
            <div className={`${styles.right_arrow_button}`}>
              <IconButton>
                <ChevronRightIcon fontSize="large" />
              </IconButton>
            </div>
          </div>
          <GuideBookSection />
        </section>
        <section className={`${styles.ad_section}`}>
          <AdsBanner />
        </section>
        <section className={`${styles.trips_section}`}>
          <div className={`${styles.flexRow} ${styles.trips_header}`}>
            <h3>Trips</h3>
            <LandingPagePagination />
            <div className={`${styles.right_arrow_button}`}>
              <IconButton>
                <ChevronRightIcon fontSize="large" />
              </IconButton>
            </div>
          </div>
          <div className={`${styles.trips_container} ${styles.flexRow}`}>
            {trips.map((trip, idx) => {
              return <TripsCard key={idx} trip={trip} />;
            })}
          </div>
        </section>
      </main>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export async function getServerSideProps(ctx) {
  const allHousingRef = collection(db, "allHousing");
  const allMarketRef = collection(db, "allMarketplace");
  const allJobsRef = collection(db, "allJobs");
  let serializedHousingPosts = [];
  let serializedMarketPosts = [];
  let serializedJobsPosts = [];

  const housingSnapshot = await getDocs(allHousingRef).catch((housingError) => {
    return { housingError };
  });

  const allmarketSnaphot = await getDocs(allMarketRef).catch((marketError) => {
    return { marketError };
  });
  const allJobsSnapshot = await getDocs(allJobsRef).catch((jobsError) => {
    return { jobsError };
  });
  const { housingError } = housingSnapshot;
  const { marketError } = allmarketSnaphot;
  const { jobsError } = allJobsSnapshot;

  if (housingError) serializedHousingPosts = null;
  if (marketError) serializedMarketPosts = null;
  if (jobsError) serializedJobsPosts = null;

  const housingPosts = [];
  const marketPosts = [];
  const jobPosts = [];

  housingSnapshot.forEach((doc) => {
    const data = doc.data();
    data.id = doc.id;
    housingPosts.push(data);
  });

  allmarketSnaphot.forEach((doc) => {
    const data = doc.data();
    data.id = doc.id;
    marketPosts.push(data);
  });

  allJobsSnapshot.forEach((doc) => {
    const data = doc.data();
    data.id = doc.id;
    jobPosts.push(data);
  });

  serializedHousingPosts = JSON.parse(JSON.stringify(housingPosts));
  serializedMarketPosts = JSON.parse(JSON.stringify(marketPosts));
  serializedJobsPosts = JSON.parse(JSON.stringify(jobPosts));

  return {
    props: {
      allHousingPosts: serializedHousingPosts,
      allMarketPosts: serializedMarketPosts,
      allJobsPosts: serializedJobsPosts,
    },
  };
}
