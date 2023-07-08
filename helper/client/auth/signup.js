import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/fireConfig";

export async function createUser(user, uid) {
  user.createdAt = serverTimestamp();

  try {
    const newUser = await setDoc(doc(db, "users", uid), user);
    return { success: true, value: newUser };
  } catch (error) {
    return { success: false, value: error };
  }
}
