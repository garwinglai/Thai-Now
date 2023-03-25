import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
	apiKey: "AIzaSyCpJyCE7GAgxgswpZxSxkbymEx5ycjg_-g",
	authDomain: "thai-now-web-app.firebaseapp.com",
	projectId: "thai-now-web-app",
	storageBucket: "thai-now-web-app.appspot.com",
	messagingSenderId: "406276037081",
	appId: "1:406276037081:web:ed231d878977dadd1561c8",
	measurementId: "G-H7SPG5JK3X",
};

// Initialize Firebase
let app;
if (getApps().length < 1) {
	app = initializeApp(firebaseConfig);
}

const db = getFirestore(app);

export default app;
export { db };
