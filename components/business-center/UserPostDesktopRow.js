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

function UserPostDesktopRow({ even, post }) {
  const { authUser, loading } = useAuth();
  const { uid } = authUser || {};

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
    await deleteFirestorePost();
    await removeImagesFromStorage(photos);
    setIsLoading(false);
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
      const photoRef = ref(storage, `users/${uid}/housing/${id}/${fileName}`);
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
            <div className="w-8 h-8 relative">
              <Image
                src={defaultImage}
                alt="post image"
                fill
                className=" rounded-md"
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
          <IconButton>
            <EditIcon fontSize="small" />
          </IconButton>
          {isLoading ? (
            <CircularProgress color="warning" />
          ) : (
            <IconButton onClick={handleDeletePost}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
          <Link href={`/housing/${id}`}>
            <IconButton>
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Link>
        </div>
      </td>
    </tr>
  );
}

export default UserPostDesktopRow;
