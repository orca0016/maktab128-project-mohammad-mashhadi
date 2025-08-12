"use client";

import { axiosInstanceBackEnd } from "@/lib/axios-instance";
import {
  addNewProductSchema,
  AddNewProductSchemaType,
} from "@/validations/add-new-product-schema";
import {
  addToast,
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
} from "@heroui/react";

import { queryClient } from "@/context/query-provider";
import { useCategories, useSubcategories } from "@/hooks/add-products-hooks";
import { productFormDataBuilder } from "@/lib/form-data-builder";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import DropzoneInput from "../atoms/dropzone-input";
import TextEditor from "../atoms/rich-text-editor";

const AddNewProductForm = () => {
  const { control, handleSubmit, setValue, watch, reset } =
    useForm<AddNewProductSchemaType>({
      resolver: zodResolver(addNewProductSchema),
    });

  const categoryId = watch("category");

  const categoryList = useCategories();

  const subCategoryList = useSubcategories(categoryId);

  const createProduct = useMutation({
    mutationFn: async (data: FormData) =>
      await axiosInstanceBackEnd().post("/api/products/", data, {
        headers: {
          credentials: true,
        },
      }),
    onSuccess: () => {
      reset({
        price: "",
        name: "",
        brand: "",
        images: [],
        quantity: "",
        category: "",
        description: "",
        thumbnail: null,
        subcategory: "",
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      addToast({
        title: "موفق بود.",
        description: "محصول موردنظر با موفقیت اضافه شد .",
        color: "success",
      });
    },
    onError: (e) => {
      console.log(e);
      addToast({
        title: "خطا در ثبت محصول",
        description: e?.message ?? "خطای نامشخص",
        color: "danger",
        variant: "flat",
      });
    },
  });

  const onSubmit: SubmitHandler<AddNewProductSchemaType> = (data) => {
    createProduct.mutate(productFormDataBuilder(data));
  };

  const categoriesData: ICategory[] = useMemo(
    () => categoryList?.data?.data.categories ?? [],
    [categoryList]
  );

  const subCategoryData: ISubCategory[] = useMemo(
    () => subCategoryList?.data?.data.subcategories ?? [],
    [subCategoryList]
  );

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Card className="text-title-text-light dark:bg-[#1C252E] dark:text-white">
        <CardHeader className="flex gap-3">
          <h1 className="text-2xl font-semibold py-5">
            جزییات محصول را وارد کنید
          </h1>
        </CardHeader>
        <Divider />

        <CardBody className="space-y-5">
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                type="text"
                label="اسم "
                variant="bordered"
                classNames={{
                  inputWrapper: "border-1",
                  errorMessage: "text-right",
                }}
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="brand"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                type="text"
                label="برند محصول "
                variant="bordered"
                classNames={{
                  inputWrapper: "border-1",
                  errorMessage: "text-right",
                }}
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Controller
              name="quantity"
              control={control}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  type="text"
                  variant="bordered"
                  label="تعداد  "
                  classNames={{
                    inputWrapper: "border-1",
                    errorMessage: "text-right",
                  }}
                  isInvalid={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="price"
              control={control}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  type="text"
                  variant="bordered"
                  label="قیمت "
                  classNames={{
                    inputWrapper: "border-1",
                    errorMessage: "text-right",
                  }}
                  isInvalid={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="category"
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <>
                    <Autocomplete
                      {...field}
                      label="دسته بندی "
                      variant="bordered"
                      items={categoriesData}
                      className="text-right"
                      selectedKey={field.value}
                      isInvalid={!!fieldState.error}
                      isLoading={categoryList.isPending}
                      errorMessage={fieldState.error?.message}
                      onSelectionChange={(key) => field.onChange(key)}
                      classNames={{ popoverContent: "bg-shadow-drawer" }}
                      listboxProps={{
                        emptyContent: categoryList.isPending
                          ? "در حال بارگذاری..."
                          : "هیچ دسته‌بندی پیدا نشد",
                      }}
                    >
                      {(item) => (
                        <AutocompleteItem
                          key={item._id}
                          textValue={item.name}
                          className="capitalize"
                        >
                          {item.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  </>
                );
              }}
            />
            <Controller
              name="subcategory"
              control={control}
              render={({ field, fieldState }) => (
                <Autocomplete
                  {...field}
                  listboxProps={{
                    emptyContent:
                      categoryList.isPending || subCategoryList.isPending
                        ? "در حال بارگذاری..."
                        : "هیچ زیر مجموعه ای برای این دسته‌بندی پیدا نشد",
                  }}
                  variant="bordered"
                  className="text-right"
                  isDisabled={!categoryId}
                  selectedKey={field.value}
                  items={subCategoryData}
                  label="زیر مجموعه دسته بندی "
                  isInvalid={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                  onSelectionChange={(key) => field.onChange(key)}
                  classNames={{ popoverContent: "bg-shadow-drawer" }}
                  isLoading={
                    categoryList.isPending || subCategoryList.isPending
                  }
                >
                  {(item) => (
                    <AutocompleteItem
                      key={item._id}
                      textValue={item.name}
                      className="capitalize"
                    >
                      {item.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            />
          </div>
          <Controller
            name="images"
            control={control}
            render={({ field, fieldState }) => (
              <DropzoneInput
                multiple={true}
                value={field.value}
                setValue={setValue}
                title="عکس ها"
                onChange={field.onChange}
                messageError={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <TextEditor
                value={field.value}
                title="توضیحات "
                onChange={field.onChange}
                messageError={fieldState.error?.message}
              />
            )}
          />
        </CardBody>
        <Divider />
        <CardFooter>
          <Button
            type="submit"
            size="lg"
            variant="solid"
            isDisabled={createProduct.isPending}
            isLoading={createProduct.isPending}
            className="bg-title-text-light text-white dark:bg-white dark:text-title-text-light font-semibold"
          >
            ساخت محصول
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default AddNewProductForm;
