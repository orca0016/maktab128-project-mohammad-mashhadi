import { SRC_BACK_END } from "@/helpers/local-paths";
import { useCart } from "@/hooks/use-cart";
import { separateNumbers } from "@/lib/seperator-numbers";
import { Button, ButtonGroup } from "@heroui/button";
import { Tooltip } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import { FaMinus, FaPlus, FaRegTrashCan } from "react-icons/fa6";
import RatingStars from "./rating-star-product";
export type cartItem = {
  quantity: number;
  data: ISingleProduct;
  _id: string;
};
export const useGenerateCartProductTable = ({
  onOpenDelete,
  setCurrentDeleteProduct,
}: {
  onOpenDelete: () => void;
  setCurrentDeleteProduct: (value: string | null) => void;
}) => {
  const { addToCart} = useCart();

  return useCallback(
    (cart: cartItem, columnKey: React.Key) => {
      const cellValue = cart[columnKey as keyof cartItem];

      switch (columnKey) {
        case "subtotal":
          return (
            <div>{separateNumbers(cart.data.price * cart.quantity)}</div>
          );
        case "action":
          return (
            <div>
              <Tooltip color="danger" content="حذف محصول">
                <Button
                  isIconOnly
                  variant="light"
                  onPress={() => {
                    onOpenDelete();
                    setCurrentDeleteProduct(cart.data._id);
                  }}
                  className="text-lg  cursor-pointer active:opacity-50"
                >
                  <FaRegTrashCan />
                </Button>
              </Tooltip>
            </div>
          );

        case "qty": {
          return (
            <div>
              <ButtonGroup
                size="sm"
                isIconOnly
                color="default"
                variant="bordered"
              >
                <Button
                  className="border-1 border-[#E5E8EB] dark:border-[#2F373F] border-l-0 text-title-text-light dark:text-white"
                  disabled={cart.quantity === 1}
                  onPress={() => addToCart(cart.data, cart.quantity - 1)}
                >
                  <FaMinus />
                </Button>
                <Button
                  className="border-x-0 bg-[#E5E8EB] dark:bg-[#2F373F] text-title-text-light dark:text-white"
                  variant="bordered"
                >
                  {separateNumbers(cart.quantity)}
                </Button>
                <Button
                  isIconOnly
                  disabled={cart.quantity === cart.data.quantity}
                  className="border-1 border-[#E5E8EB] dark:border-[#2F373F] border-r-0 text-title-text-light dark:text-white"
                  onPress={() => addToCart(cart.data, cart.quantity + 1)}
                >
                  <FaPlus />
                </Button>
              </ButtonGroup>
            </div>
          );
        }

        case "name":
          return (
            <div className="flex gap-3">
              <Image
                src={`${SRC_BACK_END}/images/products/thumbnails/${cart.data.thumbnail}`}
                alt="thumbnail cart"
                width={100}
                height={100}
                className="bg-[#F4F6F8] dark:bg-[#28323D] rounded-lg p-4 hidden md:block"
              />
              <div className="py-3 space-y-3 flex flex-col gap-5">
                <Link href={`/products/${cart.data._id}`}>
                  {cart.data.name}
                </Link>
                <RatingStars
                  totalScore={cart.data.rating.rate}
                  totalVotes={cart.data.rating.count}
                />
              </div>
            </div>
          );

        default:
          if (
            typeof cellValue === "string" ||
            typeof cellValue === "number" ||
            typeof cellValue === "boolean" ||
            cellValue === null ||
            cellValue === undefined
          ) {
            return cellValue;
          }
          return <span>{JSON.stringify(cellValue)}</span>;
      }
    },
    [addToCart, onOpenDelete, setCurrentDeleteProduct]
  );
};
