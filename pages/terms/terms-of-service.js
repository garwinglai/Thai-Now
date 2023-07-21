import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import Link from "next/link";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useRouter } from "next/router";
import Breadcrumbs from "@mui/material/Breadcrumbs";

function TermsOfService() {
  const { back } = useRouter();

  const handleBack = () => {
    back();
  };

  return (
    <div className="p-4 pb-20 lg:pt-24 ">
      <button
        onClick={handleBack}
        className="flex items-center gap-2 lg:hidden"
      >
        <ChevronLeftIcon />
        <p>Back</p>
      </button>
      <div className="hidden lg:block lg:ml-24">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            href="/"
            className="text-[color:var(--deals-primary)]"
          >
            Home
          </Link>
          <p className="font-light text-[color:var(--label-color)]">
            Terms of Use
          </p>
        </Breadcrumbs>
      </div>
      <h2 className="text-[color:var(--deals-primary)] text-center mt-2 mb-4">
        PROJECT THAIHUB a.k.a <br /> &quot;THAINOW&quot; <br />
        TERMS OF USE
      </h2>
      <div className="lg:px-52">
        <section>
          <p className="font-light text-sm">
            Welcome to the THAINOW Terms and Conditions Agreement (hereinafter
            “Terms” or these “Service Standard Terms and Conditions” or
            “Agreement”). The Terms contained herein, shall govern your use of
            this website, and/or application, including all pages within this
            website (collectively referred to herein below as this “Website”)
            and the application. For purposes of this Agreement, “Site” refers
            to the Company&apos;s website, which can be accessed at
            https://thainowapp.com. “Service” refers to the Company&apos;s
            services accessed via the online website, in which users can seek
            information of local services, including deals, jobs, housing, and
            marketplace, etc.. and/or through our mobile application. The terms
            “we,” “us,” and “our” refer to the company THAINOW. “You” refers to
            you, as a user of our Site or our Service.
          </p>
          <br />

          <p className="font-light text-sm">
            The following Terms of Use apply when you view or use the Service
            via our website located at https://thainowapp.com.
          </p>
          <br />
          <p className="font-light text-sm">
            Please review the following terms carefully. By accessing or using
            the Service, you expressly agree to these Terms and Conditions of
            Use, all applicable laws, and regulations, and agree that you are
            responsible for compliance with any applicable local laws. The
            materials contained on this web site and on our application are
            protected by applicable copyright and trademark law.{" "}
            <b>
              If you do not agree to be bound by these Terms of Use in their
              entirety, you may not access or use the Service.
            </b>
          </p>
          <br />
          <br />
          <h3>PRIVACY POLICY</h3>
          <br />
          <p className="font-light text-sm">
            The Company respects the privacy of its Service users. Please refer
            to the Company&apos;s Privacy Policy (found here:{" "}
            <a href="https://policy.thainowapp.com/">
              https://policy.thainowapp.com/
            </a>{" "}
            ) which explains how we collect, use, and disclose information that
            pertains to your privacy. When you access or use the Service, you
            signify your agreement to the Privacy Policy as well as these Terms
            of Use.
          </p>
          <br />
          <br />
          <h3>REGISTRATION; RULES FOR USER CONDUCT AND USE OF THE SERVICE</h3>
          <br />
          <p className="font-light text-sm">
            You need to be at least 18 years old to register for and use the
            Service. If you are a user who signs up for the Service, you will
            create a personalized account which includes a unique username and a
            password to access the Service and to receive messages from the
            Company. You agree to notify us immediately of any unauthorized use
            of your username, password and/or account. The Company will not be
            responsible for any liabilities, losses, or damages arising out of
            the unauthorized use of your username, password and/or account.
          </p>
          <br />
          <br />
          <h3>USE RESTRICTIONS</h3>
          <br />
          <p className="font-light text-sm">
            Your permission to use the Site is conditioned upon the following
            use, posting and conduct restrictions:
            <br />
            <br />
            You agree that you will not under any circumstances:
          </p>
          <br />
          <ol>
            <li className="font-light text-sm list-decimal ml-6 pl-1 pr-4 text-[color:var(--paragraph-color)]">
              Publish or distribute any part or parts of the Site or the Service
              without our explicit written permission (we grant the operators of
              public search engines permission to use spiders to copy materials
              from the site for the sole purpose of creating publicly-available
              searchable indices but retain the right to revoke this permission
              at any time on a general or specific basis);
            </li>
            <li className="font-light text-sm list-decimal ml-6 pl-1 pr-4 text-[color:var(--paragraph-color)]">
              Selling, sublicensing and/or otherwise commercializing any
              Website/Application material;
            </li>

            <li className="font-light text-sm list-decimal ml-6 pl-1 pr-4 text-[color:var(--paragraph-color)]">
              Use the Service for any unlawful purpose or for the promotion of
              illegal activities;
            </li>
            <li className="font-light text-sm list-decimal ml-6 pl-1 pr-4 text-[color:var(--paragraph-color)]">
              Harass, abuse, or in any way harm another person or group, or
              attempt to do so;
            </li>
            <li className="font-light text-sm list-decimal ml-6 pl-1 pr-4 text-[color:var(--paragraph-color)]">
              Use another user&apos;s account without permission;
            </li>
            <li className="font-light text-sm list-decimal ml-6 pl-1 pr-4 text-[color:var(--paragraph-color)]">
              Intentionally allow another user to access your account;
            </li>

            <li className="font-light text-sm list-decimal ml-6 pl-1 pr-4 text-[color:var(--paragraph-color)]">
              Provide false or inaccurate information when registering an
              account;
            </li>

            <li className="font-light text-sm list-decimal ml-6 pl-1 pr-4 text-[color:var(--paragraph-color)]">
              Interfere or attempt to interfere with the proper functioning of
              the Service;
            </li>
            <li className="font-light text-sm list-decimal ml-6 pl-1 pr-4 text-[color:var(--paragraph-color)]">
              Make any automated use of the Site, the Service or the related
              systems, or take any action that we deem to impose or to
              potentially impose an unreasonable or disproportionately large
              load on our servers or network infrastructure;
            </li>
            <li className="font-light text-sm list-decimal ml-6 pl-1 pr-4 text-[color:var(--paragraph-color)]">
              Bypass any robot exclusion headers or other measures we take to
              restrict access to the Service, or use any software, technology,
              or device to scrape, spider, or crawl the Service or harvest or
              manipulate data;
            </li>
            <li className="font-light text-sm list-decimal ml-6 pl-1 pr-4 text-[color:var(--paragraph-color)]">
              Circumvent, disable or otherwise interfere with any
              security-related features of the Service or features that prevent
              or restrict use or copying of content, or enforce limitations on
              use of the Service or the content accessible via the Service; or
            </li>
            <li className="font-light text-sm list-decimal ml-6 pl-1 pr-4 text-[color:var(--paragraph-color)]">
              Publish or link to malicious content of any sort, including that
              intended to damage or disrupt another user&apos;s browser or
              computer.
            </li>
            <li className="font-light text-sm list-decimal ml-6 pl-1 pr-4 text-[color:var(--paragraph-color)]">
              Engaging in any data mining, data harvesting, data extracting or
              any other similar activity in relation to this Website or the
              application, or while using our service.
            </li>
          </ol>
        </section>
      </div>
    </div>
  );
}

export default TermsOfService;

TermsOfService.getLayout = function getLayout(page) {
  return <MainLayout route="terms">{page}</MainLayout>;
};
