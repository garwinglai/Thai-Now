import { db } from "../fireConfig";
import { doc, addDoc, collection } from "firebase/firestore";

export async function addData() {
	const newTest = await addDoc(collection(db, "testCollection"), {
		greet: "Wassup",
	});

	console.log("add stuff", newTest);
}
