import {
  collection,
  doc,
  setDoc,
  writeBatch,
  increment,
} from "firebase/firestore";
import { db } from "@/firebase/fireConfig";
import { storage } from "@/firebase/fireConfig";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  listAll,
  deleteObject,
} from "firebase/storage";

export async function createHousingClassic(housingData, uid) {
  const { newAddedPhotos } = housingData;
  const housingRef = doc(collection(db, "users", uid, "housingPosts"));
  const housingRefId = housingRef.id;

  const photos = await storePhotosToFirebaseStorage(
    newAddedPhotos,
    uid,
    housingRefId
  );

  delete housingData.newAddedPhotos;
  delete housingData.removedPhotos;
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

export const updateHousingClassicPost = async (housingData, uid) => {
  const { removedPhotos, newAddedPhotos, postId: housingRefId } = housingData;

  await deleteRemovedPhotosFromStorage(removedPhotos, uid, housingRefId);

  const photos = await storePhotosToFirebaseStorage(
    newAddedPhotos,
    uid,
    housingRefId
  );

  delete housingData.removedPhotos;
  delete housingData.newAddedPhotos;
  delete housingData.oldPhotos, (housingData.photos = photos);
  delete housingData.postId;

  const housingRef = doc(db, "users", uid, "housingPosts", housingRefId);

  try {
    const batch = writeBatch(db);

    batch.update(housingRef, housingData);

    const allHousingCollectionRef = doc(db, "allHousing", housingRefId);
    batch.update(allHousingCollectionRef, housingData);

    await batch.commit();

    return { success: true, postId: housingRefId };
  } catch (error) {
    return { success: false, error };
  }
};

export const saveHousingClassicDraft = async (housingData, uid) => {
  const { newAddedPhotos, oldPhotos, postId: oldPostId } = housingData;
  const newPhotosLen = newAddedPhotos.length;
  const oldPhotosLen = oldPhotos.length;

  const draftRef = doc(collection(db, "users", uid, "drafts"));
  const draftRefId = draftRef.id;

  housingData.photos = {};

  if (oldPhotosLen > 0) {
    const copyOldImagesAPI = "/api/housing/images/copy-to-draft";

    let data = {};

    for (let i = 0; i < oldPhotos.length; i++) {
      const currPhoto = oldPhotos[i];
      const { fileName, imgUrl } = currPhoto;
      const fullFileName = fileName + ".jpg";
      const copyOldImagesData = {
        uid,
        newPostId: draftRefId,
        oldPostId,
        fileName: fullFileName,
      };

      const copyOldImagesRes = await fetch(copyOldImagesAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(copyOldImagesData),
      });

      const oldImageField = {
        [fileName]: imgUrl,
      };

      data = { ...data, ...oldImageField };
    }

    housingData.photos = data;
  }

  if (newPhotosLen > 0) {
    const photos = await storeDraftPhotosToFirebaseStorage(
      newAddedPhotos,
      uid,
      draftRefId
    );

    housingData.photos = { ...photos, ...housingData.photos };
  }

  delete housingData.newAddedPhotos;
  delete housingData.removedPhotos;
  delete housingData.oldPhotos;

  try {
    const ref = await setDoc(draftRef, housingData);

    return { success: true, postId: draftRefId };
  } catch (error) {
    return { success: false, error };
  }
};

export const publishDraftClassicHousingPost = async (draftData, uid) => {
  const { newAddedPhotos, oldPhotos, postId } = draftData;
  const newPhotosLen = newAddedPhotos.length;
  const oldPhotosLen = oldPhotos.length;

  const userRef = doc(db, "users", uid);
  const draftRef = doc(db, "users", uid, "drafts", postId);
  const housingRef = doc(collection(db, "users", uid, "housingPosts"));
  const housingRefId = housingRef.id;
  const allHousingCollectionRef = doc(db, "allHousing", housingRefId);

  const draftRefId = draftRef.id;
  draftData.photos = {};
  if (oldPhotosLen > 0) {
    const copyOldImagesAPI = "/api/housing/images/copy-to-housing";

    let data = {};

    for (let i = 0; i < oldPhotos.length; i++) {
      const currPhoto = oldPhotos[i];
      const { fileName, imgUrl } = currPhoto;
      const fullFileName = fileName + ".jpg";
      const copyOldImagesData = {
        uid,
        newPostId: housingRefId,
        oldPostId: postId,
        fileName: fullFileName,
      };

      const copyOldImagesRes = await fetch(copyOldImagesAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(copyOldImagesData),
      });

      const newImageUrl = await fetchNewImagesFromStorage(
        uid,
        housingRefId,
        fullFileName
      );

      const oldImageField = {
        [fileName]: newImageUrl,
      };

      data = { ...data, ...oldImageField };
    }

    draftData.photos = data;
  }

  if (newPhotosLen > 0) {
    const photos = await storePhotosToFirebaseStorage(
      newAddedPhotos,
      uid,
      housingRefId
    );

    // TODO: handle error
    draftData.photos = { ...photos, ...draftData.photos };
  }

  await deleteDraftImageStorage(uid, postId);

  delete draftData.newAddedPhotos;
  delete draftData.removedPhotos;
  delete draftData.oldPhotos;
  delete draftData.postId;

  try {
    const batch = writeBatch(db);

    batch.set(housingRef, draftData);
    batch.delete(draftRef);
    batch.set(allHousingCollectionRef, draftData);
    batch.update(userRef, {
      numHousing: increment(1),
    });

    await batch.commit();

    return { success: true, postId: housingRefId };
  } catch (error) {
    console.log("error", error);
    return { success: false, error };
  }
};

const fetchNewImagesFromStorage = async (uid, housingRefId, fileName) => {
  const storageRef = ref(storage, `users/${uid}/housing/${housingRefId}`);
  const fileRef = ref(storageRef, fileName);

  try {
    const photoUrl = await getDownloadURL(fileRef);
    return photoUrl;
  } catch (error) {
    console.log(error);
  }
};

const deleteDraftImageStorage = async (uid, postId) => {
  const storageRef = ref(storage, `users/${uid}/drafts/${postId}`);

  try {
    const listRes = await listAll(storageRef);

    const items = listRes.items;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      await deleteObject(item);
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateHousingClassicDraft = async (housingData, uid) => {
  const { newAddedPhotos, oldPhotos, removedPhotos, postId } = housingData;
  const newPhotosLen = newAddedPhotos.length;
  const oldPhotosLen = oldPhotos.length;
  const removedPhotosLen = removedPhotos.length;

  const draftRef = doc(db, "users", uid, "drafts", postId);

  housingData.photos = {};

  if (removedPhotosLen > 0) {
    await deletePhotosFromDraftStorage(removedPhotos, uid, postId);
  }

  if (oldPhotosLen > 0) {
    let data = {};

    for (let i = 0; i < oldPhotos.length; i++) {
      const currPhoto = oldPhotos[i];
      const { fileName, imgUrl } = currPhoto;
      const oldImageField = {
        [fileName]: imgUrl,
      };

      data = { ...data, ...oldImageField };
    }

    housingData.photos = data;
  }

  if (newPhotosLen > 0) {
    const photos = await storeDraftPhotosToFirebaseStorage(
      newAddedPhotos,
      uid,
      postId
    );

    housingData.photos = { ...photos, ...housingData.photos };
  }

  delete housingData.newAddedPhotos;
  delete housingData.removedPhotos;
  delete housingData.oldPhotos;

  try {
    const ref = await setDoc(draftRef, housingData);

    return { success: true, postId };
  } catch (error) {
    return { success: false, error };
  }
};

const storeDraftPhotosToFirebaseStorage = async (photos, uid, draftRefId) => {
  let photosFromStorage = {};

  let j = 1;

  for (let i = 0; i < photos.length; i++) {
    const currPhoto = photos[i];
    // TODO: update when image schema changes so it doesn't start with 0-1. i-j.
    const { imgUrl, imageFile } = currPhoto;
    let fileName = i + "-" + j + ".jpg";
    const photoRef = ref(
      storage,
      `users/${uid}/drafts/${draftRefId}/${fileName}`
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

// TODO: for now, just keep storePhotosToFirebase when updating. Current storing is not good.
const updatePhotosInFirebaseStorage = async (photos, uid, housingRefId) => {};

const deleteRemovedPhotosFromStorage = async (
  removedPhotos,
  uid,
  housingRefId
) => {
  for (let i = 0; i < removedPhotos.length; i++) {
    const currPhoto = removedPhotos[i];
    const { imgUrl, fileName } = currPhoto;
    const fullFileName = fileName + ".jpg";
    const storagePath = `users/${uid}/housing/${housingRefId}/${fullFileName}`;

    const storageRef = ref(storage, storagePath);
    try {
      await deleteObject(storageRef);
    } catch (error) {
      console.log(error);
    }
  }
};

const deletePhotosFromDraftStorage = async (removedPhotos, uid, postId) => {
  for (let i = 0; i < removedPhotos.length; i++) {
    const currPhoto = removedPhotos[i];
    const { imgUrl, fileName } = currPhoto;
    const fullFileName = fileName + ".jpg";
    const storagePath = `users/${uid}/drafts/${postId}/${fullFileName}`;

    const storageRef = ref(storage, storagePath);
    try {
      await deleteObject(storageRef);
    } catch (error) {
      console.log(error);
    }
  }
};
