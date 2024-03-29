import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import styles from "@/styles/pages/terms/privacy-policy.module.css";
import Link from "next/link";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useRouter } from "next/router";
import Breadcrumbs from "@mui/material/Breadcrumbs";

function PrivacyPolicy() {
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
        PRIVACY POLICY
      </h2>
      <div className="lg:px-52">
        <section>
          <p className="font-light text-sm">
            Project Thaihub aka THAINOW (hereinafter &quot;we&quot;,
            &quot;us&quot;, &quot;our&quot;) is committed to maintaining privacy
            protections for its users (hereinafter &quot;you&quot;,
            &quot;user&quot; and/or &quot;users&quot;). Our Privacy Policy
            (hereinafter &quot;Privacy Policy&quot; and/or &quot;Policy&quot;)
            is designed to help you understand how we collect, use, communicate,
            disclose, make use of your personal information and protect the data
            and information you provide to us when you use our service by
            accessing either our online website or via our mobile application.
            &quot;Service&quot; as used in this Policy shall refer to our
            services accessed via either through our online website and/or
            through our mobile application. Your privacy is very important to
            us. We reserve the right to change this policy at any given time, of
            which you will be promptly updated. If you want to make sure that
            you are up to date with the latest changes, we advise you to
            frequently visit this page. By accessing and using our Service, you
            accept our Policy and Terms of Use (which can be found
            athttps://terms.thainowapp.com/ ), and you express consent to our
            collection, storage, use and disclosure of your personal information
            as described in this Policy.
          </p>
          <br />
          <h3>What User Data We Collect</h3>
          <br />
          <p className="font-light text-sm">
            When you use our service, we may collect &quot;Non-Personal
            Information&quot; and &quot;Personal Information.&quot;
          </p>
          <br />
          <p className="font-light text-sm">
            Non-Personal Information includes information that cannot be used to
            personally identify you, which includes, but is not limited to the
            following:
          </p>
          <ul>
            <li className="font-light text-sm list-disc ml-6 pl-1 pr-4 text-[color:var(--paragraph-color)]">
              Anonymous usage data
            </li>
            <li className="font-light text-sm list-disc ml-6 pl-1 pr-4 text-[color:var(--paragraph-color)]">
              General demographic information
            </li>
            <li className="font-light text-sm list-disc ml-6 pl-1 pr-4 text-[color:var(--paragraph-color)]">
              Referring/exit pages and URLs
            </li>
            <li className="font-light text-sm list-disc ml-6 pl-1 pr-4 text-[color:var(--paragraph-color)]">
              Platform types
            </li>
            <li className="font-light text-sm list-disc ml-6 pl-1 pr-4 text-[color:var(--paragraph-color)]">
              Preferences you submit and those that are generated based on the
              date you submit and number of clicks.
            </li>
          </ul>
          <br />

          <p className="font-light text-sm">
            Personal Information includes information that is personal to you,
            which you submit to us through the registration process and at other
            times for usage of our service. This personal information includes,
            but is not limited to the following:
          </p>
          <ul>
            <li className="font-light text-sm list-disc ml-6 pl-1 pr-4 text-[color:var(--paragraph-color)]">
              Your contact information such as your phone number, address and
              email
            </li>
            <li className="font-light text-sm list-disc ml-6 pl-1 pr-4 text-[color:var(--paragraph-color)]">
              A photograph of you, when and where appropriate
            </li>
            <li className="font-light text-sm list-disc ml-6 pl-1 pr-4 text-[color:var(--paragraph-color)]">
              Other information such as interests and preferences.
            </li>
            <li className="font-light text-sm list-disc ml-6 pl-1 pr-4 text-[color:var(--paragraph-color)]">
              Data profile regarding your online behavior on our website.
            </li>
          </ul>
          <br />
          <p className="font-light text-sm">
            This information also includes information in your profile, or
            information you provide to us via an email, text, telephone call, or
            by some other similar means. We also collect information about how
            you use our Services, such as the types of content you view or
            engage with or the frequency and duration of your activities. Your
            telephone calls and other communications with us are usually
            recorded or monitored for quality control, training or for similar
            purposes. We also collect information about any purchases and/or
            transactions. This includes your payment information, such as your
            credit or debit card number and other card information, and other
            account and authentication information, as well as billing,
            shipping, and contact details.
          </p>
          <br />
          <h3>Why We Collect Your Data</h3>
          <br />
          <p className="font-light text-sm">
            Before or at the time we collect your personal information, we will
            identify the purposes for which information is being collected. We
            will collect and use personal information solely with the objective
            of fulfilling those purposes specified by us and for other
            compatible purposes, unless we obtain your prior consent or as
            required by law. We will collect personal information by lawful and
            fair means and, where appropriate, with the knowledge or consent of
            the individual concerned.
          </p>
          <br />
          <p className="font-light text-sm">
            In general, we are collecting your data for several reasons:
          </p>
          <ul>
            <li className="font-light text-sm list-disc ml-6 pl-1 pr-4 text-[color:var(--paragraph-color)]">
              To help us better communicate with you and provide you with
              technical support
            </li>
            <li className="font-light text-sm list-disc ml-6 pl-1 pr-4 text-[color:var(--paragraph-color)]">
              To understand your needs and to improve our services and products
              to meet those needs.
            </li>
            <li className="font-light text-sm list-disc ml-6 pl-1 pr-4 text-[color:var(--paragraph-color)]">
              To send you promotional emails containing offers and/or
              information we think you will find interesting.
            </li>
            <li className="font-light text-sm list-disc ml-6 pl-1 pr-4 text-[color:var(--paragraph-color)]">
              To possibly display interest-based ads for features, products, and
              services that might be of interest to you. However, we will not
              use information that personally identifies you to display
              interest-based ads.
            </li>
            <li className="font-light text-sm list-disc ml-6 pl-1 pr-4 text-[color:var(--paragraph-color)]">
              To customize our website according to your online behavior and
              personal preferences.
            </li>
          </ul>
          <br />
          <h3>How we collect your Information</h3>
          <br />
          <p className="font-light text-sm">
            <b>1. Via Technology</b>
          </p>
          <br />
          <p className="font-light text-sm">
            To activate and use our Service, you do not need to submit any
            Personal Information other than your phone number, or email, and zip
            code. To use our Service thereafter, you do need to submit further
            Personal Information, which may possibly include email, education,
            address, skills, work experience, etc. However, in an effort to
            improve the quality of the Service, we track information provided to
            us by your browser
          </p>
        </section>
      </div>
    </div>
  );
}

export default PrivacyPolicy;

PrivacyPolicy.getLayout = function getLayout(page) {
  return <MainLayout route="terms">{page}</MainLayout>;
};
