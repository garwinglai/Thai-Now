import React from "react";
import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";
import styles from "../../styles/components/layouts/main-layout.module.css";
import Footer from "./Footer";
import { useRouter } from "next/router";
import AuthProvider from "../auth/AuthProvider";

function MainLayout({ children, route }) {
  const router = useRouter();
  const { directory } = router.query;

  return (
    <React.Fragment>
      <AuthProvider>
        <div className={`${directory && styles.layout_nav_mobile}`}>
          <NavMobile auth={false} route={route} />
        </div>
        {route !== "terms" && (
          <div className={`${directory && styles.layout_nav_desktop}`}>
            <NavDesktop />
          </div>
        )}
        <main className={`${route !== "post-detail" && styles.layout_main}`}>
          {children}
        </main>
        {route !== "create-business" &&
          route !== "business-center" &&
          route !== "business-profile" && <Footer />}
      </AuthProvider>
    </React.Fragment>
  );
}

export default MainLayout;
