"use client";
import { useCart } from "@/hooks/use-cart";
import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CheckoutLayout = ({ children }: { children: React.ReactNode }) => {
  const { productCart } = useCart();
  const router = useRouter();
  useEffect(() => {
    if(productCart.userId==="")return
    if (productCart.products.length === 0) {
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

  return (
    <div className="pt-16 dark:bg-gray-dark  bg-gray-light text-gray-dark dark:text-white">
      {children}
    </div>
  );
};
export default CheckoutLayout;
