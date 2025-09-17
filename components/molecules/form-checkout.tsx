"use client";

import { useCart } from "@/hooks/use-cart";
import { axiosInstanceBackEnd } from "@/lib/axios-instance";
import {
  checkoutFormSchema,
  checkoutFormSchemaType,
} from "@/validations/checkout-form-schema";
import { addToast, Button, Input, Textarea } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import { calculatePercentage } from "../ui/cart/sidebar-cart-page";
import { SRC_FRONTEND } from "@/helpers/local-paths";

const FormCheckout: React.FC<{ userData: ISingleUser }> = ({ userData }) => {
  const { productCart } = useCart();

  const { control, handleSubmit } = useForm<checkoutFormSchemaType>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firtname: userData.firstname,
      lastname: userData.lastname,
      address: userData.address,
      phoneNumber: userData.phoneNumber,
    },
  });
  const totalPrice = productCart.products.reduce(
    (prev, item) => (prev += item.data.price * item.quantity),
    0
  );

  const percentage = 7;
  const shippingCost = 100000;
  const finalPrice =
    totalPrice + calculatePercentage(percentage, totalPrice) + shippingCost;

  const redirectToPayment = useMutation({
    mutationFn: async (orderId: string) =>
      await fetch(`${SRC_FRONTEND}/api/peyment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: finalPrice * 10,
          callbackUrl: `${SRC_FRONTEND}/verify`,
          orderId,
        }),
      }).then((res) => res.json()),
    onSuccess: (res) => {
      window.location.href = `https://gateway.zibal.ir/start/${res.trackId}`;
    },
    onError: (e) => {
      addToast({
        title: "مشکلی پیش امد.",
        description: e.message,
        color: "danger",
      });
    },
  });

  const submitOrder = useMutation({
    mutationFn: async (data: checkoutFormSchemaType) =>
      await axiosInstanceBackEnd()
        .post("/api/orders", {
          user: userData._id,
          products: productCart.products.map((item) => ({
            count: item.quantity,
            product: item.data._id,
          })),
          deliveryDate: data.deliveryDate,
          deliveryStatus: false,
          payed: false,
        })
        .then((res) => res.data),
    onSuccess: (res: IResponseSingleOrder) => {
      if (res.data) redirectToPayment.mutate(res.data.order._id);
      addToast({
        title: "سفارش ثبت شد .",
        description: "درحال فرستادن شما به درگاه پرداخت",
        color: "success",
        promise: new Promise((resolve) => setTimeout(resolve, 5000)),
      });
    },
    onError: (e) => {
      addToast({
        title: "مشکلی پیش امد.",
        description: e.message,
        color: "danger",
      });
    },
  });

  const onSubmit = async (data: checkoutFormSchemaType) => {
    submitOrder.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Controller
          name="firtname"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              type="text"
              label="اسم "
              disabled={true}
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
          name="lastname"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              type="text"
              disabled={true}
              label="نام خانوادگی"
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
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Controller
          name="phoneNumber"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              type="text"
              disabled={true}
              variant="bordered"
              classNames={{
                inputWrapper: "border-1",
                errorMessage: "text-right",
              }}
              isInvalid={!!fieldState.error}
              label="شماره تماس (جهت هماهنگی)"
              errorMessage={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="deliveryDate"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <div className="w-full grid grid-cols-1">
              <DatePicker
                id="deliveryDate"
                calendar={persian}
                locale={persian_fa}
                minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
                value={field.value ? new Date(field.value) : null}
                onChange={(date) => {
                  if (date) {
                    field.onChange(date.toDate().toISOString());
                  } else {
                    field.onChange(null);
                  }
                }}
                placeholder="تاریخ دریافت مرسوله"
                inputClass={`${
                  fieldState.error ? "border-red-500" : "border-gray-500"
                } w-full h-full py-3 rounded-xl px-4 border `}
                className="border p-2 rounded-lg w-full h-full"
              />
              <p
                className={`${
                  fieldState.error ? "block" : "hidden"
                } text-red-500 text-xs`}
              >
                {fieldState.error?.message}
              </p>
            </div>
          )}
        />
      </div>
      <Controller
        name="lastname"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState }) => (
          <Textarea
            {...field}
            type="text"
            label="آدرس "
            variant={"bordered"}
            isInvalid={!!fieldState.error}
            classNames={{ inputWrapper: "border-1" }}
            errorMessage={fieldState.error?.message}
            disabled={true}
          />
        )}
      />

      <Button
        isLoading={submitOrder.isPending}
        disabled={submitOrder.isPending}
        type="submit"
        className={`py-5 bg-title-text-light text-white dark:bg-white dark:text-title-text-light w-full font-semibold`}
      >
        ثبت نهایی و پرداخت
      </Button>
    </form>
  );
};

export default FormCheckout;
