import React, { useEffect, useState } from "react";
import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";
import styles from "../../styles/components/layouts/main-layout.module.css";
import Footer from "./Footer";
import { useRouter } from "next/router";
import { useAuth } from "../auth/AuthProvider";
import { db } from "@/firebase/fireConfig";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { deleteLocalStorage, setLocalStorage } from "@/utils/clientStorage";

function MainLayout({ children, route }) {
  const { authUser, loading } = useAuth();

  const [classicUser, setClassicUser] = useState(null);
  const [bizUser, setBizUser] = useState(null);

  const router = useRouter();
  const { directory } = router.query;

  useEffect(() => {
    if (!authUser) return;
    const { uid } = authUser;
    //iua1qTPXTy36LnD4CGI8 bizId
    const userRef = doc(db, "users", uid);

    const unsubUserListener = onSnapshot(userRef, async (user) => {
      if (user.exists()) {
        const userData = user.data();
        userData.id = user.id;
        const { usingBizId: bizId } = userData;

        if (bizId) {
          const bizRef = doc(db, "users", uid, "biz", bizId);
          const bizSnap = await getDoc(bizRef);
          const biz = bizSnap.data();
          biz.id = bizSnap.id;

          setLocalStorage("bizUser", JSON.stringify(biz));
          setBizUser(biz);
        } else {
          deleteLocalStorage("bizUser");
          setBizUser(null);
        }
        setLocalStorage("classicUser", JSON.stringify(userData));
        setClassicUser(userData);
      }
    });

    return () => {
      unsubUserListener();
    };
  }, [authUser, loading]);

  if (route === "switch-account") {
    return <main>{children}</main>;
  }
  // console.log("bizUser", bizUser);
  // console.log("classicUser", classicUser);

  return (
    <React.Fragment>
      <div className={`${directory && styles.layout_nav_mobile}`}>
        <NavMobile
          auth={false}
          route={route}
          classicUser={classicUser}
          bizUser={bizUser}
        />
      </div>

      <div className={`${directory && styles.layout_nav_desktop}`}>
        <NavDesktop classicUser={classicUser} bizUser={bizUser} route={route} />
      </div>

      <main className={`${route !== "post-detail" && styles.layout_main}`}>
        {children}
      </main>
      {route !== "create-business" &&
        route !== "business-center" &&
        route !== "business-profile" && <Footer />}
    </React.Fragment>
  );
}

export default MainLayout;
