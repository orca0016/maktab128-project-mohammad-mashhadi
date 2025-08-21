import { useGenerateCartProductTable } from "@/components/atoms/cart-table-cell-list";
import { useCart } from "@/hooks/use-cart";
import { useDisclosure } from "@heroui/react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { useState } from "react";
import DeleteModalProductCart from "./modal-delete-product-cart";

const CartProductList = () => {
  const { productCart } = useCart();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const [currentDeleteProduct, setCurrentDeleteProduct] = useState<
    string | null
  >(null);

  const renderCell = useGenerateCartProductTable({
    onOpenDelete,
    setCurrentDeleteProduct,
  });

  return (
    <div>
      <DeleteModalProductCart
        currentDelete={currentDeleteProduct}
        isOpen={isOpenDelete}
        onOpen={onOpenDelete}
        onClose={onCloseDelete}
      />
      <Table
      removeWrapper
        classNames={{
          base:'max-w-full overflow-x-auto',
          wrapper: "shadow-none",
          td: "border-b border-[#E9ECEE] dark:border-[#2D353C]",
          th:'dark:bg-[#2D353C]',
        }}
        isHeaderSticky
        aria-label="cart product list table"
      >
        <TableHeader>
          <TableColumn key="name">اسم محصول</TableColumn>
          <TableColumn key="qty">تعداد</TableColumn>
          <TableColumn key="subtotal">مجموع قیمت</TableColumn>
          <TableColumn key="action">فرمان ها</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={
            <h1 className="text-3xl text-center py-30">
              هیج محصولی پیدا نشد .
            </h1>
          }
          items={productCart}
        >
          {(item) => (
            <TableRow key={item.product._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CartProductList;
