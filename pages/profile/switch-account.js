import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import styles from "@/styles/pages/profile/switch-account.module.css";
import Link from "next/link";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AccountSwitchComponent from "@/components/profile/AccountSwitchComponent";
import marketing_image from "@/public/static/images/switch_account_image.png";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Image from "next/image";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";

function SwitchAccount() {
  const { back } = useRouter();

  const handleBack = () => {
    back();
  };
  return (
    <div className={`${styles.switch_account_box}`}>
      <div className={`${styles.header_box}`}>
        <div className="flex items-center gap-1 pl-4 pt-4 lg:gap-2  lg:pl-16">
          <div className="lg:border  lg:rounded-full">
            <IconButton onClick={handleBack}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <button
            onClick={handleBack}
            className="text-[color:var(--deals-primary)]"
          >
            Back
          </button>
        </div>
        <h2>Switch Account</h2>
      </div>
      <div className="lg:w-6/12 lg:mx-auto">
        <div className={`${styles.flexCol} ${styles.profiles}`}>
          <AccountSwitchComponent isActiveProfile={true} />
          <AccountSwitchComponent isActiveProfile={false} />
        </div>
        <div className={`${styles.marketing_box} ${styles.flexCol}`}>
          <div className="lg:px-12 lg:mx-auto">
            <Image
              src={marketing_image}
              alt="create business image"
              className={`${styles.marketing_image}`}
            />
            <h3>Create a free business account</h3>
            <div className={`${styles.benefits_group}`}>
              <h5>Unlock tools to help:</h5>
              <div className={`${styles.flex} ${styles.context_group}`}>
                <CheckCircleIcon sx={{ color: "#ff3d00" }} />
                <p>Grow your audience</p>
              </div>
              <div className={`${styles.flex} ${styles.context_group}`}>
                <CheckCircleIcon sx={{ color: "#ff3d00" }} />
                <p>Sell more product</p>
              </div>
              <div className={`${styles.flex} ${styles.context_group}`}>
                <CheckCircleIcon sx={{ color: "#ff3d00" }} />
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
          </div>
          <Link
            href="/profile/create-business-account"
            className={`${styles.signup_link}`}
          >
            Create
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SwitchAccount;
