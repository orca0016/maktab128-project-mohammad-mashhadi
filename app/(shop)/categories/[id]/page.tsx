"use client";
import {
  useGetCategory,
  useGetSubCategories,
} from "@/hooks/list-products-hooks";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import { Spinner } from "@heroui/react";
import Link from "next/link";
import { useParams } from "next/navigation";

const SubCategoriesPage = () => {
  const params = useParams();
  const { id } = params;
  const { data: currentCategory } = useGetCategory({
    page: 1,
    limit: 1,
    currentC: id as string,
  });
  const {
    data: subCategoriesList,
    isPending,
    isError,
  } = useGetSubCategories({
    limit: 100,
    page: 1,
    category: id as string,
  });

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Spinner label="درحال بارگذاری" color="secondary" variant="gradient" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <h1 className="text-3xl text-center ">دسته بندی مورد نظر پیدا نشد .</h1>
      </div>
    );
  }
  return (
    <div className="flex flex-col  gap-10 container mx-auto py-10 min-h-[80vh]">
      <Breadcrumbs
        size="lg"
        color="secondary"
        classNames={{
          separator: "text-3xl px-6",
          base: "!text-black dark:text-white text-3xl",
        }}
      >
        <BreadcrumbItem>
          <Link href="/">صفحه اصلی</Link>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <Link href={"/categories"}>دسته بندی ها</Link>{" "}
        </BreadcrumbItem>
        <BreadcrumbItem>{currentCategory?.data.category.name} </BreadcrumbItem>
      </Breadcrumbs>
      <div className="flex flex-col gap-5">
        <div className="border-t-1  mb-20 border-dashed dark:border-[#637381] border-gray-secondary-text-light flex-grow-1" />

        {subCategoriesList?.data.subcategories.map((item) => (
          <Link key={item._id} href={`/products?subcategory=${item._id}`}>
            <span className="text-xl font-semibold hover:underline">
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubCategoriesPage;
