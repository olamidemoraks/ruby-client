import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Product } from "../../../types";
import { useFetch } from "../useFetch";
import { endpoints } from "../../../libs/endpoints";

const useGetAllProducts = (productName?: string) => {
  const { get } = useFetch();
  const { data, isLoading } = useQuery<Product[]>({
    queryKey: ["ALL-PRODUCT", productName],
    queryFn: async () => {
      const res = await get(
        `${endpoints.admin.product.getAllProduct}?name=${productName}`
      );
      return res.data.products;
    },
  });
  return {
    data,
    isLoading,
  };
};

export default useGetAllProducts;
