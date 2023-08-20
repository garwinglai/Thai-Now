import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import avatar_image from "@/public/static/images/temp_avatar.png";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import styles from "@/styles/components/profile/account-switch-component.module.css";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { useAuth } from "../auth/AuthProvider";
import { db } from "@/firebase/fireConfig";
import { doc, getDoc } from "firebase/firestore";

function AccountSwitchComponent({ isActiveProfile }) {
  const { authUser, loading } = useAuth();
  const { uid, email } = authUser || {};

  const [profileValues, setProfileValues] = useState({
    fName: "",
    lName: "",
    phoneNum: "",
    email: "",
    profPic: "",
    // addressDetails: {
    //   addy1: "",
    //   addy2: "",
    //   city: "",
    //   state: "",
    //   zip: "",
    // },
  });

  const { fName, lName, phoneNum, profPic } = profileValues;

  useEffect(() => {
    if (!uid) return;

    const getUserProfile = async () => {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      console.log("uid", uid);

      if (docSnap.exists()) {
        const data = docSnap.data();
        // destructure data
        const { fName, lName, phoneNum, email, profPic, addressDetails } = data;

        setProfileValues({
          fName: fName || "",
          lName: lName || "",
          phoneNum: phoneNum || "",
          email: email || "",
          profPic: profPic["0-1"] || "",
          // addressDetails,
        });
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };

    getUserProfile();
  }, [uid]);
  return (
    <div className={`${styles.flex} ${styles.account_box}`}>
      <div className={`${styles.account_right_box} ${styles.flex}`}>
        {isActiveProfile ? (
          <div className="flex gap-4 items-center">
            {profPic !== "" ? (
              <div className="relative w-20 aspect-square mx-auto rounded-full">
                <Image
                  className="rounded-full object-cover"
                  src={profPic}
                  alt="profile image"
                  priority={true}
                  fill
                  placeholder="blur"
                  blurDataURL={"/img/logo.png"}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ) : (
              <div className="rounded-full w-16 h-16mx-auto lg:ml-0 flex justify-center items-center text-center bg-[color:var(--filter-bg)]">
                <p className="text-xs font-extralight">No profile image</p>
              </div>
            )}
            <div className={`${styles.text_group}`}>
              <h4>
                {fName} {lName}
              </h4>
              <p>Classic Account</p>
            </div>
          </div>
        ) : (
          <Link
            href="/auth/signin"
            className="flex gap-4 items-center hover:underline"
          >
            <div className="w-16 h-16 bg-[color:var(--switch-bg)] mx-auto flex justify-center items-center rounded-full">
              <AddIcon color="action" sx={{ color: "white" }} />
            </div>
            <div className={`${styles.text_group}`}>
              <h4>Add an existing business account</h4>
            </div>
          </Link>
        )}
      </div>
      {isActiveProfile ? (
        <CheckCircleIcon color="primary" fontSize="large" />
      ) : (
        <span style={{ visibility: "hidden" }}>x</span>
      )}
    </div>
  );
}

export default AccountSwitchComponent;
