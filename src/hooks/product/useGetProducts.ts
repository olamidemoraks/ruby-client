import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../../../libs/endpoints";
import { Product } from "../../../types";
import { useFetch } from "../useFetch";

const useGetProducts = (category?: string, name?: string) => {
  const { get } = useFetch();
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["Products", category, name],
    queryFn: async () => {
      const res = await get(
        `${endpoints.user.product.products}?categoryId=${category}&name=${name}`
      );
      return res.data.products;
    },
  });
  return {
    products,
    isLoading,
  };
};

export default useGetProducts;
