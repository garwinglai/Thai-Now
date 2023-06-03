import React from "react";
import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";
import styles from "../../styles/components/layouts/main-layout.module.css";
import Footer from "./Footer";
import { useRouter } from "next/router";

function MainLayout({ children, route }) {
	const router = useRouter();
	const { directory } = router.query;

	return (
		<React.Fragment>
			<div className={`${directory && styles.layout_nav_mobile}`}>
				<NavMobile auth={false} route={route} />
			</div>
			<div className={`${directory && styles.layout_nav_desktop}`}>
				<NavDesktop />
			</div>
			<main className={`${styles.layout_main}`}>{children}</main>
			{route !== "create-business" &&
				route !== "business-center" &&
				route !== "business-profile" && <Footer />}
		</React.Fragment>
	);
}

export default MainLayout;
