import { useGetListProduct } from "@/hooks/list-products-hooks";
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
} from "@heroui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useEntitiesCellTable } from "../atoms/entities-cells-table";

const EntitiesProductListTable = ({
  selectedKeys,
  setSelectedKeys,
}: {
  selectedKeys: Record<string, Partial<IProduct>>;
  setSelectedKeys: Dispatch<SetStateAction<Record<string, Partial<IProduct>>>>;
}) => {
  const searchParams = useSearchParams();

  const [page, setPage] = useState<number>(
    () => Number(searchParams.get("page")) || 1
  );
  const pathname = usePathname();
  const router = useRouter();
  const limit = 4;

  useEffect(() => {
    const p = Number(searchParams.get("page")) || 1;
    setPage(p);
  }, [searchParams]);
  const handlePageChange = (p: number) => {
    setPage(p);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const { data: productListData, isPending: isProductListPending } =
    useGetListProduct({ page, limit, productFilter: null });

  const productList = productListData?.data.products ?? [];

  const onChangeValue = ({
    productId,
    method,
    value,
  }: {
    productId: string;
    method: "price" | "quantity";
    value: string;
  }) => {
    setSelectedKeys((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [method]: value,
      },
    }));
  };

  const renderCell = useEntitiesCellTable({ onChangeValue, selectedKeys });
  return (
    <div>
      <Card classNames={{ base: "dark:bg-[#1C252E]" }}>
        <Table
          key={JSON.stringify(productList)}
          removeWrapper
          selectedKeys={Object.keys(selectedKeys)}
          selectionMode="multiple"
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
                color="secondary"
                page={page}
                onChange={handlePageChange}
                total={productListData?.total_pages || 1}
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
            <TableColumn key="name">اسم</TableColumn>
            <TableColumn key="price">قیمت</TableColumn>
            <TableColumn key="quantity">تعداد موجودی</TableColumn>
          </TableHeader>
          <TableBody
            isLoading={isProductListPending}
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
    </div>
  );
};

export default EntitiesProductListTable;
