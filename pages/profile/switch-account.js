import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import styles from "@/styles/pages/profile/switch-account.module.css";
import Link from "next/link";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AccountSwitchComponent from "@/components/profile/AccountSwitchComponent";
import marketing_image from "@/public/static/images/switch_account_image.png";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Image from "next/image";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import { getLocalStorage } from "@/utils/clientStorage";
import { db } from "@/firebase/fireConfig";
import {
  getDocs,
  collection,
  getDoc,
  doc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { useAuth } from "@/components/auth/AuthProvider";
import SwitchingAccountLoader from "@/components/auth/SwitchingAccountLoader";
import CachedIcon from "@mui/icons-material/Cached";

function SwitchAccount() {
  const { authUser, loading } = useAuth();
  const { uid, email } = authUser || {};

  const [activeUser, setActiveUser] = useState(null);
  const [allOfUserAccounts, setAllOfUserAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(true);

  const { back, push } = useRouter();

  const handleBack = () => {
    push("/");
  };

  useEffect(() => {
    if (!uid) return;
    getAllUsersAndHisBusinesses();
  }, [authUser]);

  const getAllUsersAndHisBusinesses = async () => {
    const classicUser = getLocalStorage("classicUser");
    const bizUser = getLocalStorage("bizUser");
    const classicUserParsed = JSON.parse(classicUser);
    const bizUserParsed = bizUser ? JSON.parse(bizUser) : null;
    const allUsers = [];

    if (bizUserParsed) {
      setActiveUser(bizUserParsed);
    } else {
      setActiveUser(classicUserParsed);
    }

    allUsers.push(classicUserParsed);

    const bizUsers = await fetchAllOfUserAccounts();
    allUsers.push(...bizUsers);

    setAllOfUserAccounts(allUsers);
    setIsLoadingPage(false);
  };

  const fetchAllOfUserAccounts = async () => {
    const userBizCollectionRef = collection(db, "users", uid, "biz");
    const userBizSnapshot = await getDocs(userBizCollectionRef);

    const bizUsers = [];

    userBizSnapshot.forEach((doc) => {
      const bizData = doc.data();
      bizData.id = doc.id;

      bizUsers.push(bizData);
    });

    return bizUsers;
  };

  const handleSwitchAccount = (accountType, id) => async () => {
    setIsLoading(true);
    const userRef = doc(db, "users", uid);

    // if switching to classic account
    if (accountType === 0) {
      try {
        await updateDoc(userRef, {
          usingBizId: deleteField(),
        });

        await getAllUsersAndHisBusinesses();
        setIsLoading(false);
        return;
      } catch (error) {
        setIsLoading(false);
        return;
      }
    }

    // if switching to business account
    if (accountType === 1) {
      try {
        await updateDoc(userRef, {
          usingBizId: id,
        });
        await getAllUsersAndHisBusinesses();
        setIsLoading(false);
        return;
      } catch (error) {
        setIsLoading(false);
        return;
      }
    }
  };

  return (
    <div className={`${styles.switch_account_box}`}>
      <SwitchingAccountLoader isLoading={isLoading} />
      <div className={`${styles.header_box}`}>
        <div className="flex items-center gap-1 pl-4 pt-4 lg:gap-2  lg:pl-16">
          <div className="lg:border  lg:rounded-full">
            <IconButton onClick={handleBack}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <button
            onClick={handleBack}
            className="text-[color:var(--deals-primary)]"
          >
            Home
          </button>
        </div>
        <h2>Switch Account</h2>
      </div>
      {isLoadingPage ? (
        <div className="lg:w-6/12 lg:mx-auto text-center">
          <p>Loading accounts...</p>
          <CachedIcon />
        </div>
      ) : (
        <div className="lg:w-6/12 lg:mx-auto">
          <div className={`${styles.flexCol} ${styles.profiles}`}>
            {allOfUserAccounts.map((user) => {
              const { id, usingBizId, fName, lName } = user;
              let name = "";
              let profPic = user.profPic["0-1"];
              let accountTypeDisplay = "Classic Account";
              let accountType = 0; // 0 = classic, 1 = business
              let isActiveAccount = false;

              if (activeUser && activeUser.id === id) {
                isActiveAccount = true;
              }

              if (usingBizId) {
                name = user.fName + " " + user.lName;
              } else {
                if (fName) {
                  name = fName + " " + lName;
                } else {
                  name = user.name;
                  accountTypeDisplay = "Business Account";
                  accountType = 1;
                }
              }

              return (
                <AccountSwitchComponent
                  key={id}
                  isActiveProfile={true}
                  name={name}
                  id={id}
                  profPic={profPic}
                  accountType={accountType}
                  accountTypeDisplay={accountTypeDisplay}
                  isActiveAccount={isActiveAccount}
                  handleSwitchAccount={handleSwitchAccount}
                />
              );
            })}
            <AccountSwitchComponent isActiveProfile={false} />
          </div>
          <div className={`${styles.marketing_box} ${styles.flexCol}`}>
            <div className="lg:px-12 lg:mx-auto">
              <Image
                priority
                src={marketing_image}
                alt="create business image"
                className="w-28 h-28 mx-auto"
              />
              <h3>Create a free business account</h3>
              <div className={`${styles.benefits_group}`}>
                <h5>Unlock tools to help:</h5>
                <div className={`${styles.flex} ${styles.context_group}`}>
                  <CheckCircleIcon sx={{ color: "#ff3d00" }} />
                  <p>Grow your audience</p>
                </div>
                <div className={`${styles.flex} ${styles.context_group}`}>
                  <CheckCircleIcon sx={{ color: "#ff3d00" }} />
                  <p>Sell more product</p>
                </div>
                <div className={`${styles.flex} ${styles.context_group}`}>
                  <CheckCircleIcon sx={{ color: "#ff3d00" }} />
                  <p>Lorem ipsum dolor sit amet.</p>
                </div>
              </div>
            </div>
            <Link
              href="/profile/create-business-account"
              className={`${styles.signup_link}`}
            >
              Create
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default SwitchAccount;

SwitchAccount.getLayout = function getLayout(page) {
  return <MainLayout route="switch-account">{page}</MainLayout>;
};
