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

export async function createMarketClassic(marketPostData, uid) {
  const { newAddedPhotos } = marketPostData;
  const marketRef = doc(collection(db, "users", uid, "marketPosts"));
  const marketRefId = marketRef.id;

  const photos = await storePhotosToFirebaseStorageClassic(
    newAddedPhotos,
    uid,
    marketRefId
  );

  delete marketPostData.newAddedPhotos;
  delete marketPostData.removedPhotos;
  delete marketPostData.oldPhotos;
  marketPostData.photos = photos;

  try {
    const batch = writeBatch(db);

    batch.set(marketRef, marketPostData);

    const allMarketCollectionRef = doc(db, "allMarketplace", marketRefId);
    batch.set(allMarketCollectionRef, marketPostData);

    const userRef = doc(db, "users", uid);
    batch.update(userRef, {
      numMarket: increment(1),
    });

    await batch.commit();

    return { success: true, postId: marketRefId };
  } catch (error) {
    return { success: false, error };
  }
}

const storePhotosToFirebaseStorageClassic = async (
  photos,
  uid,
  marketRefId
) => {
  let photosFromStorage = {};

  let j = 1;

  for (let i = 0; i < photos.length; i++) {
    const currPhoto = photos[i];

    const { imgUrl, imageFile } = currPhoto;
    let fileName = i + "-" + j + ".jpg";
    const photoRef = ref(
      storage,
      `users/${uid}/marketplace/${marketRefId}/${fileName}`
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

export async function createMarketBusiness(marketPostData, uid, bizId) {
  const { newAddedPhotos } = marketPostData;
  const marketBizRef = doc(
    collection(db, "users", uid, "biz", bizId, "marketPosts")
  );
  const marketBizRefId = marketBizRef.id;

  const photos = await storePhotosToFirebaseStorageBusiness(
    newAddedPhotos,
    uid,
    marketBizRefId,
    bizId
  );

  delete marketPostData.newAddedPhotos;
  delete marketPostData.removedPhotos;
  delete marketPostData.oldPhotos;
  marketPostData.photos = photos;

  try {
    const batch = writeBatch(db);

    batch.set(marketBizRef, marketPostData);

    const allMarketCollectionRef = doc(db, "allMarketplace", marketBizRefId);
    batch.set(allMarketCollectionRef, marketPostData);

    const userRef = doc(db, "users", uid, "biz", bizId);
    batch.update(userRef, {
      numMarket: increment(1),
    });

    await batch.commit();

    return { success: true, postId: marketBizRefId };
  } catch (error) {
    return { success: false, error };
  }
}

const storePhotosToFirebaseStorageBusiness = async (
  photos,
  uid,
  marketBizRefId,
  bizId
) => {
  let photosFromStorage = {};

  let j = 1;

  for (let i = 0; i < photos.length; i++) {
    const currPhoto = photos[i];

    const { imgUrl, imageFile } = currPhoto;
    let fileName = i + "-" + j + ".jpg";
    const photoRef = ref(
      storage,
      `users/${uid}/biz/${bizId}/marketplace/${marketBizRefId}/${fileName}`
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

export const saveMarketClassicDraft = async (marketData, uid) => {
  const { newAddedPhotos, oldPhotos, postId: oldPostId } = marketData;
  const newPhotosLen = newAddedPhotos.length;
  const oldPhotosLen = oldPhotos.length;

  const draftRef = doc(collection(db, "users", uid, "drafts"));
  const draftRefId = draftRef.id;

  marketData.photos = {};

  if (oldPhotosLen > 0) {
    const copyOldImagesAPI = "/api/classic/marketplace/images/copy-to-draft";

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

    marketData.photos = data;
  }

  if (newPhotosLen > 0) {
    const photos = await storeClassicDraftPhotosToFirebaseStorage(
      newAddedPhotos,
      uid,
      draftRefId
    );

    marketData.photos = { ...photos, ...marketData.photos };
  }

  delete marketData.newAddedPhotos;
  delete marketData.removedPhotos;
  delete marketData.oldPhotos;

  try {
    const ref = await setDoc(draftRef, marketData);

    return { success: true, postId: draftRefId };
  } catch (error) {
    return { success: false, error };
  }
};

export const saveMarketBusinessDraft = async (marketData, uid, bizId) => {
  const { newAddedPhotos, oldPhotos, postId: oldPostId } = marketData;
  const newPhotosLen = newAddedPhotos.length;
  const oldPhotosLen = oldPhotos.length;

  const draftRef = doc(collection(db, "users", uid, "biz", bizId, "drafts"));
  const draftRefId = draftRef.id;

  marketData.photos = {};

  if (oldPhotosLen > 0) {
    const copyOldImagesAPI = "/api/business/marketplace/images/copy-to-draft";

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
        bizId,
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

    marketData.photos = data;
  }

  if (newPhotosLen > 0) {
    const photos = await storeDraftBusinessPhotosToFirebaseStorage(
      newAddedPhotos,
      uid,
      draftRefId,
      bizId
    );

    marketData.photos = { ...photos, ...marketData.photos };
  }

  delete marketData.newAddedPhotos;
  delete marketData.removedPhotos;
  delete marketData.oldPhotos;

  try {
    const ref = await setDoc(draftRef, marketData);

    return { success: true, postId: draftRefId };
  } catch (error) {
    return { success: false, error };
  }
};

const storeClassicDraftPhotosToFirebaseStorage = async (
  photos,
  uid,
  draftRefId
) => {
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

const storeDraftBusinessPhotosToFirebaseStorage = async (
  photos,
  uid,
  draftRefId,
  bizId
) => {
  let photosFromStorage = {};

  let j = 1;

  for (let i = 0; i < photos.length; i++) {
    const currPhoto = photos[i];
    // TODO: update when image schema changes so it doesn't start with 0-1. i-j.
    const { imgUrl, imageFile } = currPhoto;
    let fileName = i + "-" + j + ".jpg";
    const photoRef = ref(
      storage,
      `users/${uid}/biz/${bizId}/drafts/${draftRefId}/${fileName}`
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

export const publishDraftClassicMarketPost = async (draftData, uid) => {
  const { newAddedPhotos, oldPhotos, postId } = draftData;
  const newPhotosLen = newAddedPhotos.length;
  const oldPhotosLen = oldPhotos.length;

  const userRef = doc(db, "users", uid);
  const draftRef = doc(db, "users", uid, "drafts", postId);
  const marketRef = doc(collection(db, "users", uid, "marketPosts"));
  const marketRefId = marketRef.id;
  const allMarketCollectionRef = doc(db, "allMarketplace", marketRefId);

  const draftRefId = draftRef.id;
  draftData.photos = {};
  if (oldPhotosLen > 0) {
    const copyOldImagesAPI =
      "/api/classic/marketplace/images/copy-to-marketplace";

    let data = {};

    for (let i = 0; i < oldPhotos.length; i++) {
      const currPhoto = oldPhotos[i];
      const { fileName, imgUrl } = currPhoto;
      const fullFileName = fileName + ".jpg";
      const copyOldImagesData = {
        uid,
        newPostId: marketRefId,
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
        marketRefId,
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
    const photos = await storePhotosToFirebaseStorageClassic(
      newAddedPhotos,
      uid,
      marketRefId
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

    batch.set(marketRef, draftData);
    batch.delete(draftRef);
    batch.set(allMarketCollectionRef, draftData);
    batch.update(userRef, {
      numMarket: increment(1),
    });

    await batch.commit();

    return { success: true, postId: marketRefId };
  } catch (error) {
    console.log("error", error);
    return { success: false, error };
  }
};

export const publishDraftBusinessMarketPost = async (draftData, uid, bizId) => {
  const { newAddedPhotos, oldPhotos, postId } = draftData;
  const newPhotosLen = newAddedPhotos.length;
  const oldPhotosLen = oldPhotos.length;

  const bizRef = doc(db, "users", uid, "biz", bizId);
  const draftRef = doc(db, "users", uid, "biz", bizId, "drafts", postId);
  const marketRef = doc(
    collection(db, "users", uid, "biz", bizId, "marketPosts")
  );
  const marketRefId = marketRef.id;
  const allMarketCollectionRef = doc(db, "allMarketplace", marketRefId);

  const draftRefId = draftRef.id;
  draftData.photos = {};
  if (oldPhotosLen > 0) {
    const copyOldImagesAPI =
      "/api/business/marketplace/images/copy-to-marketplace";

    let data = {};

    for (let i = 0; i < oldPhotos.length; i++) {
      const currPhoto = oldPhotos[i];
      const { fileName, imgUrl } = currPhoto;
      const fullFileName = fileName + ".jpg";
      const copyOldImagesData = {
        uid,
        newPostId: marketRefId,
        oldPostId: postId,
        fileName: fullFileName,
        bizId,
      };

      const copyOldImagesRes = await fetch(copyOldImagesAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(copyOldImagesData),
      });

      const newImageUrl = await fetchNewImagesFromStorageBiz(
        uid,
        marketRefId,
        fullFileName,
        bizId
      );

      const oldImageField = {
        [fileName]: newImageUrl,
      };

      data = { ...data, ...oldImageField };
    }

    draftData.photos = data;
  }

  if (newPhotosLen > 0) {
    const photos = await storePhotosToFirebaseStorageBusiness(
      newAddedPhotos,
      uid,
      marketRefId,
      bizId
    );

    // TODO: handle error
    draftData.photos = { ...photos, ...draftData.photos };
  }

  await deleteDraftImageStorageBiz(uid, postId, bizId);

  delete draftData.newAddedPhotos;
  delete draftData.removedPhotos;
  delete draftData.oldPhotos;
  delete draftData.postId;

  try {
    const batch = writeBatch(db);

    batch.set(marketRef, draftData);
    batch.delete(draftRef);
    batch.set(allMarketCollectionRef, draftData);
    batch.update(bizRef, {
      numMarket: increment(1),
    });

    await batch.commit();

    return { success: true, postId: marketRefId };
  } catch (error) {
    console.log("error", error);
    return { success: false, error };
  }
};

const fetchNewImagesFromStorage = async (uid, housingRefId, fileName) => {
  const storageRef = ref(storage, `users/${uid}/marketplace/${housingRefId}`);
  const fileRef = ref(storageRef, fileName);

  try {
    const photoUrl = await getDownloadURL(fileRef);
    return photoUrl;
  } catch (error) {
    console.log(error);
  }
};

const fetchNewImagesFromStorageBiz = async (
  uid,
  marketRefId,
  fileName,
  bizId
) => {
  const storageRef = ref(
    storage,
    `users/${uid}/biz/${bizId}/marketplace/${marketRefId}`
  );
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

const deleteDraftImageStorageBiz = async (uid, postId, bizId) => {
  const storageRef = ref(storage, `users/${uid}/biz/${bizId}/drafts/${postId}`);

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

export const updateMarketClassicPost = async (marketData, uid) => {
  const { removedPhotos, newAddedPhotos, postId: marketRefId } = marketData;

  await deleteRemovedBusinessPhotosFromStorage(removedPhotos, uid, marketRefId);

  const photos = await storePhotosToFirebaseStorageClassic(
    newAddedPhotos,
    uid,
    marketRefId
  );

  delete marketData.removedPhotos;
  delete marketData.newAddedPhotos;
  delete marketData.oldPhotos;
  marketData.photos = photos;
  delete marketData.postId;

  const marketRef = doc(db, "users", uid, "marketPosts", marketRefId);

  try {
    const batch = writeBatch(db);

    batch.update(marketRef, marketData);

    const allMarketplaceCollectionRef = doc(db, "allMarketplace", marketRefId);
    batch.update(allMarketplaceCollectionRef, marketData);

    await batch.commit();

    return { success: true, postId: marketRefId };
  } catch (error) {
    return { success: false, error };
  }
};

export const updateMarketBusinessPost = async (marketData, uid, bizId) => {
  const { removedPhotos, newAddedPhotos, postId: marketRefId } = marketData;

  await deleteRemovedBusinessPhotosFromStorage(
    removedPhotos,
    uid,
    marketRefId,
    bizId
  );

  const photos = await storePhotosToFirebaseStorageBusiness(
    newAddedPhotos,
    uid,
    marketRefId,
    bizId
  );

  delete marketData.removedPhotos;
  delete marketData.newAddedPhotos;
  delete marketData.oldPhotos;
  marketData.photos = photos;
  delete marketData.postId;

  const marketRef = doc(
    db,
    "users",
    uid,
    "biz",
    bizId,
    "marketPosts",
    marketRefId
  );

  try {
    const batch = writeBatch(db);

    batch.update(marketRef, marketData);

    const allMarketplaceCollectionRef = doc(db, "allMarketplace", marketRefId);
    batch.update(allMarketplaceCollectionRef, marketData);

    await batch.commit();

    return { success: true, postId: marketRefId };
  } catch (error) {
    return { success: false, error };
  }
};

const deleteRemovedBusinessPhotosFromStorage = async (
  removedPhotos,
  uid,
  marketRefid,
  bizId
) => {
  for (let i = 0; i < removedPhotos.length; i++) {
    const currPhoto = removedPhotos[i];
    const { imgUrl, fileName } = currPhoto;
    const fullFileName = fileName + ".jpg";
    const storagePath = `users/${uid}/biz/${bizId}/marketplace/${marketRefid}/${fullFileName}`;

    const storageRef = ref(storage, storagePath);
    try {
      await deleteObject(storageRef);
    } catch (error) {
      console.log(error);
    }
  }
};

export const updateMarketClassicDraft = async (marketplaceData, uid) => {
  const { newAddedPhotos, oldPhotos, removedPhotos, postId } = marketplaceData;
  const newPhotosLen = newAddedPhotos.length;
  const oldPhotosLen = oldPhotos.length;
  const removedPhotosLen = removedPhotos.length;

  const draftRef = doc(db, "users", uid, "drafts", postId);

  marketplaceData.photos = {};

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

    marketplaceData.photos = data;
  }

  if (newPhotosLen > 0) {
    const photos = await storeClassicDraftPhotosToFirebaseStorage(
      newAddedPhotos,
      uid,
      postId
    );

    marketplaceData.photos = { ...photos, ...marketplaceData.photos };
  }

  delete marketplaceData.newAddedPhotos;
  delete marketplaceData.removedPhotos;
  delete marketplaceData.oldPhotos;

  try {
    const ref = await setDoc(draftRef, marketplaceData);

    return { success: true, postId };
  } catch (error) {
    return { success: false, error };
  }
};

export const updateMarketBusinessDraft = async (
  marketplaceData,
  uid,
  bizId
) => {
  const { newAddedPhotos, oldPhotos, removedPhotos, postId } = marketplaceData;
  const newPhotosLen = newAddedPhotos.length;
  const oldPhotosLen = oldPhotos.length;
  const removedPhotosLen = removedPhotos.length;

  const draftRef = doc(db, "users", uid, "biz", bizId, "drafts", postId);

  marketplaceData.photos = {};

  if (removedPhotosLen > 0) {
    await deletePhotosFromDraftStorageBiz(removedPhotos, uid, postId, bizId);
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

    marketplaceData.photos = data;
  }

  if (newPhotosLen > 0) {
    const photos = await storeDraftBusinessPhotosToFirebaseStorage(
      newAddedPhotos,
      uid,
      postId,
      bizId
    );

    marketplaceData.photos = { ...photos, ...marketplaceData.photos };
  }

  delete marketplaceData.newAddedPhotos;
  delete marketplaceData.removedPhotos;
  delete marketplaceData.oldPhotos;

  try {
    const ref = await setDoc(draftRef, marketplaceData);

    return { success: true, postId };
  } catch (error) {
    return { success: false, error };
  }
};

const deletePhotosFromDraftStorageBiz = async (
  removedPhotos,
  uid,
  postId,
  bizId
) => {
  for (let i = 0; i < removedPhotos.length; i++) {
    const currPhoto = removedPhotos[i];
    const { imgUrl, fileName } = currPhoto;
    const fullFileName = fileName + ".jpg";
    const storagePath = `users/${uid}/biz/${bizId}/drafts/${postId}/${fullFileName}`;

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
