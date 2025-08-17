import { queryClient } from "@/context/query-provider";
import { useGetOrdersList, useGetUsersList } from "@/hooks/orders-list-hook";
import { axiosInstanceBackEnd } from "@/lib/axios-instance";
import {
  addToast,
  Button,
  Card,
  Pagination,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import DetailOrderListModal from "../atoms/detail-list-order";
import { useOrderCellTable } from "../atoms/orders-table-cells";

const OrdersListTable = () => {
  const [currentOrder, setCurrentOrder] = useState<string | null>(null);
  const [orderFilter, setOrderFilter] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const [page, setPage] = useState<number>(
    () => Number(searchParams.get("page")) || 1
  );

  const pathname = usePathname();
  const router = useRouter();
  const limit = 10;

  useEffect(() => {
    const p = Number(searchParams.get("page")) || 1;
    const filter = searchParams.get("orderStatus");
    setOrderFilter(filter);
    setPage(p);
  }, [searchParams]);

  const handlePageChange = (p: number) => {
    if (p === 0) return;
    setPage(p);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const { data: orderListData, isPending: isOrderListData } = useGetOrdersList({
    page,
    limit,
    orderFilter,
  });
  const { data: userListData } = useGetUsersList({
    page: 1,
    limit: 1000,
  });

  const orderList = useMemo(
    () => orderListData?.data.orders ?? [],
    [orderListData]
  );

  const userListReCords = useMemo(() => {
    const objectHashmap: { [key: string]: IUserData } = {};
    const data = userListData?.data.users ?? [];
    for (let item = 0; item < data.length; item++) {
      objectHashmap[data[item]._id] = data[item];
    }
    return objectHashmap;
  }, [userListData]);

  const changeStatusOrder = useMutation({
    mutationKey: ["order-list-edit"],
    mutationFn: async ({
      orderId,
      orderStatus,
      deliveryDate,
    }: {
      orderId: string;
      deliveryDate: string;
      orderStatus: boolean;
    }) =>
      axiosInstanceBackEnd()
        .patch(`/api/orders/${orderId}`, {
          deliveryStatus: orderStatus,
          deliveryDate: deliveryDate,
        })
        .then((r) => r.data),
    onSuccess: () => {      
      queryClient.invalidateQueries({ queryKey: ["order-list"] });
      addToast({
        title: "موفق بود",
        description: "وضعیت سفارش تغییر کرد",
        color: "success",
      });
      onCloseOrderDetail()
    },
    onError: (e) => {
      addToast({
        title: "مشکلی  پیش آمد",
        description: e.message,
        color: "danger",
      });
    },
  });
  const {
    isOpen: isOpenOrderDetail,
    onOpen: onOpenOrderDetail,
    onClose: onCloseOrderDetail,
  } = useDisclosure();

  const renderCell = useOrderCellTable({
    onOpenOrderDetail,
    setCurrentOrder,
    userListReCords,
  });

  const handleFilterOrder = (deliveryStatus: boolean | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (deliveryStatus === null) params.delete("orderStatus");
    else params.set("orderStatus", String(deliveryStatus));
    if (deliveryStatus !== null) setOrderFilter(JSON.stringify(deliveryStatus));
    else setOrderFilter(null);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  
  return (
    <div>
      <Card classNames={{ base: "dark:bg-[#1C252E]" }}>
        <DetailOrderListModal
          changeStatusOrder={changeStatusOrder}
          currentOrder={currentOrder}
          isOpen={isOpenOrderDetail}
          onOpen={onOpenOrderDetail}
          onClose={onCloseOrderDetail}
        />
        <Table
          key={JSON.stringify(userListReCords)}
          removeWrapper
          aria-label="order details"
          bottomContent={
            <div className="flex w-full justify-center py-2">
              <Pagination
                key={JSON.stringify(orderList)}
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
                total={orderListData?.total_pages || 1}
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
            <TableColumn key="user">اسم خریدار</TableColumn>
            <TableColumn key="totalPrice">مجموع خرید</TableColumn>
            <TableColumn key="deliveryDate">تاریخ دریافت</TableColumn>
            <TableColumn key="status">
              <Popover
                placement="bottom"
                classNames={{ content: "bg-shadow-drawer" }}
              >
                <PopoverTrigger>
                  <Button variant="light">وضعیت سفارش</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="p-1 flex flex-col gap-2">
                    <Button
                      onPress={() => handleFilterOrder(null)}
                      color="secondary"
                      size="sm"
                    >
                      همه
                    </Button>
                    <Button
                      onPress={() => handleFilterOrder(true)}
                      color="secondary"
                      size="sm"
                    >
                      تحویل شده{" "}
                    </Button>
                    <Button
                      onPress={() => handleFilterOrder(false)}
                      color="secondary"
                      size="sm"
                    >
                      در انتظار
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </TableColumn>
            <TableColumn key="action">تنظیمات</TableColumn>
          </TableHeader>
          <TableBody
            isLoading={isOrderListData}
            emptyContent={
              <h1 className="text-3xl text-center">هیج سفارشی پیدا نشد .</h1>
            }
            items={orderList}
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

export default OrdersListTable;
