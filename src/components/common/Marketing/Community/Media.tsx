"use client"

import Image from "next/image";

const Media = () => {
  return (
    <div className="space-y-4 sm:space-y-8">
      <Image width={900} height={900} src={'/assets/images/community-media-1.png'} alt="" loading="lazy" />
      <Image width={900} height={900} src={'/assets/images/community-media-1.png'} alt="" loading="lazy" />
    </div>
  );
};

export default Media;
