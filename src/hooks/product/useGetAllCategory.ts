import { useQuery } from "@tanstack/react-query";
import React from "react";
import { endpoints } from "../../../libs/endpoints";
import { useFetch } from "../useFetch";

const useGetAllCategory = () => {
  const { get } = useFetch();
  const {
    data: categories,
    isLoading,
    refetch,
  } = useQuery<{ name: string; _id: string }[]>({
    queryKey: ["Categories"],
    queryFn: async () => {
      const res = await get(endpoints.admin.category);
      if (res.success) {
        return res.data.categories;
      }
      return [];
    },
  });
  return { categories, isLoading, refetch };
};

export default useGetAllCategory;
