import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../../../libs/endpoints";
import { Product } from "../../../types";
import { useFetch } from "../useFetch";

const useGetProducts = () => {
  const { get } = useFetch();
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["Products"],
    queryFn: async () => {
      const res = await get(endpoints.user.product.products);
      return res.data.products;
    },
  });
  return {
    products,
    isLoading,
  };
};

export default useGetProducts;
