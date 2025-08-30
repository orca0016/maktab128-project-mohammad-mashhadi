"use client";
import { SRC_BACK_END } from "@/helpers/local-paths";
import { useGetCategories } from "@/hooks/list-products-hooks";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import { Spinner } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const CategoriesPage = () => {
  const { data: categoriesList, isPending , isError } = useGetCategories({
    limit: 100,
    page: 1,
  });
  if (isPending) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Spinner label="درحال بارگذاری" color="secondary"  />
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
    <div className="flex flex-col gap-10 container mx-auto py-10 pb-20 min-h-[60vh] px-5">

      <Breadcrumbs
        size="lg"
        color="secondary"
        classNames={{
          base: "!text-black dark:text-white text-3xl",
        }}
      >
        <BreadcrumbItem>
          <Link href="/">صفحه اصلی</Link>
        </BreadcrumbItem>

        <BreadcrumbItem>دسته بندی ها </BreadcrumbItem>
      </Breadcrumbs>
      <div className="border-t-1   border-dashed dark:border-[#637381] border-gray-secondary-text-light flex-grow-1" />
      <div className="flex flex-wrap gap-6 justify-around ">

      {categoriesList?.data.categories.map((item) => (
        <Link key={item._id} href={`/categories/${item._id}`} className="flex w-fit flex-col items-center dark:border-[#637381] border-gray-secondary-text-light/30 border gap-4 px-4 py-2 rounded-lg shadow bg-white dark:bg-title-text-light">
            <Image src={`${SRC_BACK_END}/images/categories/icons/${item.icon}`} alt={item.name} width={200} height={200} />

          <span className="text-xl font-semibold hover:underline">
            {item.name}
          </span>
        </Link>
      ))}
      </div>

    </div>
  );
};

export default CategoriesPage;
