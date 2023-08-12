import React, { useEffect } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useRouter } from "next/router";
import AccountPrivateMenu from "@/components/menus/AccountPrivateMenu";
import PrivateProfileBreadcrumbs from "@/components/menus/PrivateProfileBreadcrumbs";
import SavedListComponent from "@/components/profile/SavedListComponent";
import { useAuth } from "@/components/auth/AuthProvider";

function SavedList() {
  const { authUser, loading } = useAuth();
  const { uid } = authUser || {};

  const { back, push } = useRouter();

  useEffect(() => {
    if (!authUser && !loading) {
      push("/auth/signin");
    }
  }, [authUser, loading]);

  const handleBack = () => {
    back();
  };

  // TODO: loading, show skeleton

  return (
    <div className=" pb-16 lg:bg-[color:var(--profile-bg)] lg:p-4">
      <button
        onClick={handleBack}
        className="flex gap-2 items-center px-4 pt-4 lg:hidden"
      >
        <ChevronLeftIcon />
        <p>Back</p>
      </button>
      <div className="lg:pt-20">
        <div className="hidden lg:block lg:ml-[10%] lg:pb-6 ">
          <PrivateProfileBreadcrumbs breadcrumb="saved" />
        </div>
        <div className="lg:flex lg:mx-auto  lg:gap-4 lg:w-[80%]">
          <div className="hidden lg:block lg:bg-white lg:rounded-md lg:shadow-md lg:h-fit lg:min-w-[11rem]">
            <AccountPrivateMenu currentRoute="saved" />
          </div>
          <div className="lg:bg-white lg:rounded-md lg:shadow-md lg:flex-grow lg:px-4 lg:pb-16">
            <SavedListComponent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavedList;

SavedList.getLayout = function getLayout(page) {
  return <MainLayout route="profile">{page}</MainLayout>;
};
