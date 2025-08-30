"use client";
import OrdersListTable from "@/components/molecules/orders-list-table";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import Link from "next/link";

const OrdersListPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">لیست سفارش ها</h1>
      <Breadcrumbs color="secondary" size="md" >
        <BreadcrumbItem>
          <Link href="/dashboard">داشبورد</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>سفارشات</BreadcrumbItem>
      </Breadcrumbs>
      <div className="max-w-[1200px] mx-auto my-11">
        <OrdersListTable />
      </div>
    </div>
  );
};

export default OrdersListPage;
