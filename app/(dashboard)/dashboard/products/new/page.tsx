"use client";
import AddNewProductForm from "@/components/molecules/add-new-product-form";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import Link from "next/link";
import React, { Suspense } from "react";

const AddNewProductPage = () => {
  return (
    <div className="">
      <h1 className="text-2xl font-semibold mb-2">اضافه کردن محصول جدید</h1>
      <Breadcrumbs color="secondary" size="md" separator=".">
        <BreadcrumbItem>
          <Link href="/dashboard">داشبورد</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link href="/dashboard/products">محصولات</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>اضافه کردن</BreadcrumbItem>
      </Breadcrumbs>
      <div className="max-w-[720px] mx-auto my-11">
        <Suspense fallback={<p>Loading feed...</p>}>
        <AddNewProductForm />
            </Suspense>
      </div>
    </div>
  );
};

export default AddNewProductPage;
