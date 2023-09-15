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

export async function createJobPostBusiness(jobPostData, uid, bizId) {
  const { newAddedPhotos } = jobPostData;
  const jobBizRef = doc(collection(db, "users", uid, "biz", bizId, "jobPosts"));
  const jobBizRefId = jobBizRef.id;

  const photos = await storePhotosToFirebaseStorageBusiness(
    newAddedPhotos,
    uid,
    jobBizRefId,
    bizId
  );

  delete jobPostData.newAddedPhotos;
  delete jobPostData.removedPhotos;
  delete jobPostData.oldPhotos;
  jobPostData.photos = photos;

  try {
    const batch = writeBatch(db);

    batch.set(jobBizRef, jobPostData);

    const allJobsCollectionRef = doc(db, "allJobs", jobBizRefId);
    batch.set(allJobsCollectionRef, jobPostData);

    const userRef = doc(db, "users", uid, "biz", bizId);
    batch.update(userRef, {
      numJobs: increment(1),
    });

    await batch.commit();

    return { success: true, postId: jobBizRefId };
  } catch (error) {
    return { success: false, error };
  }
}

const storePhotosToFirebaseStorageBusiness = async (
  photos,
  uid,
  jobsBizRefId,
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
      `users/${uid}/biz/${bizId}/jobs/${jobsBizRefId}/${fileName}`
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

export const saveJobsBusinessDraft = async (jobData, uid, bizId) => {
  const { newAddedPhotos, oldPhotos, postId: oldPostId } = jobData;
  const newPhotosLen = newAddedPhotos.length;
  const oldPhotosLen = oldPhotos.length;

  const draftRef = doc(collection(db, "users", uid, "biz", bizId, "drafts"));
  const draftRefId = draftRef.id;

  jobData.photos = {};

  if (oldPhotosLen > 0) {
    const copyOldImagesAPI = "/api/business/jobs/images/copy-to-draft";

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

    jobData.photos = data;
  }

  if (newPhotosLen > 0) {
    const photos = await storeDraftBusinessPhotosToFirebaseStorage(
      newAddedPhotos,
      uid,
      draftRefId,
      bizId
    );

    jobData.photos = { ...photos, ...jobData.photos };
  }

  delete jobData.newAddedPhotos;
  delete jobData.removedPhotos;
  delete jobData.oldPhotos;

  try {
    const ref = await setDoc(draftRef, jobData);

    return { success: true, postId: draftRefId };
  } catch (error) {
    return { success: false, error };
  }
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

export const publishDraftBusinessjobPost = async (draftData, uid, bizId) => {
  const { newAddedPhotos, oldPhotos, postId } = draftData;
  console.log("draftData", draftData);
  const newPhotosLen = newAddedPhotos.length;
  const oldPhotosLen = oldPhotos.length;

  const bizRef = doc(db, "users", uid, "biz", bizId);
  const draftRef = doc(db, "users", uid, "biz", bizId, "drafts", postId);
  const JobRef = doc(collection(db, "users", uid, "biz", bizId, "jobPosts"));
  const JobRefId = JobRef.id;
  const allJobRef = doc(db, "allJobs", JobRefId);

  const draftRefId = draftRef.id;
  draftData.photos = {};
  if (oldPhotosLen > 0) {
    const copyOldImagesAPI = "/api/business/job/images/copy-to-job";

    let data = {};

    for (let i = 0; i < oldPhotos.length; i++) {
      const currPhoto = oldPhotos[i];
      const { fileName, imgUrl } = currPhoto;
      const fullFileName = fileName + ".jpg";
      const copyOldImagesData = {
        uid,
        newPostId: JobRefId,
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
        JobRefId,
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
      JobRefId,
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

    batch.set(JobRef, draftData);
    batch.delete(draftRef);
    batch.set(allJobRef, draftData);
    batch.update(bizRef, {
      numJobs: increment(1),
    });

    await batch.commit();

    return { success: true, postId: JobRefId };
  } catch (error) {
    console.log("error", error);
    return { success: false, error };
  }
};

const fetchNewImagesFromStorageBiz = async (uid, jobRefId, fileName, bizId) => {
  const storageRef = ref(storage, `users/${uid}/biz/${bizId}/jobs/${jobRefId}`);
  const fileRef = ref(storageRef, fileName);

  try {
    const photoUrl = await getDownloadURL(fileRef);
    return photoUrl;
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

export const updateJobBusinessPost = async (jobData, uid, bizId) => {
  const { removedPhotos, newAddedPhotos, postId: jobRefId } = jobData;

  await deleteRemovedBusinessPhotosFromStorage(
    removedPhotos,
    uid,
    jobRefId,
    bizId
  );

  const photos = await storePhotosToFirebaseStorageBusiness(
    newAddedPhotos,
    uid,
    jobRefId,
    bizId
  );

  delete jobData.removedPhotos;
  delete jobData.newAddedPhotos;
  delete jobData.oldPhotos;
  jobData.photos = photos;
  delete jobData.postId;

  const jobRef = doc(db, "users", uid, "biz", bizId, "jobPosts", jobRefId);

  try {
    const batch = writeBatch(db);

    batch.update(jobRef, jobData);

    const allJobsCollectionRef = doc(db, "allJobs", jobRefId);
    batch.update(allJobsCollectionRef, jobData);

    await batch.commit();

    return { success: true, postId: jobRefId };
  } catch (error) {
    return { success: false, error };
  }
};

const deleteRemovedBusinessPhotosFromStorage = async (
  removedPhotos,
  uid,
  jobRefId,
  bizId
) => {
  for (let i = 0; i < removedPhotos.length; i++) {
    const currPhoto = removedPhotos[i];
    const { imgUrl, fileName } = currPhoto;
    const fullFileName = fileName + ".jpg";
    const storagePath = `users/${uid}/biz/${bizId}/jobs/${jobRefId}/${fullFileName}`;

    const storageRef = ref(storage, storagePath);
    try {
      await deleteObject(storageRef);
    } catch (error) {
      console.log(error);
    }
  }
};

export const updateJobBusinessDraft = async (jobData, uid, bizId) => {
  const { newAddedPhotos, oldPhotos, removedPhotos, postId } = jobData;
  const newPhotosLen = newAddedPhotos.length;
  const oldPhotosLen = oldPhotos.length;
  const removedPhotosLen = removedPhotos.length;

  const draftRef = doc(db, "users", uid, "biz", bizId, "drafts", postId);

  jobData.photos = {};

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

    jobData.photos = data;
  }

  if (newPhotosLen > 0) {
    const photos = await storeDraftBusinessPhotosToFirebaseStorage(
      newAddedPhotos,
      uid,
      postId,
      bizId
    );

    jobData.photos = { ...photos, ...jobData.photos };
  }

  delete jobData.newAddedPhotos;
  delete jobData.removedPhotos;
  delete jobData.oldPhotos;

  try {
    const ref = await setDoc(draftRef, jobData);

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
