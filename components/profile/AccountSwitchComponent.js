import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import avatar_image from "@/public/static/images/temp_avatar.png";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import styles from "@/styles/components/profile/account-switch-component.module.css";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { useAuth } from "../auth/AuthProvider";

function AccountSwitchComponent({
  isActiveProfile,
  name,
  profPic,
  accountType,
  id,
  accountTypeDisplay,
  isActiveAccount,
  handleSwitchAccount,
}) {
  const { authUser, loading } = useAuth();
  const { uid, email } = authUser || {};

  return (
    <div className="px-4 flex items-center justify-between">
      <div className="">
        {isActiveProfile ? (
          <button
            onClick={handleSwitchAccount(accountType, id)}
            disabled={isActiveAccount}
            className={`flex gap-4 items-center  ${
              isActiveAccount ? "" : "hover:cursor-pointer"
            } `}
          >
            {profPic !== "" ? (
              <div className="relative w-16 h-16 aspect-square mx-auto rounded-full">
                <Image
                  className="rounded-full object-cover"
                  src={profPic}
                  alt="profile image"
                  priority
                  fill
                  placeholder="blur"
                  blurDataURL={"/img/logo.png"}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ) : (
              <div className="rounded-full w-16 h-16 mx-auto lg:ml-0 flex justify-center items-center text-center bg-[color:var(--filter-bg)]">
                <p className="text-xs font-extralight">No profile image</p>
              </div>
            )}
            <div className="text-left ">
              <h4>{name}</h4>
              <p>{accountTypeDisplay}</p>
            </div>
          </button>
        ) : (
          <Link
            href="/auth/signin"
            className="flex gap-4 items-center hover:underline"
          >
            <div className="w-16 h-16 bg-[color:var(--switch-bg)] mx-auto flex justify-center items-center rounded-full">
              <AddIcon color="action" sx={{ color: "white" }} />
            </div>
            <div className={`${styles.text_group}`}>
              <h4>Add an existing business account</h4>
            </div>
          </Link>
        )}
      </div>
      {isActiveProfile && isActiveAccount ? (
        <CheckCircleIcon color="primary" fontSize="large" />
      ) : (
        <span style={{ visibility: "hidden" }}>x</span>
      )}
    </div>
  );
}

export default AccountSwitchComponent;
