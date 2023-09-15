import React, { useState, useEffect } from "react";
import styles from "../../../styles/components/directory/cards/marketplace-card.module.css";
import massageImage from "../../../public/static/images/directory/massage_large.png";
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

function MarketplaceCard({
  isBusinessCenter,
  isBusinessUser,
  directory,
  post,
  userData,
  isDraft,
}) {
  const { authUser, loading } = useAuth();
  const { uid } = authUser || {};
  const { bizId } = userData || {};

  const {
    id,
    price,
    pricePer,
    createdAt,
    postTitle,
    postAddressDetails,
    rating,
    reviewNum,
    productTypeDisplay,
    photos,
  } = post || {};

  const { city } = postAddressDetails || {};

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
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
    const photoKeys = Object.keys(photos);
    const photoKeysLen = photoKeys.length;
    if (isDraft) {
      if (isBusinessUser) {
        if (photoKeysLen > 0) {
          await removeImagesFromStorage(photos);
        }
        await deleteBizFirestoreDraftPost();
      } else {
        if (photoKeysLen > 0) {
          await removeImagesFromStorage(photos);
        }
        await deleteFirestoreDraftPost();
      }
    } else {
      if (isBusinessUser) {
        await deleteFireStoreBizPost();
        await removeImagesFromStorage(photos);
      } else {
        await deleteFirestorePost();
        await removeImagesFromStorage(photos);
      }
    }
    setIsLoading(false);
  };

  const deleteFirestoreDraftPost = async () => {
    const draftRef = doc(db, "users", uid, "drafts", id);
    await deleteDoc(draftRef);
  };

  const deleteBizFirestoreDraftPost = async () => {
    const draftRef = doc(db, "users", uid, "biz", bizId, "drafts", id);
    await deleteDoc(draftRef);
  };

  const deleteFireStoreBizPost = async () => {
    const marketRef = doc(db, "users", uid, "biz", bizId, "marketPosts", id);
    const allMarketRef = doc(db, "allMarketplace", id);
    const bizRef = doc(db, "users", uid, "biz", bizId);

    const batch = writeBatch(db);

    try {
      batch.delete(marketRef);
      batch.delete(allMarketRef);
      batch.update(bizRef, {
        numMarket: increment(-1),
      });

      await batch.commit();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFirestorePost = async () => {
    const marketRef = doc(db, "users", uid, "marketPosts", id);
    const allMarketRef = doc(db, "allMarketplace", id);
    const userRef = doc(db, "users", uid);

    const batch = writeBatch(db);

    try {
      batch.delete(marketRef);
      batch.delete(allMarketRef);
      batch.update(userRef, {
        numMarket: increment(-1),
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
        if (isBusinessUser) {
          photoRef = ref(
            storage,
            `users/${uid}/biz/${bizId}/drafts/${id}/${fileName}`
          );
        } else {
          photoRef = ref(storage, `users/${uid}/drafts/${id}/${fileName}`);
        }
      } else {
        if (isBusinessUser) {
          photoRef = ref(
            storage,
            `users/${uid}/biz/${bizId}/marketplace/${id}/${fileName}`
          );
        } else {
          photoRef = ref(storage, `users/${uid}/marketplace/${id}/${fileName}`);
        }
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
        className={`${styles.jobs_card_container} ${styles.flex}`}
      >
        {defaultImage ? (
          <div className="min-w-[25%] aspect-square relative md:h-[25vw]  lg:min-w-[33%] lg:h-[14vw]">
            <Image
              src={defaultImage}
              alt="post image"
              fill
              className="object-cover rounded-md "
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
              <p>{reviewNum}</p>
              <p
                className={`${styles.review_count_p}`}
              >{`(${rating} reviews)`}</p>
            </div>
            <h4>{postTitle}</h4>
            <p className={`${styles.business_location_p}`}>{city}</p>
            <div className={`${styles.business_type} ${styles.flex}`}>
              <span>•</span>
              <p>{productTypeDisplay}</p>
            </div>
            {/* <div className={`${styles.negotiate_price}`}>
              <p>Negotiate Price</p>
            </div> */}
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
                    ? `/business-center/business/edit/marketplace/${id}`
                    : `/business-center/classic/edit/marketplace/${id}`
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

export default MarketplaceCard;
