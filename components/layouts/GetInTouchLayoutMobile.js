import React from "react";
import styles from "@/styles/components/layouts/get-in-touch-layout-mobile.module.css";
import { TextField } from "@mui/material";

function GetInTouchLayoutMobile() {
  return (
    <div className="p-4 bg-[color:var(--light-blue-bg)] lg:flex lg:px-52 lg:mx-auto lg:gap-4">
      <div className="lg:w-2/5 lg:pt-20">
        <h3 className="text-[color:var(--deals-primary)]">Get in touch?</h3>
        <br />
        <p className="text-xs font-light">
          For further questions, including partnership opportunities, please
          email info@thainowapp.com or contact using our contact form.
        </p>
        <br />
        <br />
      </div>
      <form className="flex flex-col gap-4 lg:w-3/5">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-[color:var(--deals-primary)]">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="rounded-md border-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-[color:var(--deals-primary)]">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="rounded-md border-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="question"
            className="text-[color:var(--deals-primary)]"
          >
            How can we help you?
          </label>
          <textarea
            id="question"
            name="question"
            className="rounded-md border-none"
            rows={4}
          />

          <p className="text-[color:var(--label-color)] font-extralight text-sm">
            0/500
          </p>
        </div>

        <p className="font-light text-sm lg:text-xs">
          Please enter the details of your request and, if you have any
          questions regarding our Terms of Use, please include specific samples
          of the usage you wish to give our resources. Once your request is
          submitted, a member of our support staff will respond as soon as
          possible.
        </p>

        <button className="bg-[color:var(--secondary)] py-2 rounded-md text-white mt-4 mb-8">
          Send
        </button>
      </form>
    </div>
  );
}

export default GetInTouchLayoutMobile;
