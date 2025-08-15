import { queryClient } from "@/context/query-provider";
import { convertDate } from "@/helpers/miladi-to-shamsi";
import { useGetOrdersList, useGetUsersList } from "@/hooks/orders-list-hook";
import { axiosInstanceBackEnd } from "@/lib/axios-instance";
import {
  addToast,
  Button,
  Card,
  Chip,
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
  User,
} from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import DetailOrderListModal from "../atoms/detail-list-order";

const OrdersListTable = () => {
  const [currentOrder, setCurrentOrder] = useState<string | null>(null);
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
    if (p === 0) return;
    setPage(p);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const { data: orderListData, isPending: isOrderListData } = useGetOrdersList({
    page,
    limit,
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
    }: {
      orderId: string;
      orderStatus: boolean;
    }) =>
      axiosInstanceBackEnd()
        .patch(`/api/orders/${orderId}`, { deliveryStatus: orderStatus })
        .then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order-list"] });
      addToast({
        title: "موفق بود",
        description: "وضعیت سفارش تغییر کرد",
        color: "success",
      });
    },
  });
  const {
    isOpen: isOpenOrderDetail,
    onOpen: onOpenOrderDetail,
    onClose: onCloseOrderDetail,
  } = useDisclosure();

  const renderCell = useCallback(
    (order: IOrder, columnKey: React.Key) => {
      const cellValue = order[columnKey as keyof IOrder];

      switch (columnKey) {
        case "user": {
          console.log(userListReCords);

          return (
            <User
              avatarProps={{
                src: "https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/avatar/avatar-2.webp",
              }}
              description={`${
                userListReCords[order.user]?.firstname ?? "-"
              } _ ${userListReCords[order.user]?.lastname ?? "-"}`}
              name={userListReCords[order.user]?.username ?? "-"}
            />
          );
        }
        case "status": {
          return (
            <div>
              {order.deliveryStatus ? (
                <Chip color="success" variant="shadow">
                  تحویل شده
                </Chip>
              ) : (
                <Chip color="warning" variant="shadow">
                  درحال ارسال
                </Chip>
              )}
            </div>
          );
        }
        case "action":
          return (
            <Popover
              showArrow
              offset={20}
              placement="right"
              classNames={{
                base: "dark:before:bg-title-text-light",
                content: " bg-shadow-drawer ",
              }}
            >
              <PopoverTrigger>
                <Button isIconOnly className="rounded-full" variant="light">
                  <SlOptionsVertical />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="px-1 py-2 flex flex-col gap-4 ">
                  <Button
                    variant="light"
                    isLoading={changeStatusOrder.isPending}
                    onPress={() =>
                      changeStatusOrder.mutate({
                        orderId: order._id,
                        orderStatus: !order.deliveryStatus,
                      })
                    }
                  >
                    تغییر وضعیت سفارش
                  </Button>
                  <Button
                    color="secondary"
                    onPress={() => {
                      onOpenOrderDetail();
                      setCurrentOrder(order._id);
                    }}
                    variant="light"
                  >
                    نمایش جزییات
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          );
        case "deliveryDate": {
          return <div>{convertDate(order.deliveryDate).jalaliDate}</div>;
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
    [userListReCords, changeStatusOrder , onOpenOrderDetail]
  );

  return (
    <div>
      <Card classNames={{ base: "dark:bg-[#1C252E]" }}>
        <DetailOrderListModal
          currentOrder={currentOrder}
          isOpen={isOpenOrderDetail}
          onOpen={onOpenOrderDetail}
          onClose={onCloseOrderDetail}
        />
        <Table
          key={JSON.stringify(userListReCords)}
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
            <TableColumn key="user">اسم</TableColumn>
            <TableColumn key="totalPrice">مجموع خرید</TableColumn>
            <TableColumn key="deliveryDate">تاریخ ارسال</TableColumn>
            <TableColumn key="status">وضعیت سفارش</TableColumn>
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
