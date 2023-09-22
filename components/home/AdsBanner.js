import React from "react";
import bannerImage from "../../public/static/images/home/banner.png";
import styles from "../../styles/components/home/ads-banner.module.css";
import Image from "next/image";

function AdsBanner() {
  return (
    <div className="w-auto h-52 relative px-4 mx-auto">
      <Image
        src={bannerImage}
        alt="ads banner"
        className="object-cover rounded"
        priority={true}
        fill
      />
    </div>
  );
}

export default AdsBanner;
