"use client";

import { CldUploadWidget } from "next-cloudinary";
import { createContext, useContext } from "react";

const CloudinaryContext = createContext({});

export const CloudinaryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <CloudinaryContext.Provider value={{}}>
      {children}
    </CloudinaryContext.Provider>
  );
};

export const useCloudinary = () => useContext(CloudinaryContext);
