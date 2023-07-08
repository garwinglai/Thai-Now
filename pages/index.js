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
import DealsComponentDesktop from "@/components/home/desktop/DealsComponentDesktop";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MainLayout from "@/components/layouts/MainLayout";
import SearchDrawer from "@/components/search/page/SearchDrawer";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import thai_now_logo from "@/public/static/images/logos/thai_now_logo_blck.png";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { deleteLocalStorage, getLocalStorage } from "@/utils/clientStorage";
import AuthProvider, { useAuth } from "@/components/auth/AuthProvider";

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

export default function Home() {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [lastScrollYMobile, setLastScrollYMobile] = useState(0);
  // Search drawer state
  const [state, setState] = useState({
    right: false,
  });
  const [openCompleteSignupModal, setOpenCompleteSignupModal] = useState(false);

  const offersRef = useRef();
  const offersMobileRef = useRef();

  const user = useAuth();
  console.log("user", user);

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

  useEffect(() => {
    console.log();
    // if user exists and getlocalstorage firstLogin is true, set openCompleteSIgnupmodal to true
    const firstLoginLS = getLocalStorage("firstLogin");

    if (user && firstLoginLS) {
      setOpenCompleteSignupModal(true);
      deleteLocalStorage("firstLogin");
    }
  }, [user]);

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
  function offersSectionDesktop(offersRef) {
    return <DealsComponentDesktop offersRef={offersRef} />;
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
          <DealsComponentMobile key={idx} title={title} />
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
        <link rel="icon" href="/images/logos/logo_white.svg" />
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
          <span>
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
        <section className={`${styles.offers_section}`}>
          {offersSectionMobile(offersMobileRef)}
          {offersSectionDesktop(offersRef)}
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
  return <MainLayout route="home">{page}</MainLayout>;
};
