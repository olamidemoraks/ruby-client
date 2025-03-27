"use client";
import CartEmpty from "@/component/CartEmpty";
import ProductCard from "@/component/ProductCard";
import useGetAllCategory from "@/hooks/product/useGetAllCategory";
import useGetProducts from "@/hooks/product/useGetProducts";
import { SearchNormal1 } from "iconsax-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { BiX } from "react-icons/bi";

const SearchFilters = ({
  handleSearchParams,
}: {
  handleSearchParams: (params: string, value: any) => void;
}) => {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  const { categories } = useGetAllCategory();

  return (
    <div className="flex-[.2]">
      <p className="font-semibold">Filter By Category</p>
      <div className="flex lg:flex-col lg:gap-4 my-4">
        {categories?.map((category) => (
          <div
            key={category?._id}
            onClick={() => handleSearchParams("category", category?._id)}
            className={`opacity-45 cursor-pointer hover:opacity-100 px-2 lg:px-0 max-lg:border-r border-zinc-400 ${
              category?._id === currentCategory && "opacity-100"
            } `}
          >
            {category?.name}
          </div>
        ))}
        <p
          onClick={() => handleSearchParams("category", "")}
          className="flex items-center gap-1 underline cursor-pointer px-2 opacity-50 hover:opacity-100"
        >
          clear filter <BiX />
        </p>
      </div>
    </div>
  );
};

const Page = () => {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const currentCategory = searchParams.get("category");
  const { isLoading, products } = useGetProducts(
    currentCategory ?? "",
    name ?? ""
  );

  const query = new URLSearchParams(searchParams || {});

  const handleSearchParams = (params: string, value: any) => {
    query.set(params, value);
    router.replace(`${pathname}?${query}`);
  };

  const handleSearchOnchange = (value: string) => {
    setTimeout(() => {
      handleSearchParams("name", value);
    }, 500);
  };

  return (
    <div className="p-6 md:px-12 mt-10 space-y-10 w-full">
      <div className="flex lg:flex-row flex-col w-full">
        {/* 🟢 Only wrap this part in Suspense */}
        <Suspense>
          <SearchFilters handleSearchParams={handleSearchParams} />
        </Suspense>

        <div className="w-full flex-1">
          <div className="w-full flex justify-between items-center">
            <p className="text-2xl md:text-4xl">Products</p>
            <div className="flex items-center gap-3 px-4 border rounded-full border-zinc-600">
              <SearchNormal1 size="24" color="#52525c" />
              <input
                onChange={(e) => handleSearchOnchange(e.target.value)}
                defaultValue={name ?? ""}
                type="text"
                placeholder="search for product"
                className="py-3 outline-none border-none bg-transparent min-w-[300px]"
              />
            </div>
          </div>

          {(!products || products?.length < 1) && !isLoading && (
            <div className="flex w-full min-h-[50vh] justify-center items-center opacity-40">
              <CartEmpty image="/empty-box.svg" />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-10 mt-10">
            {products?.map((product) => (
              <div
                onClick={() => router.push(`/products/${product?._id}`)}
                key={product?._id}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
