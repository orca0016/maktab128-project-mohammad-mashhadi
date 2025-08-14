"use client";
import {
  useGetCategories,
  useGetListProduct,
  useGetSubCategories,
} from "@/hooks/list-products-hooks";
// http://localhost:8000/api/products?page=1&limit=4&fields=-rating,-createdAt,-updatedAt,-__v&sort=price&quantity[gte]=8

import {
  Card,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { TbEdit } from "react-icons/tb";
import DeleteProductModal from "../atoms/delete-product-modal";
import EditProductModal from "../atoms/edit-product-modal";

const ProductsListTable = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const limit = 10;
  const [page, setPage] = useState<number>(
    () => Number(searchParams.get("page")) || 1
  );

  useEffect(() => {
    const p = Number(searchParams.get("page")) || 1;
    setPage(p);
  }, [searchParams]);

  const handlePageChange = (p: number) => {
    setPage(p);
    const params = new URLSearchParams(searchParams.toString());
    if (p === 1) params.delete("page");
    else params.set("page", String(p));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  const [currentDeleteProduct, setCurrentDeleteProduct] = useState<
    string | null
  >(null);

  const { data: categoryData } = useGetCategories({ page: 1, limit: 1000 });
  const { data: subCategoryData } = useGetSubCategories({
    page: 1,
    limit: 1000,
  });

  const categoryReCords = useMemo(() => {
    const objectHashmap: { [key: string]: ICategory } = {};
    const data = categoryData?.data.categories ?? [];
    for (let item = 0; item < data.length; item++) {
      objectHashmap[data[item]._id] = data[item];
    }
    return objectHashmap;
  }, [categoryData]);

  const subCategoryReCords = useMemo(() => {
    const objectHashmap: { [key: string]: ISubCategory } = {};
    const data = subCategoryData?.data.subcategories ?? [];
    for (let item = 0; item < data.length; item++) {
      objectHashmap[data[item]._id] = data[item];
    }
    return objectHashmap;
  }, [subCategoryData]);

  const renderCell = useCallback(
    (product: IProduct, columnKey: React.Key) => {
      const cellValue = product[columnKey as keyof IProduct];

      switch (columnKey) {
        case "brand":
          return <div>{product.brand}</div>;
        case "category": {
          const catName = categoryReCords[product.category]?.name ?? "-";
          return <p>{catName}</p>;
        }
        case "subcategory": {
          const subName = subCategoryReCords[product.subcategory]?.name ?? "-";
          return <p>{subName}</p>;
        }

        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip color="success" content="نمایش محصول">
                <span className="text-lg text-success cursor-pointer active:opacity-50">
                  <FaRegEye />
                </span>
              </Tooltip>
              <Tooltip color="warning" content="ویرایش محصول">
                <span
                  onClick={() => {
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
              src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`}
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [subCategoryReCords, categoryReCords]
  );

  const { data: productListData, isPending: isProductListPending } =
    useGetListProduct({ page, limit });

  const productList = productListData?.data.products ?? [];
  const isCatsReady = !!Object.keys(categoryReCords).length;
  const isSubsReady = !!Object.keys(subCategoryReCords).length;

  return (
    <Card classNames={{ base: "dark:bg-[#1C252E]" }}>
      <DeleteProductModal
        currentDelete={currentDeleteProduct}
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        onOpen={onOpenDelete}
      />
      <EditProductModal
        currentEdit={currentDeleteProduct}
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        onOpen={onOpenEdit}
      />

      <Table
        removeWrapper
        aria-label="Example table with client side sorting"
        bottomContent={
          <div className="flex w-full justify-center py-2">
            <Pagination
              dir="ltr"
              classNames={{
                item: "bg-current/10 ",
                next: "bg-current/10 ",
                prev: "bg-current/10 ",
              }}
              showControls
              showShadow
              color="secondary"
              page={page}
              total={productListData?.total_pages || 1}
              onChange={handlePageChange}
            />
          </div>
        }
        classNames={{
          table: "min-h-[400px] ",
          wrapper: "px-0 mt-0 pt-0 rounded-0 ",
          tr: "!h-fit",
          td: "text-title-text-light dark:text-white",
          th: ["!rounded-none dark:bg-[#28323D] bg-[#F4F6F8]  py-6 text-sm"],
        }}
      >
        <TableHeader>
          <TableColumn key="thumbnail">تصویر</TableColumn>
          <TableColumn key="name">اسم</TableColumn>
          <TableColumn key="price">قیمت</TableColumn>
          <TableColumn key="quantity">تعداد موجودی</TableColumn>
          <TableColumn key="brand">برند</TableColumn>
          <TableColumn key="category">دسته بندی</TableColumn>
          <TableColumn key="subcategory">زیر مجموعه</TableColumn>
          <TableColumn key="actions">اکشن ها</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={isProductListPending || !isCatsReady || !isSubsReady}
          items={productList}
          loadingContent={<Spinner label="درحال بارگزاری..." />}
        >
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ProductsListTable;
