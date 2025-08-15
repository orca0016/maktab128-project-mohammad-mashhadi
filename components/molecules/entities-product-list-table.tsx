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
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

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
    if (p === 1) params.delete("page");
    else params.set("page", String(p));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const { data: productListData, isPending: isProductListPending } =
    useGetListProduct({ page, limit });

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

  const renderCell = useCallback(
    (product: IProduct, columnKey: React.Key) => {
      const cellValue = product[columnKey as keyof IProduct];

      switch (columnKey) {
        case "price": {
          return (
            <input
              type="number"
              className="outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              value={selectedKeys[product._id]?.price}
              defaultValue={product.price}
              onChange={(e) =>
                onChangeValue({
                  productId: product._id,
                  value: e.target.value,
                  method: "price",
                })
              }
            />
          );
        }
        case "quantity": {
          return (
            <input
              type="number"
              className="outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              value={selectedKeys[product._id]?.quantity}
              defaultValue={product.quantity}
              onChange={(e) =>
                onChangeValue({
                  productId: product._id,
                  value: e.target.value,
                  method: "quantity",
                })
              }
            />
          );
        }

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
    [selectedKeys ]
  );

  return (
    <div>
      <Card classNames={{ base: "dark:bg-[#1C252E]" }}>
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
            <TableColumn key="name">
              اسم
            </TableColumn>
            <TableColumn key="price">
              قیمت
            </TableColumn>
            <TableColumn key="quantity">
              تعداد موجودی
            </TableColumn>
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
