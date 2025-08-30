import { useCart } from "@/hooks/use-cart";
import { separateNumbers } from "@/lib/seperator-numbers";
import { Button } from "@heroui/button";
import Link from "next/link";
import { useMemo } from "react";

export function calculatePercentage(
  percentage: number,
  number: number
): number {
  return (percentage / 100) * number;
}
const SidebarCartPage: React.FC<{ isCheckout?: boolean }> = ({
  isCheckout,
}) => {

  const { productCart } = useCart();
  const productList = useMemo(
    () => (productCart?.products ? productCart.products : []),
    [productCart]
  );
  const totalPrice = useMemo(() => {
    const price = productList.map((item) => item.data.price * item.quantity);
    return price.reduce((price, currentPrice) => price + currentPrice, 0);
  }, [productList]);

  const percentage = 7;
  const shippingCost = 100000;
  const finalPrice =
    totalPrice + calculatePercentage(percentage, totalPrice) + shippingCost;
  return (
    <div
      className={`${
        !productCart.products.length && "blur-xs"
      } border-1 border-[#E5E8EB] dark:border-[#2F373F] px-5 py-6 rounded-xl text-title-text-light dark:text-white`}
    >
      <h1 className="text-lg font-semibold">جزییات سبد خرید</h1>
      <section className="space-y-5 py-5">
        <div className="flex justify-between">
          <span className="font-semibold">مجموع:</span>
          <span>{separateNumbers(totalPrice)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">هزینه ارسال:</span>
          <span>{separateNumbers(shippingCost)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">مالیات:</span>
          <span>{separateNumbers(percentage)}٪</span>
        </div>
      </section>
      <div className="border-t-1  border-dashed dark:border-[#637381] border-gray-secondary-text-light flex-grow-1" />
      <section className="space-y-5 py-5 flex justify-between">
        <span>قیمت نهایی:</span>
        <span>{separateNumbers(finalPrice)}</span>
      </section>
      <Link href="/checkout" className={isCheckout ? "hidden" : ""}>
        <Button
          disabled={
            productCart?.products ? productCart.products.length === 0 : true
          }
          className={` py-5 bg-title-text-light text-white dark:bg-white dark:text-title-text-light w-full font-semibold`}
        >
          تسویه حساب

        </Button>
      </Link>
    </div>
  );
};

export default SidebarCartPage;
