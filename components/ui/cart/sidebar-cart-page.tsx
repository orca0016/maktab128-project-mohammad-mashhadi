import { useCart } from "@/hooks/use-cart";
import { separateNumbers } from "@/lib/seperator-numbers";
import { Button } from "@heroui/button";
import { useMemo } from "react";

function calculatePercentage(percentage: number, number: number): number {
  return (percentage / 100) * number;
}
const SidebarCartPage = () => {
  const { productCart } = useCart();
  const totalPrice = useMemo(() => {
    const price = productCart.map((item) => item.product.price * item.quantity);
    return price.reduce((price, currentPrice) => price + currentPrice, 0);
  }, [productCart]);

  const percentage = 7;
  const shippingCost = 100000;
  const finalPrice =
    totalPrice + calculatePercentage(percentage, totalPrice) + shippingCost;
  return (
    <div className={`${productCart.length===0 && 'blur-xs'} border-1 border-[#E5E8EB] dark:border-[#2F373F] px-5 py-6 rounded-xl text-title-text-light dark:text-white`}>
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
      <Button disabled={productCart.length===0} className="py-5 bg-title-text-light text-white dark:bg-white dark:text-title-text-light w-full font-semibold">تسویه حساب</Button>
    </div>
  );
};

export default SidebarCartPage;
