"use client";

import Button from "@/component/Button";
import InputField from "@/component/InputField";
import { useFetch } from "@/hooks/useFetch";
import React, { Suspense, useState } from "react";
import { endpoints } from "../../../../libs/endpoints";
import { toast } from "react-toastify";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useGetAllCategory from "@/hooks/product/useGetAllCategory";

type CategoryType = {
  _id: string;
  name: string;
};

const CategoryComponent: React.FC = () => {
  const [category, setCategory] = useState<string>("");
  const { post, put, remove } = useFetch();
  const searchParams = useSearchParams(); // ✅ Now inside Suspense!
  const query = new URLSearchParams(searchParams?.toString() || "");
  const pathname = usePathname();
  const router = useRouter();
  const id = searchParams?.get("id") ?? "";
  const isEdit = Boolean(id);

  const { categories, refetch } = useGetAllCategory();

  const SubmitCategory = async () => {
    if (!category.trim()) return toast.error("Please enter a category name");

    try {
      const response = isEdit
        ? await put(`${endpoints.admin.category}/${id}`, { name: category })
        : await post(endpoints.admin.category, { name: category });

      if (response.success) {
        toast.success(response.data.message ?? "Category saved successfully");
        setCategory("");
        handleSearchParams("id", "");
        refetch();
      } else {
        toast.error(response.data ?? "Something went wrong");
      }
    } catch {
      toast.error("An error occurred while saving the category");
    }
  };

  const deleteCategory = async () => {
    if (isEdit && id) {
      try {
        const response = await remove(`${endpoints.admin.category}`, id);
        if (response.success) {
          toast.success(
            response.data.message ?? "Category deleted successfully"
          );
          setCategory("");
          handleSearchParams("id", "");
          refetch();
        } else {
          toast.error(response.data ?? "Something went wrong");
        }
      } catch {
        toast.error("An error occurred while deleting the category");
      }
    }
  };

  const handleSearchParams = (param: string, value: string) => {
    query.set(param, value);
    router.replace(`${pathname}?${query.toString()}`);
  };

  return (
    <div className="flex md:flex-row flex-col-reverse md:min-h-[70vh] gap-6">
      {/* Category List */}
      <div className="md:flex-[.5] w-full p-4 bg-white rounded-lg">
        <p className="text-lg font-semibold">All Categories</p>
        <div className="space-y-4 mt-3">
          {categories
            ?.sort((a: CategoryType, b: CategoryType) =>
              a.name.localeCompare(b.name)
            )
            ?.map((value: CategoryType) => (
              <p
                key={value._id}
                onClick={() => {
                  handleSearchParams("id", value._id);
                  setCategory(value.name);
                }}
                className="p-3 hover:bg-purple-50 border-b border-zinc-200 cursor-pointer"
              >
                {value.name}
              </p>
            ))}
        </div>
      </div>

      {/* Create/Edit Category Form */}
      <div className="md:flex-1 w-full h-fit p-4 bg-white rounded-lg space-y-4">
        <p className="text-lg font-semibold">
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
              <Button className="bg-red-500" onClick={deleteCategory}>
                Delete
              </Button>
              <Button
                className="bg-zinc-300 text-black"
                onClick={() => {
                  handleSearchParams("id", "");
                  setCategory("");
                }}
              >
                Clear
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ✅ Wrap in Suspense to fix "useSearchParams() should be wrapped in a Suspense boundary"
const Category: React.FC = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CategoryComponent />
    </Suspense>
  );
};

export default Category;
