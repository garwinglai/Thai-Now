import MainLayout from "@/components/layouts/MainLayout";
import React from "react";
import { IconButton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

function CreatePostBusiness() {
  const step = 0;

  const { back } = useRouter();

  const handleBack = () => {
    back();
  };

  return (
    <div className="pt-20">
      <div className="flex items-center gap-2 pt-8 pl-16">
        <div className="border rounded-full">
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
      <div className="flex flex-col gap-4 p-8 w-1/2 mx-auto mt-16">
        <h4>What type of post?</h4>
        <Link
          href="/business-center/business/create/housing"
          className="text-center w-full py-2 border border-[color:var(--deals-primary-med)] border-opacity-50 text-[color:var(--deals-primary)] rounded hover:text-white hover:bg-[color:var(--deals-primary-med)] active:text-white active:bg-[color:var(--deals-primary-med)]"
        >
          Housing
        </Link>
        <Link
          href="/business-center/business/create/jobs"
          className="text-center w-full text-[color:var(--deals-primary)]  py-2 border border-[color:var(--deals-primary-med)] border-opacity-50 rounded hover:text-white hover:bg-[color:var(--deals-primary-med)] active:text-white active:bg-[color:var(--deals-primary-med)]"
        >
          Jobs
        </Link>
        <Link
          href="/business-center/business/create/marketplace"
          className="text-center w-full text-[color:var(--deals-primary)]  py-2 border border-[color:var(--deals-primary-med)] border-opacity-50 rounded hover:text-white hover:bg-[color:var(--deals-primary-med)] active:text-white active:bg-[color:var(--deals-primary-med)]"
        >
          Marketplace
        </Link>
      </div>
    </div>
  );
}

export default CreatePostBusiness;

CreatePostBusiness.getLayout = function getLayout(page) {
  return <MainLayout route="business-center">{page}</MainLayout>;
};
