"use client";
import FormCheckout from "@/components/molecules/form-checkout";
import SidebarCartPage from "@/components/ui/cart/sidebar-cart-page";
import { useCart } from "@/hooks/use-cart";
import { axiosInstanceBackEnd } from "@/lib/axios-instance";
import { separateNumbers } from "@/lib/seperator-numbers";
import { Spinner } from "@heroui/react";
import { addToast } from "@heroui/toast";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const CheckoutPage = () => {
  const router = useRouter();
  const pathName = usePathname();
  const { productCart } = useCart();
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("user-id") : null;
  const { data, isPending, isError } = useQuery<IResponseSingleUser>({
    queryKey: ["get-user-data"],
    enabled: !!userId,
    queryFn: async () => {
      return await axiosInstanceBackEnd()
        .get(`/api/users/${userId}`)
        .then((res) => res.data);
    },
  });
  useEffect(() => {
    if (productCart.length === 0) {
      router.push("/");
      addToast({
        title: "ابتدا چند محصول را در سبد خرید قرار دهید",
        color: "danger",
      });
    }
  }, [router, productCart]);

  useEffect(() => {
    const userId = localStorage.getItem("user-id");
    const accessToken = localStorage.getItem("access-token");
    if (!userId || !accessToken) {
      router.push("/login");
      addToast({
        title: "ابدا وارد شوید .",
        color: "danger",
      });
    }
  }, [router]);

  useEffect(() => {
    if (isPending) return;
    if (isError) {
      addToast({
        title: "ابتدا وارد شوید .",
        color: "danger",
      });
      router.push("/login");
    }
  }, [pathName, router, isPending, isError]);

  if (isError) {
    return (
      <div className="w-full h-screen bg-slate-100  dark:bg-title-text-light flex items-center justify-center">
        <h1 className="text-5xl font-semibold text-center">مشکلی پیش امد .</h1>
      </div>
    );
  }
  if (isPending) {
    return (
      <div className="w-full h-screen bg-slate-100  dark:bg-title-text-light flex items-center justify-center">
        <Spinner
          color="secondary"
          classNames={{ label: "!text-title-text-light dark:!text-slate-100" }}
          label="درحال بارگذاری..."
          size="lg"
        />
      </div>
    );
  }
  return (
    <div>
      <div className="container mx-auto min-h-[50vh] py-10 px-6 md:px-0">
        <h1 className="text-3xl font-semibold text-center md:text-right w-full">
           تسویه و سفارش
          ({separateNumbers(productCart.length)})
          محصول
        </h1>
        <div className="grid grid-cols-4 gap-3 w-full  pt-10 h-full">
          <div className="col-span-4 md:col-span-3">
            <FormCheckout userData={data.data.user} />
          </div>
          <div className="col-span-4 md:col-span-1 ">
            <SidebarCartPage isCheckout />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
