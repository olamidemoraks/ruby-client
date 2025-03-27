"use client";
import Button from "@/component/Button";
import InputField from "@/component/InputField";
import { useFetch } from "@/hooks/useFetch";
import React, { Suspense, useState } from "react";
import { endpoints } from "../../../../libs/endpoints";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useGetAllCategory from "@/hooks/product/useGetAllCategory";

const Category = () => {
  const [category, setCategory] = useState("");
  const { post, put, get, remove } = useFetch();
  const searchParams = useSearchParams();
  const query = new URLSearchParams(searchParams || {});
  const pathname = usePathname();
  const router = useRouter();
  const id = searchParams.get("id");
  let isEdit = !!id;
  const { categories, isLoading, refetch } = useGetAllCategory();

  const SubmitCategory = async () => {
    if (!category) {
      return toast.error("Please enter category name");
    }
    let response;
    if (isEdit) {
      response = await put(`${endpoints.admin.category}/${id}`, {
        name: category,
      });
    } else {
      response = await post(endpoints.admin.category, { name: category });
    }
    if (response.success) {
      toast.success(response.data.message ?? "New Category created");
      setCategory("");
      handleSearchParams("id", "");
      refetch();
    } else {
      toast.error(response.data ?? "something went wrong");
    }
  };

  const deleteCategory = async () => {
    if (isEdit && id) {
      const response = await remove(`${endpoints.admin.category}`, id);
      if (response.success) {
        toast.success(response.data.message ?? "Category deleted");
        setCategory("");
        handleSearchParams("id", "");
        refetch();
      } else {
        toast.error(response.data ?? "something went wrong");
      }
    }
  };

  const handleSearchParams = (params: string, value: any) => {
    query.set(params, value);
    router.replace(`${pathname}?${query}`);
  };

  return (
    <Suspense>
      <div className="flex md:flex-row flex-col-reverse  md:min-h-[70vh] gap-6">
        <div className=" md:flex-[.5] w-full p-4 bg-white rounded-lg ">
          <p className="text-lg font-semibold">All Category</p>
          <div className=" space-y-4 mt-3">
            {categories
              ?.sort((a, b) => a.name.localeCompare(b.name))
              ?.map((value) => (
                <p
                  onClick={() => {
                    handleSearchParams("id", value?._id);
                    setCategory(value?.name);
                  }}
                  className=" p-3 hover:bg-purple-50 border-b border-zinc-200"
                  key={value._id}
                >
                  {value.name}
                </p>
              ))}
          </div>
        </div>
        <div className=" md:flex-1 w-full h-fit p-4 bg-white rounded-lg space-y-4 ">
          <p className=" text-lg font-semibold">
            {isEdit ? "Edit" : "Create"} Category
          </p>
          <InputField
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            labelName="Category Name"
            placeholder="Enter category name"
          />

          <div className="flex items-center gap-3">
            <Button onClick={SubmitCategory}>
              {isEdit ? "Edit" : "Create"} Category
            </Button>
            {isEdit && (
              <>
                <Button className=" bg-red-500" onClick={deleteCategory}>
                  Delete
                </Button>
                <Button
                  className=" bg-zinc-300 text-black"
                  onClick={() => {
                    handleSearchParams("id", "");
                    setCategory("");
                  }}
                >
                  <p className=" text-black">Clear</p>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Category;
