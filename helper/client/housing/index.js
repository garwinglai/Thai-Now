import {
  collection,
  doc,
  setDoc,
  writeBatch,
  increment,
} from "firebase/firestore";
import { db } from "@/firebase/fireConfig";

export async function createHousingClassic(housingData, uid) {
  try {
    const batch = writeBatch(db);

    const housingRef = doc(collection(db, "users", uid, "housingPosts"));
    const housingRefId = housingRef.id;
    batch.set(housingRef, housingData);

    const allHousingCollectionRef = doc(db, "allHousing", housingRefId);
    batch.set(allHousingCollectionRef, housingData);

    const userRef = doc(db, "users", uid);
    batch.update(userRef, {
      numHousing: increment(1),
    });

    await batch.commit();

    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}
