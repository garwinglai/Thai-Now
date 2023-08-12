import {
  collection,
  doc,
  setDoc,
  writeBatch,
  increment,
} from "firebase/firestore";
import { db } from "@/firebase/fireConfig";
import { storage } from "@/firebase/fireConfig";
import { getDownloadURL, ref, uploadBytes, listAll } from "firebase/storage";

export async function createHousingClassic(housingData, uid) {
  const { uploadedPhotos } = housingData;
  const housingRef = doc(collection(db, "users", uid, "housingPosts"));
  const housingRefId = housingRef.id;

  const photos = await storePhotosToFirebaseStorage(
    uploadedPhotos,
    uid,
    housingRefId
  );

  delete housingData.uploadedPhotos;
  housingData.photos = photos;

  try {
    const batch = writeBatch(db);

    batch.set(housingRef, housingData);

    const allHousingCollectionRef = doc(db, "allHousing", housingRefId);
    batch.set(allHousingCollectionRef, housingData);

    const userRef = doc(db, "users", uid);
    batch.update(userRef, {
      numHousing: increment(1),
    });

    await batch.commit();

    return { success: true, postId: housingRefId };
  } catch (error) {
    return { success: false, error };
  }
}

const storePhotosToFirebaseStorage = async (photos, uid, housingRefId) => {
  let photosFromStorage = {};

  let j = 1;

  for (let i = 0; i < photos.length; i++) {
    const currPhoto = photos[i];

    const { imgUrl, imageFile } = currPhoto;
    let fileName = i + "-" + j + ".jpg";
    const photoRef = ref(
      storage,
      `users/${uid}/housing/${housingRefId}/${fileName}`
    );
    try {
      await uploadBytes(photoRef, imageFile);
    } catch (error) {
      console.log("error uploading product image:", error);
      return { error };
    }
    try {
      const photoUrl = await getDownloadURL(photoRef);
      const fileKey = fileName.split(".")[0];
      const data = {
        [fileKey]: photoUrl,
      };

      photosFromStorage = { ...photosFromStorage, ...data };
    } catch (error) {
      console.log("error getting photo url:", error);
      return { error };
    }
  }

  return photosFromStorage;
};
