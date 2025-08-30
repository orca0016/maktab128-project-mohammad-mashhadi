import { queryClient } from "@/context/query-provider";
import { SRC_BACK_END } from "@/helpers/local-paths";
import { separateNumbers } from "@/lib/seperator-numbers";
import { Tooltip } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { SetStateAction, useCallback } from "react";
import { FaRegEye, FaRegTrashCan } from "react-icons/fa6";
import { TbEdit } from "react-icons/tb";

export const useGenerateProductsTableCells = ({
  categoryReCords,
  subCategoryReCords,
  onOpenEdit,
  onOpenDelete,
  setCurrentDeleteProduct,
}: {
  categoryReCords: {
    [key: string]: ICategory;
  };
  subCategoryReCords: {
    [key: string]: ISubCategory;
  };
  onOpenEdit: () => void;
  onOpenDelete: () => void;
  setCurrentDeleteProduct: (value: SetStateAction<string | null>) => void;
}) =>
  useCallback(
    (product: IProduct, columnKey: React.Key) => {
      const cellValue = product[columnKey as keyof IProduct];

      switch (columnKey) {
        case "brand":
          return <div>{product.brand}</div>;
        case "category": {
          const catName = categoryReCords[product.category]?.name ?? "-";
          return <p>{catName}</p>;
        }
        case "price": {
          return <div className="text-lg">{separateNumbers(product.price)}</div>;
        }
        case "quantity": {
          return <div className="text-lg">{separateNumbers(product.quantity)}</div>;
        }
        case "subcategory": {
          const subName = subCategoryReCords[product.subcategory]?.name ?? "-";
          return <p>{subName}</p>;
        }

        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip color="success" content="نمایش محصول">
                <Link href={`/products/${product._id}`} className="text-lg text-success cursor-pointer active:opacity-50">
                  <FaRegEye />
                </Link>
              </Tooltip>
              <Tooltip color="warning" content="ویرایش محصول">
                <span
                  onClick={() => {
                    queryClient.invalidateQueries({ queryKey: ["edit-product-modal"] });
                    onOpenEdit();
                    setCurrentDeleteProduct(product._id);
                  }}
                  className="text-lg text-warning cursor-pointer active:opacity-50"
                >
                  <TbEdit />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="حذف محصول">
                <span
                  onClick={() => {
                    onOpenDelete();
                    setCurrentDeleteProduct(product._id);
                  }}
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                >
                  <FaRegTrashCan />
                </span>
              </Tooltip>
            </div>
          );

        case "thumbnail":
          return (
            <Image
              src={`${SRC_BACK_END}/images/products/thumbnails/${product.thumbnail}`}
              alt="thumbnail product"
              width={100}
              height={100}
            />
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

    [subCategoryReCords, categoryReCords, onOpenEdit, setCurrentDeleteProduct , onOpenDelete]
  );
