"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BiImageAdd } from "react-icons/bi";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFetch } from "@/hooks/useFetch";
import { useParams, useRouter } from "next/navigation";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { Switch } from "@mantine/core";
import { endpoints } from "../../../../libs/endpoints";
import { toast } from "react-toastify";
import InputField from "@/component/InputField";
import SelectField from "@/component/SelectField";
import Button from "@/component/Button";
import { useSidebarStore } from "../../../../store/sidebar";
import useGetAllCategory from "@/hooks/product/useGetAllCategory";
import { CldUploadWidget } from "next-cloudinary";
import { CldImage } from "next-cloudinary";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export const InventoryFormScheme = z.object({
  name: z
    .string({ message: "please provide product name" })
    .nonempty({ message: "please provide product name" }),
  categoryId: z
    .string({ message: "please provide product category" })
    .nonempty({ message: "please provide product category" }),
  description: z
    .string({ message: "please provide product description" })
    .nonempty({ message: "please provide product description" }),
  price: z.string({ message: "please provide product price" }),
  inStock: z.boolean().default(true),
  discountPrice: z.string().optional(),
});

type IFormScheme = z.infer<typeof InventoryFormScheme>;

const ProductForm = ({ isEdit = false }: { isEdit?: boolean }) => {
  const imageRef = useRef<any>(null);
  const [image, setImage] = useState<any[]>([]);
  const [imageSrc, setImageSrc] = useState<string[]>([]);
  const [imageIndex, setImageIndex] = useState(0);
  const { post, get, put, remove } = useFetch();
  const { push } = useRouter();
  const { id } = useParams();
  const { categories } = useGetAllCategory();
  console.log(imageSrc);
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<IFormScheme>({
    resolver: zodResolver(InventoryFormScheme),
  });

  const { data, refetch } = useQuery({
    queryKey: ["INVENTORY"],
    queryFn: async () => {
      const res = await get(`${endpoints.admin.product.getProduct}/${id}`);
      if (res.success) {
        return res.data.product;
      }
      return {};
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (isEdit && data) {
      Object.entries(data ?? {})?.map((inventory: any) => {
        setValue(inventory[0] as any, String(inventory[1]));
        if (inventory[0] == "imageUrl") {
          setImageSrc(inventory[1]);
        }
        if (inventory[0] == "inStock") {
          setValue("inStock", inventory[1]);
        }
      });
    } else {
      reset();
    }
  }, [data]);

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["CREATE-INVENTORY"],
    mutationFn: async (
      value: IFormScheme & { inStock: boolean; imageUrl: string[] }
    ) => {
      const response = await post(endpoints.admin.product.createProduct, value);
      if (response.success) {
        toast.success("Product created succesfully");
        // await handleImageUpload(response.data?.message?._id);
        push("/dashboard/product");
        return;
      } else {
        return toast.error(response.data ?? "Product creation failed");
      }
    },
  });
  const { mutateAsync: editInventory, isPending: isLoading } = useMutation({
    mutationKey: ["EDIT-INVENTORY"],
    mutationFn: async (
      value: IFormScheme & { inStock: boolean; imageUrl: string[] }
    ) => {
      const request = await put(
        `${endpoints.admin.product.editProduct}/${id}`,
        value
      );
      if (request.success) {
        toast.success("Product update succesfully");
        // await handleImageUpload(id as string);
        refetch();
        return;
      } else {
        return toast.error(request.data ?? "Product update failed");
      }
    },
  });
  const { mutateAsync: deleteInventory, isPending: isDeleting } = useMutation({
    mutationKey: ["DELETE-INVENTORY"],
    mutationFn: async () => {
      const request = await remove(
        `${endpoints.admin.product.deleteProduct}`,
        id as string
      );
      if (request.success) {
        toast.success("Product deleted succesfully");
        push("/dashboard/product");
        return;
      } else {
        return toast.error(request.data ?? "Product delete failed");
      }
    },
  });

  const validateFileType = (file: any) => {
    const fileTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    return fileTypes.includes(file?.type);
  };

  const removeImage = (
    imageIdx: number,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();

    setImageSrc((prev) => {
      const newImageArr = prev;
      return newImageArr.filter((_, index) => index != imageIdx);
    });
  };

  const handleCreateSubmit = (value: IFormScheme) => {
    if (!isEdit && imageSrc.length < 1) {
      return toast.error("Product image is required");
    }
    if (isEdit) {
      return editInventory({ ...value, imageUrl: imageSrc });
    }
    mutateAsync({ ...value, imageUrl: imageSrc });
  };

  const { setTitle } = useSidebarStore();

  useEffect(() => {
    isEdit ? setTitle("Edit Product") : setTitle("Create Product");
  }, []);

  useEffect(() => {
    console.log("Cloudinary Config:", {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    });
  }, []);

  const onSuccess = (result: any) => {
    console.log("=== UPLOAD SUCCESS ===");
    console.log("Success result:", result);
    const secureUrl = result.info.secure_url;
    console.log("Secure URL:", secureUrl);
    console.log("Current imageIndex:", imageIndex);

    setImageSrc((prev) => {
      const newArray = [...prev];
      newArray[imageIndex] = secureUrl;
      console.log("Updated imageSrc:", newArray);
      return newArray;
    });
    toast.success("Image uploaded successfully");
  };

  const onError = (error: any) => {
    console.error("=== UPLOAD ERROR ===", error);
    toast.error("Failed to upload image");
  };

  return (
    <div className="space-y-7">
      {/* <div className="text-[20px]">{isEdit ? "Edit" : "Add"} Product</div> */}

      <form
        onSubmit={handleSubmit(handleCreateSubmit)}
        className="min-h-screen w-full space-y-6 rounded-lg bg-white p-6 dark:bg-themeBg-50"
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              placeholder="Add product name"
              labelName="Product Name"
              errorMessage={errors.name?.message}
              required
            />
          )}
        />

        <div className="space-y-3">
          <p className="text-sm">
            Description
            <span className="text-red-500">*</span>
          </p>
          <MDEditor
            value={watch("description")}
            onChange={(value) => setValue("description", value ?? "")}
            preview="edit"
          />
          {errors?.description?.message && (
            <p className="!mt-1 text-sm text-error-400">
              {errors?.description.message}
            </p>
          )}
        </div>

        {/* <Controller
          name="role"
          control={control}
          render={({ field }) => (
        <InputField
          subLabel="(optional)"
          placeholder="Add product specification"
          labelName="Product specification"
        /> */}

        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <SelectField
              data={
                categories?.map((category) => ({
                  value: category?._id,
                  label: category?.name,
                })) as any[]
              }
              {...field}
              placeholder="product category"
              label="Product category"
              errorMessage={errors.categoryId?.message}
              required
            />
          )}
        />

        <div>
          <div>
            <div className="flex flex-wrap items-center gap-4">
              {Array(3)
                .fill(0)
                ?.map((_, index) => (
                  <div
                    key={index}
                    className={`group h-[80px] w-[80px] border rounded-lg relative ${
                      imageIndex === index
                        ? "border-indigo-400"
                        : "border-neutral-200"
                    }`}
                  >
                    {imageSrc[index] ? (
                      <>
                        <CldImage
                          width="80"
                          height="80"
                          src={imageSrc[index]}
                          alt="Product image"
                          className="h-[80px] w-[80px] rounded-lg object-cover"
                        />
                        <div
                          onClick={(e) => removeImage(index, e)}
                          className="absolute -right-0 bottom-[-2px] hidden rounded-full border text-primary-400 group-hover:block dark:border-white"
                        >
                          <IoRemoveCircle
                            className="absolute -right-3 bottom-[-20px] text-red-400"
                            size={30}
                          />
                        </div>
                      </>
                    ) : (
                      <CldUploadWidget
                        uploadPreset={
                          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                        }
                        onSuccess={onSuccess}
                        onError={onError}
                        onOpen={() => console.log("Widget opened")}
                        onClose={() => console.log("Widget closed")}
                        options={{
                          maxFiles: 1,
                          sources: ["local", "url", "camera"],
                          resourceType: "image",
                          clientAllowedFormats: ["image"],
                          maxFileSize: 2000000, // 2MB
                          cloudName:
                            process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
                          showAdvancedOptions: false,
                          showSkipCropButton: false,
                          showPoweredBy: false,
                          styles: {
                            palette: {
                              window: "#FFFFFF",
                              windowBorder: "#90A0B3",
                              tabIcon: "#0078FF",
                              menuIcons: "#5A616A",
                              textDark: "#000000",
                              textLight: "#FFFFFF",
                              link: "#0078FF",
                              action: "#FF620C",
                              inactiveTabIcon: "#0E2F5A",
                              error: "#F44235",
                              inProgress: "#0078FF",
                              complete: "#20B832",
                              sourceBg: "#E4EBF1",
                            },
                          },
                        }}
                      >
                        {({ open, cloudinary }) => {
                          const handleClick = () => {
                            console.log("Opening widget for index:", index);
                            setImageIndex(index);
                            if (cloudinary) {
                              console.log("Cloudinary instance available");
                            }
                            open();
                          };
                          return (
                            <div
                              onClick={handleClick}
                              className="flex h-full w-full cursor-pointer items-center justify-center"
                            >
                              <BiImageAdd size={24} className="text-gray-400" />
                            </div>
                          );
                        }}
                      </CldUploadWidget>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <p className="border-b py-3 text-lg font-semibold dark:border-neutral-200">
            Pricing
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <InputField
                  {...field}
                  placeholder="0"
                  labelName="Product Price"
                  errorMessage={errors.price?.message}
                  required
                  type="number"
                />
              )}
            />
            <Controller
              name="discountPrice"
              control={control}
              render={({ field }) => (
                <InputField
                  {...field}
                  placeholder="0"
                  labelName="Product Discount Price"
                  subLabel="(optional)"
                  type="number"
                />
              )}
            />
          </div>
        </div>
        <Controller
          name="inStock"
          control={control}
          render={({ field }) => (
            <Switch {...(field as any)} label={"Product in stock"} />
          )}
        />

        <div className="flex justify-end gap-x-4">
          {isEdit && (
            <Button
              onClick={() => deleteInventory()}
              disabled={isDeleting}
              className="!border-none bg-red-500"
            >
              Delete
            </Button>
          )}
          <Button
            type="submit"
            className=" bg-purple-500 "
            disabled={isPending || isLoading}
          >
            Save changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
