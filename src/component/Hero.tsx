"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Hero = () => {
  const [bannerImage, setBannerImage] = useState("/banner1.jpeg");
  const banners = [
    "/banner1.jpeg",
    "/banner2.jpeg",
    "/banner3.jpeg",
    "/banner4.jpeg",
  ];

  useEffect(() => {
    if (banners) {
      setBannerImage(banners[0]);
      let interval;
      let count = 0;
      interval = setInterval(() => {
        setBannerImage(banners[count]);
        if (count == banners?.length - 1) {
          count = 0;
        } else {
          count += 1;
        }
      }, 7000);

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div className=" min-h-[360px] w-full bg-neutral-100 flex-col flex justify-center p-6 md:px-12 lg:px-20 relative">
      <div className=" z-10 text-white">
        <p className=" uppercase">Shop All</p>
        <h1 className=" text-3xl md:text-5xl mt-3">
          Explore Our <br /> Curated Collection
        </h1>
        <p className=" xl:w-[40%] md:w-[50%] mt-4 tracking-wide">
          From skincare essentials to beauty must-haves, discover everything you
          need to elevate your routine.
        </p>
      </div>
      <Image
        src={bannerImage}
        alt="banner"
        height={360}
        width={1000}
        className=" h-full w-full absolute left-0 right-0 object-cover brightness-[.6]"
      />
    </div>
  );
};

export default Hero;
