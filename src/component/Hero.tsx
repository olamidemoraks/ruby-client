import React from "react";

const Hero = () => {
  return (
    <div className=" min-h-[360px] w-full bg-neutral-100 flex-col flex justify-center p-6 md:px-12 lg:px-20">
      <p className=" uppercase">Shop All</p>
      <h1 className=" text-3xl md:text-5xl mt-3">
        Explore Our <br /> Curated Collection
      </h1>
      <p className=" xl:w-[40%] md:w-[50%] mt-4 tracking-wide">
        From skincare essentials to beauty must-haves, discover everything you
        need to elevate your routine.
      </p>
    </div>
  );
};

export default Hero;
