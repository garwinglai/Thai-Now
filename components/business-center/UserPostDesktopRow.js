import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton } from "@mui/material";
import Image from "next/image";
import { ref, deleteObject } from "firebase/storage";
import { storage, db } from "@/firebase/fireConfig";
import { useAuth } from "../auth/AuthProvider";
import { doc, deleteDoc, writeBatch, increment } from "firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";

function UserPostDesktopRow({
  even,
  post,
  isDraft,
  userType,
  userData,
  postType,
}) {
  // userType | 0:classic, 1:business
  // postType | 0: jobs, 1: deals, 2: marketplace, 3: housing
  const { authUser, loading } = useAuth();
  const { uid } = authUser || {};
  const { bizId } = userData || {};

  // pricePer | 0:day, 1:week, 2:month, 3:year
  const {
    id,
    price,
    pricePer,
    createdAt,
    postTitle,
    postDescription,
    postAddressDetails,
    postAddress,
    rating,
    reviewNum,
    photos,
  } = post ? post : {};

  const [defaultImage, setDefaultImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const pricePerTimeline = pricePer
    ? pricePer === 0
      ? "day"
      : pricePer === 1
      ? "week"
      : pricePer === 2
      ? "month"
      : "year"
    : "night";

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

  const handleDeletePost = async () => {
    setIsLoading(true);
    if (isDraft) {
      const photoKeys = Object.keys(photos);
      const photoKeysLen = photoKeys.length;

      if (userType === 0) {
        // classic
        if (photoKeysLen > 0) {
          await removeImagesFromStorage(photos);
        }
        await deleteFirestoreDraftPost();
      }

      if (userType === 1) {
        // business
        if (photoKeysLen > 0) {
          await removeImagesFromStorage(photos);
        }
        await deleteBizFirestoreDraftPost();
      }
    } else {
      if (userType === 0) {
        //classic
        await deleteFirestorePost();
        await removeImagesFromStorage(photos);
      }

      if (userType === 1) {
        // business
        await deleteFireStoreBizPost();
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
    let postDirectory =
      postType === 0
        ? "jobsPost"
        : postType === 1
        ? "dealsPost"
        : postType === 2
        ? "marketPosts"
        : "housingPosts";

    let allPostDirectory =
      postType === 0
        ? "allJobs"
        : postType === 1
        ? "allDeals"
        : postType === 2
        ? "allMarketplace"
        : "allHousing";

    let decrementValue =
      postType === 0
        ? "numJobs"
        : postType === 1
        ? "numDeals"
        : postType === 2
        ? "numMarket"
        : "numHousing";

    const postRef = doc(db, "users", uid, "biz", bizId, postDirectory, id);
    const allPostRef = doc(db, allPostDirectory, id);
    const bizRef = doc(db, "users", uid, "biz", bizId);

    const batch = writeBatch(db);

    try {
      batch.delete(postRef);
      batch.delete(allPostRef);
      batch.update(bizRef, {
        [decrementValue]: increment(-1),
      });

      await batch.commit();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFirestorePost = async () => {
    const marketRef = doc(db, "users", uid, "marketPosts", id);
    const allMarketplaceRef = doc(db, "allMarketplace", id);
    const userRef = doc(db, "users", uid);

    const batch = writeBatch(db);

    try {
      batch.delete(marketRef);
      batch.delete(allMarketplaceRef);
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
        if (userType === 0) {
          //classic user
          photoRef = ref(storage, `users/${uid}/drafts/${id}/${fileName}`);
        }
        if (userType === 1) {
          //business user
          photoRef = ref(
            storage,
            `users/${uid}/biz/${bizId}/drafts/${id}/${fileName}`
          );
        }
      } else {
        let postDirectory =
          postType === 0
            ? "jobs"
            : postType === 1
            ? "deals"
            : postType === 2
            ? "marketplace"
            : "housing";
        if (userType === 0) {
          //classic user
          photoRef = ref(
            storage,
            `users/${uid}/${postDirectory}/${id}/${fileName}`
          );
        }
        if (userType === 1) {
          //business user
          photoRef = ref(
            storage,
            `users/${uid}/biz/${bizId}/${postDirectory}/${id}/${fileName}`
          );
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
    <tr className={`border-b ${even && `bg-[color:var(--row-bg)]`}`}>
      <td className="text-center w-1/12">
        <input
          type="checkbox"
          className="form-checkbox accent-[color:var(--deals-primary-med)] w-4 h-4 rounded border-[color:var(--placeholder-color)] focus:ring-0"
        />
      </td>
      <td className="text-xs font-light text-left py-2 w-1/12">
        <div className="flex items-center gap-4">
          {defaultImage ? (
            <div className=" min-w-[2rem] aspect-square relative">
              <Image
                src={defaultImage}
                alt="post image"
                fill
                className="object-cover rounded-md w-full"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ) : (
            <div className="w-8 h-8 rounded bg-gray-200 text-xs font-extralight flex justify-center items-center">
              .img
            </div>
          )}
          <p>{postTitle}</p>
        </div>
      </td>
      <td className="text-xs font-light text-left py-2 pr-5 w-1/12">House</td>
      <td className="text-xs font-light text-left py-2 pr-5 w-1/12">
        {price}/{pricePerTimeline}
      </td>
      <td className="text-xs font-light text-left py-2 pr-5 w-2/12">
        {postAddress}
      </td>
      <td className="text-xs font-light text-center py-2 w-2/12">
        May 09 2023
      </td>
      <td className="text-xs font-light text-center py-2 w-2/12">
        <div className="flex justify-center">
          <Link
            href={`/business-center/${
              userType === 0 ? "classic" : "business"
            }/edit/${
              postType === 0
                ? "jobs"
                : postType === 1
                ? "deals"
                : postType === 2
                ? "marketplace"
                : "housing"
            }/${id}`}
          >
            <IconButton>
              <EditIcon fontSize="small" />
            </IconButton>
          </Link>
          {isLoading ? (
            <CircularProgress color="warning" />
          ) : (
            <IconButton onClick={handleDeletePost}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
          {!isDraft && (
            <Link
              href={`/${
                postType === 0
                  ? "jobs"
                  : postType === 1
                  ? "deals"
                  : postType === 2
                  ? "marketplace"
                  : "housing"
              }/${id}`}
            >
              <IconButton>
                <VisibilityIcon fontSize="small" />
              </IconButton>
            </Link>
          )}
        </div>
      </td>
    </tr>
  );
}

export default UserPostDesktopRow;
