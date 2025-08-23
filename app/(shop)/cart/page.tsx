"use client";

import CartProductList from "@/components/ui/cart/cart-product-list";
import SidebarCartPage from "@/components/ui/cart/sidebar-cart-page";
import { useCart } from "@/hooks/use-cart";
import { separateNumbers } from "@/lib/seperator-numbers";

const CartPage = () => {
  const { productCart } = useCart();
  return (
    <div className="container mx-auto min-h-[50vh] py-10 px-6 md:px-0">
      <h1 className="text-3xl font-semibold text-center md:text-right w-full">
       ({separateNumbers(productCart.length)}) سبد خرید
      </h1>
      <div className="grid grid-cols-4 gap-3 w-full  pt-10 h-full">
        <div className="col-span-4 md:col-span-3">
            <CartProductList/>            
        </div>
        <div className="col-span-4 md:col-span-1 "><SidebarCartPage/></div>
      </div>
    </div>
  );
};

export default CartPage;
