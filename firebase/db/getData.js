import { db } from "../fireConfig";
import { getDocs, collection } from "firebase/firestore";

export async function getData() {
	const querySnap = await getDocs(collection(db, "testCollection"));

	const dataArr = [];

	querySnap.forEach((doc) => {
		const data = doc.data();
		dataArr.push(data);
	});

	return dataArr;
}
