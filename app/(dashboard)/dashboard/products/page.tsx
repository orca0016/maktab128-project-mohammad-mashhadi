"use client";
import ProductsListTable from "@/components/molecules/products-list-table";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import Link from "next/link";

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
        <ProductsListTable />
      </div>
    </div>
  );
};

export default ProductsListPage;
