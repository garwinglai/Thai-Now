import React, { useState, useEffect } from "react";
import styles from "../../../styles/components/directory/cards/housing-card.module.css";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import { yellow } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { doc, writeBatch, increment, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { storage, db } from "@/firebase/fireConfig";
import { useAuth } from "@/components/auth/AuthProvider";

function HousingCard({
  isBusinessCenter,
  isBusinessUser,
  directory,
  post,
  isDraft,
}) {
  const { authUser, loading } = useAuth();
  const { uid } = authUser || {};

  // pricePer | 0:day, 1:week, 2:month, 3:year
  const {
    id,
    price,
    pricePer,
    createdAt,
    postTitle,
    postAddressDetails,
    rating,
    reviewNum,
    bathroomNum,
    bedroomNum,
    parkingNum,
    photos,
    guestNum,
  } = post || {};

  const { city } = postAddressDetails || {};

  const pricePerTimeline = pricePer
    ? pricePer === 0
      ? "day"
      : pricePer === 1
      ? "week"
      : pricePer === 2
      ? "month"
      : "year"
    : "night";

  const [defaultImage, setDefaultImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (photos) {
      // loop through photos object to find the first photo
      for (const key in photos) {
        if (photos.hasOwnProperty(key)) {
          const defaultImage = photos[key];
          setDefaultImage(defaultImage);
          break;
        }
      }
    }
  }, [photos]);

  const postCreatedDate = createdAt ? createdAt.toDate() : new Date();
  const today = new Date();
  const postedDaysAgo = Math.floor(
    (today - postCreatedDate) / (1000 * 60 * 60 * 24)
  );

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleDeletePost = async () => {
    setIsLoading(true);
    if (isDraft) {
      const photoKeys = Object.keys(photos);
      const photoKeysLen = photoKeys.length;

      if (photoKeysLen > 0) {
        await removeImagesFromStorage(photos);
      }
      await deleteFirestoreDraftPost();
    } else {
      await deleteFirestorePost();
      await removeImagesFromStorage(photos);
    }
    setIsLoading(false);
  };

  const deleteFirestoreDraftPost = async () => {
    const draftRef = doc(db, "users", uid, "drafts", id);
    await deleteDoc(draftRef);
  };

  const deleteFirestorePost = async () => {
    const housingRef = doc(db, "users", uid, "housingPosts", id);
    const allHousingRef = doc(db, "allHousing", id);
    const userRef = doc(db, "users", uid);

    const batch = writeBatch(db);

    try {
      batch.delete(housingRef);
      batch.delete(allHousingRef);
      batch.update(userRef, {
        numHousing: increment(-1),
      });

      await batch.commit();
    } catch (error) {
      console.log(error);
    }
  };

  const removeImagesFromStorage = async (photos) => {
    const fileNames = [];

    for (const key in photos) {
      if (photos.hasOwnProperty(key)) {
        const fileName = key + ".jpg";
        fileNames.push(fileName);
      }
    }

    for (let i = 0; i < fileNames.length; i++) {
      const fileName = fileNames[i];

      let photoRef;

      if (isDraft) {
        photoRef = ref(storage, `users/${uid}/drafts/${id}/${fileName}`);
      } else {
        photoRef = ref(storage, `users/${uid}/housing/${id}/${fileName}`);
      }
      try {
        await deleteObject(photoRef);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="relative">
      <Link
        href={`/${directory}/${id}`}
        passHref
        className={`${styles.jobs_card_container} ${styles.flex} ${
          isDraft && styles.draft_card_disabled
        }}`}
      >
        {defaultImage ? (
          <div className="w-1/3 h-[33vw] relative md:h-[25vw] md:w-1/4 lg:w-1/3 lg:h-[14vw]">
            <Image
              src={defaultImage}
              alt="post image"
              fill
              className="object-cover rounded-md aspect-square"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="w-1/3 h-[calc(33vw)] rounded bg-gray-200 text-xs font-extralight flex justify-center items-center">
            No image
          </div>
        )}
        <div className={`${styles.card_context_box} ${styles.flexCol}`}>
          <div className={`${styles.context_box_top}`}>
            <div className={`${styles.flex} ${styles.review_box}`}>
              <StarIcon style={{ color: yellow[700] }} fontSize="small" />
              <p>{rating}</p>
              <p className={`${styles.review_count_p}`}>
                ({reviewNum} reviews)
              </p>
            </div>
            <h4>{postTitle}</h4>
            <p className={`${styles.business_location_p}`}>{city}</p>
            <div className={`${styles.amenities_desktop_p} ${styles.flex}`}>
              <span>•</span>
              <p>1 Guest(s), 1 Bed(s), 1 Bath(s), 1 Parking(s)</p>
            </div>
            <div className={`${styles.amenities_desktop_p} ${styles.flex}`}>
              <span>•</span>
              <p>Apartment</p>
            </div>
            <div className={`${styles.housing_deal} ${styles.flex}`}>
              <p className="font-medium">{price}</p>
              <p>/{pricePerTimeline}</p>
            </div>
          </div>
          <div className={`${styles.context_box_bottom}`}>
            <p className={`${styles.days_ago_p}`}>{postedDaysAgo} days ago</p>
          </div>
        </div>
      </Link>
      {isBusinessCenter && (
        <div className="absolute top-4 right-0">
          <IconButton onClick={toggleDrawer("bottom", true)}>
            <MoreVertIcon />
          </IconButton>
          <Drawer
            anchor={"bottom"}
            open={state["bottom"]}
            onClose={toggleDrawer("bottom", false)}
          >
            <div className="flex flex-col p-4 pb-8 rounded-t">
              <div className="flex justify-between items-center text-right border-b border-gray-50 pb-4 mb-4">
                <h4>Post Actions</h4>
                <IconButton onClick={toggleDrawer("bottom", false)}>
                  <CloseIcon className="text-black" />
                </IconButton>
              </div>
              <Link
                href={`${
                  isBusinessUser
                    ? `/business-center/business/edit/housing/${id}`
                    : `/business-center/classic/edit/housing/${id}`
                }`}
                className="font-light text-base text-gray-700 mb-4"
              >
                Edit post
              </Link>
              <button
                onClick={handleDeletePost}
                className="font-light w-fit text-base text-gray-700"
              >
                Delete post
              </button>
            </div>
          </Drawer>
        </div>
      )}
    </div>
  );
}

export default HousingCard;
