import React from "react";
import { useRouter } from "next/router";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MainLayout from "@/components/layouts/MainLayout";
import ChangePassword from "@/components/profile/ChangePassword";
import PrivateProfileBreadcrumbs from "@/components/menus/PrivateProfileBreadcrumbs";
import AccountPrivateMenu from "@/components/menus/AccountPrivateMenu";

function ProfilePassword() {
  const { back } = useRouter();

  const handleBack = () => {
    back();
  };
  return (
    <div className="p-4 pb-16 lg:bg-[color:var(--profile-bg)]">
      <button
        onClick={handleBack}
        className="flex gap-2 items-center lg:hidden"
      >
        <ChevronLeftIcon />
        <p>Back</p>
      </button>
      <div className="lg:mt-20">
        <div className="hidden lg:block lg:ml-[10%] lg:pb-6 ">
          <PrivateProfileBreadcrumbs breadcrumb="Password" />
        </div>
        <div className="lg:flex lg:mx-auto  lg:gap-4 lg:w-[80%]">
          <div className="hidden lg:block lg:bg-white lg:rounded-md lg:shadow-md lg:h-fit  lg:min-w-[11rem]">
            <AccountPrivateMenu currentRoute="password" />
          </div>
          <div className="lg:bg-white lg:rounded-md lg:shadow-md lg:flex-grow lg:pl-4 lg:pb-16 lg:pr-[20rem]">
            <ChangePassword />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePassword;

ProfilePassword.getLayout = function getLayout(page) {
  return <MainLayout route="profile">{page}</MainLayout>;
};
