"use client";
import { useGetCategories } from "@/hooks/list-products-hooks";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import { Spinner } from "@heroui/react";
import Link from "next/link";

const CategoriesPage = () => {
  const { data: categoriesList, isPending , isError } = useGetCategories({
    limit: 100,
    page: 1,
  });
  if (isPending) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
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
    <div className="flex flex-col gap-10 container mx-auto py-10 pb-20 min-h-[60vh]">
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

        <BreadcrumbItem>دسته بندی ها </BreadcrumbItem>
      </Breadcrumbs>
      <div className="border-t-1  border-dashed dark:border-[#637381] border-gray-secondary-text-light flex-grow-1" />
      {categoriesList?.data.categories.map((item) => (
        <Link key={item._id} href={`/categories/${item._id}`}>
          <span className="text-xl font-semibold hover:underline">
            {item.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default CategoriesPage;
