"use client";
import EntitiesProductListTable from "@/components/molecules/entities-product-list-table";
import { queryClient } from "@/context/query-provider";
import { axiosInstanceBackEnd } from "@/lib/axios-instance";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { MdOutlineDone } from "react-icons/md";

const ProductsEntityListPage = () => {
  const [selectedKeys, setSelectedKeys] = useState<
    Record<string, Partial<IProduct>>
  >({});

  const sendEntity = useMutation({
    mutationFn: async ({
      ProductId,
      data,
    }: {
      ProductId: string;
      data: { price?: string; quantity?: string };
    }) => axiosInstanceBackEnd().patch(`/api/products/${ProductId}`, data),
    mutationKey: ["products-list-entity"],
    onError: () => {
      addToast({
        title: "مشکلی پیش امد.",
        description: "مشکلی غیر منتظره پیش امد . ",
        color: "danger",
      });
    },
  });

  const allChanges = Object.keys(selectedKeys).map((item) => ({
    productId: item,
    ...selectedKeys[item],
  }));

  const submitChanges = async () => {
    try {
      await Promise.all(
        allChanges.map((item) =>
          sendEntity.mutate({
            ProductId: item.productId,
            data: {
              price: item.price !== undefined ? String(item.price) : undefined,
              quantity:
                item.quantity !== undefined ? String(item.quantity) : undefined,
            },
          })
        )
      );
      setSelectedKeys({});
      addToast({
        title: "موفق بود.",
        description: "اطلاعات با موفقیت اپدیت شد .",
        color: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["product-list"] });
    } catch (error) {
      console.error("Error during parallel mutations:", error);
      addToast({
        title: "مشکلی پیش امد.",
        description: "مشکلی غیر منتظره پیش امد . ",
        color: "danger",
      });
    }
  };

  return (
    <div className="">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold mb-2">لیست موجودیت ها</h1>
        <Button
          isDisabled={Object.keys(selectedKeys).length === 0}
          isLoading={sendEntity.isPending}
          onPress={submitChanges}
          color="default"
          className="bg-title-text-light text-white dark:bg-white dark:text-title-text-light font-semibold"
        >
          ثبت اطلاعات
          <MdOutlineDone size={'1.4rem'} />
        </Button>
      </div>
      <Breadcrumbs color="secondary" size="md" >
        <BreadcrumbItem>
          <Link href="/dashboard">داشبورد</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link href="/dashboard/products">محصولات</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>موجودیت ها</BreadcrumbItem>
      </Breadcrumbs>
      <div className="max-w-[1200px] mx-auto my-11">
        <EntitiesProductListTable
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
        />
      </div>
    </div>
  );
};

export default ProductsEntityListPage;
