"use client";
import {
  useGetCategories,
  useGetListProduct,
  useGetSubCategories,
} from "@/hooks/list-products-hooks";
import { FaFilter } from "react-icons/fa";

import {
  Autocomplete,
  AutocompleteItem,
  Card,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@heroui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import DeleteProductModal from "../atoms/delete-product-modal";
import EditProductModal from "../atoms/edit-product-modal";
import { useGenerateProductsTableCells } from "../atoms/product-list-cell-table";

const ProductsListTable = () => {
  const [productFilter, setProductFilter] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const limit = 10;
  const [page, setPage] = useState<number>(
    () => Number(searchParams.get("page")) || 1
  );

  useEffect(() => {
    const p = Number(searchParams.get("page")) || 1;
    const filter = searchParams.get("category");
    setProductFilter(filter);
    setPage(p);
  }, [searchParams]);

  const handlePageChange = (p: number) => {
    if (p === 0) return;
    setPage(p);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
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

  const renderCell = useGenerateProductsTableCells({
    categoryReCords,
    onOpenDelete,
    onOpenEdit,
    setCurrentDeleteProduct,
    subCategoryReCords,
  });

  const { data: productListData, isPending: isProductListPending } =
    useGetListProduct({ page, limit, productFilter });

  const productList = productListData?.data.products ?? [];
  const isCatsReady = !!Object.keys(categoryReCords).length;
  const isSubsReady = !!Object.keys(subCategoryReCords).length;

  const handleFilterProduct = (value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null) params.delete("category");
    else params.set("category", String(value));
    if (value !== null) setProductFilter(JSON.stringify(value));
    else setProductFilter(null);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

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
      <div className="py-4 px-3">
        <Autocomplete
        aria-label='filtering data'
          size="lg"
          defaultItems={Object.keys(categoryReCords).map((item) => ({
            ...categoryReCords[item],
            _id: item,
          }))}
          classNames={{
            popoverContent: "bg-shadow-drawer dark:bg-title-text-light   ",
            base: "py-2 max-w-xs text-title-text-light dark:text-white",
            listbox: "dark:text-title-text-light",
          }}
          onSelectionChange={(e) =>
            handleFilterProduct(e !== null ? String(e) : null)
          }
          placeholder="جستجو بر اساس دسته بندی "
          startContent={
            <FaFilter className="text-xl dark:text-white text-title-text-light" />
          }
          variant="bordered"
        >
          {(item) => (
            <AutocompleteItem key={item._id}>{item.name}</AutocompleteItem>
          )}
        </Autocomplete>
      </div>
      <Table
        removeWrapper
        aria-label="Example table with client side sorting"
        bottomContent={
          <div className="flex w-full justify-center py-2">
            <Pagination
              key={JSON.stringify(productList)}
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
          emptyContent={
            <h1 className="text-3xl text-center">هیج محصولی پیدا نشد .</h1>
          }
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
