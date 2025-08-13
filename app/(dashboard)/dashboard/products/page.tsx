"use client";
import ProductsListTable from "@/components/atoms/products-list-table";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import Link from "next/link";
import { Suspense } from "react";

const ProductsListPage = () => {
  return (
    <div className="">
      <h1 className="text-2xl font-semibold mb-2">لیست محصولات</h1>
      <Breadcrumbs color="secondary" size="md" separator=".">
        <BreadcrumbItem>
          <Link href="/dashboard">داشبورد</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>محصولات</BreadcrumbItem>
      </Breadcrumbs>
      <div className="max-w-[1200px] mx-auto my-11">
        <Suspense fallback={<p>Loading feed...</p>}>
          <ProductsListTable/>
        </Suspense>
      </div>
    </div>
  );
};

export default ProductsListPage;
