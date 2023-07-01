import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import styles from "@/styles/pages/terms/terms-of-use.module.css";
import Link from "next/link";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useRouter } from "next/router";

function TermsOfService() {
  const { back } = useRouter();

  const handleBack = () => {
    back();
  };

  return (
    <div className={`${styles.terms_box}`}>
      <button
        onClick={handleBack}
        className={`${styles.flex} ${styles.back_btn}`}
      >
        <ChevronLeftIcon />
        <p>Back</p>
      </button>
      <h2>
        PROJECT THAIHUB a.k.a <br /> &quot;THAINOW&quot; <br />
        TERMS OF USE
      </h2>
      <section>
        <p>
          Welcome to the THAINOW Terms and Conditions Agreement (hereinafter
          “Terms” or these “Service Standard Terms and Conditions” or
          “Agreement”). The Terms contained herein, shall govern your use of
          this website, and/or application, including all pages within this
          website (collectively referred to herein below as this “Website”) and
          the application. For purposes of this Agreement, “Site” refers to the
          Company&apos;s website, which can be accessed at
          https://thainowapp.com. “Service” refers to the Company&apos;s
          services accessed via the online website, in which users can seek
          information of local services, including deals, jobs, housing, and
          marketplace, etc.. and/or through our mobile application. The terms
          “we,” “us,” and “our” refer to the company THAINOW. “You” refers to
          you, as a user of our Site or our Service.
        </p>
        <br />

        <p>
          The following Terms of Use apply when you view or use the Service via
          our website located at https://thainowapp.com.
        </p>
        <br />
        <p>
          Please review the following terms carefully. By accessing or using the
          Service, you expressly agree to these Terms and Conditions of Use, all
          applicable laws, and regulations, and agree that you are responsible
          for compliance with any applicable local laws. The materials contained
          on this web site and on our application are protected by applicable
          copyright and trademark law.{" "}
          <b>
            If you do not agree to be bound by these Terms of Use in their
            entirety, you may not access or use the Service.
          </b>
        </p>
        <br />
        <br />
        <h3>PRIVACY POLICY</h3>
        <br />
        <p>
          The Company respects the privacy of its Service users. Please refer to
          the Company&apos;s Privacy Policy (found here:{" "}
          <a href="https://policy.thainowapp.com/">
            https://policy.thainowapp.com/
          </a>{" "}
          ) which explains how we collect, use, and disclose information that
          pertains to your privacy. When you access or use the Service, you
          signify your agreement to the Privacy Policy as well as these Terms of
          Use.
        </p>
        <br />
        <br />
        <h3>REGISTRATION; RULES FOR USER CONDUCT AND USE OF THE SERVICE</h3>
        <br />
        <p>
          You need to be at least 18 years old to register for and use the
          Service. If you are a user who signs up for the Service, you will
          create a personalized account which includes a unique username and a
          password to access the Service and to receive messages from the
          Company. You agree to notify us immediately of any unauthorized use of
          your username, password and/or account. The Company will not be
          responsible for any liabilities, losses, or damages arising out of the
          unauthorized use of your username, password and/or account.
        </p>
        <br />
        <br />
        <h3>USE RESTRICTIONS</h3>
        <br />
        <p>
          Your permission to use the Site is conditioned upon the following use,
          posting and conduct restrictions:
          <br />
          <br />
          You agree that you will not under any circumstances:
        </p>
        <br />
        <ol>
          <li>
            Publish or distribute any part or parts of the Site or the Service
            without our explicit written permission (we grant the operators of
            public search engines permission to use spiders to copy materials
            from the site for the sole purpose of creating publicly-available
            searchable indices but retain the right to revoke this permission at
            any time on a general or specific basis);
          </li>
          <li>
            Selling, sublicensing and/or otherwise commercializing any
            Website/Application material;
          </li>

          <li>
            Use the Service for any unlawful purpose or for the promotion of
            illegal activities;
          </li>
          <li>
            Harass, abuse, or in any way harm another person or group, or
            attempt to do so;
          </li>
          <li>Use another user&apos;s account without permission;</li>
          <li>Intentionally allow another user to access your account;</li>

          <li>
            Provide false or inaccurate information when registering an account;
          </li>

          <li>
            Interfere or attempt to interfere with the proper functioning of the
            Service;
          </li>
          <li>
            Make any automated use of the Site, the Service or the related
            systems, or take any action that we deem to impose or to potentially
            impose an unreasonable or disproportionately large load on our
            servers or network infrastructure;
          </li>
          <li>
            Bypass any robot exclusion headers or other measures we take to
            restrict access to the Service, or use any software, technology, or
            device to scrape, spider, or crawl the Service or harvest or
            manipulate data;
          </li>
          <li>
            Circumvent, disable or otherwise interfere with any security-related
            features of the Service or features that prevent or restrict use or
            copying of content, or enforce limitations on use of the Service or
            the content accessible via the Service; or
          </li>
          <li>
            Publish or link to malicious content of any sort, including that
            intended to damage or disrupt another user&apos;s browser or
            computer.
          </li>
          <li>
            Engaging in any data mining, data harvesting, data extracting or any
            other similar activity in relation to this Website or the
            application, or while using our service.
          </li>
        </ol>
      </section>
    </div>
  );
}

export default TermsOfService;

TermsOfService.getLayout = function getLayout(page) {
  return <MainLayout route="terms">{page}</MainLayout>;
};
