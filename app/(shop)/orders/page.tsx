"use client";

import { convertDate } from "@/helpers/miladi-to-shamsi";
import { axiosInstanceBackEnd } from "@/lib/axios-instance";
import { separateNumbers } from "@/lib/seperator-numbers";
import { Chip } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { BsBoxSeam } from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";

const OrderCard: React.FC<{ order: IOrder }> = ({ order }) => {
  const totalProducts = order.products.reduce(
    (prev, value) => prev + value.count,
    0
  );
  return (
    <div className="bg-white dark:bg-gray-dark shadow-2xl rounded-2xl py-6">
      <div className="flex flex-col-reverse md:flex-row w-full gap-4 justify-between px-4 py-2">
        <div className="space-x-3 font-semibold text-md md:text-2xl">
          <span>سفارش:</span>
          <span>#{order._id.slice(0 , 10)}...</span>
        </div>
        <div>
          {order.deliveryStatus ? (
            <Chip
              color="success"
              size="lg"
              endContent={<FaCheck size={18} />}
              variant="shadow"
            >
              دریافت شده
            </Chip>
          ) : (
            <Chip
              size="lg"
              color="warning"
              endContent={<TbTruckDelivery size={18} />}
              variant="shadow"
            >
              درحال ارسال
            </Chip>
          )}
        </div>
      </div>
      <div className="flex gap-6 flex-wrap justify-around px-10 py-4">
        <div className="flex flex-col gap-3">
          <span>تاریخ سفارش:</span>
          <span className="font-semibold">
            {convertDate(order.createdAt).jalaliDate}
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <span>تاریخ تحویل:</span>
          <span className="font-semibold">
            {convertDate(order.deliveryDate).jalaliDate}
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <span>تعداد اقلام:</span>
          <span className="font-semibold">
            {separateNumbers(totalProducts)}
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <span>مبلغ کل:</span>
          <span className="font-semibold">
            {separateNumbers(order.totalPrice)}
          </span>
        </div>
      </div>
    </div>
  );
};

const OrderPage = () => {
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("user-id") : null;

  const { data: orders , isLoading } = useQuery<IResponseOrders>({
    queryKey: ["orders-list"],
    enabled: !!userId,
    queryFn: async () =>
      await axiosInstanceBackEnd()
        .get(`/api/orders?user=${userId}`)
        .then((res) => res.data),
  });

  return (
    <div className="mx-6 md:mx-0 w-full flex flex-col gap-4 border dark:border-gray-secondary-text-light border-gray-300 shadow-2xl rounded-4xl ">
      <div className="text-3xl flex px-6 gap-4 font-semibold py-8">
        <BsBoxSeam />
        <h1 className="text-center md:text-right">تاریخچه تمام سفارشات</h1>
      </div>
      <div className="flex flex-col gap-4 px-4 py-3 rounded-b-4xl   dark:bg-gray-secondary-text-light bg-gray-300">
        {orders?.data.orders.length ? (
          orders?.data.orders.map((item) => (
            <OrderCard order={item} key={item._id} />
          ))
        ) : (
          <h1 className="py-30 text-3xl font-semibold text-center">
            {isLoading?'درحال بارگذاری...':'سفارش پیدا نشد '}
          </h1>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
