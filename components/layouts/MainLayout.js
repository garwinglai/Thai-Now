import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";

function MainLayout({ children }) {
	return (
		<>
			<Nav />
			<main>{children}</main>
			{/* <Footer /> */}
		</>
	);
}

export default MainLayout;
