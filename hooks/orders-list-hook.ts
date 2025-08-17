import { axiosInstanceBackEnd } from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

export function useGetOrdersList({
  page,
  orderFilter,
  limit,
}: {
  page: number;
  orderFilter: string | null;
  limit: number;
}) {
  return useQuery<IResponseOrders>({
    queryKey: ["order-list", page, limit, orderFilter],
    queryFn: async () =>
      axiosInstanceBackEnd()
        .get("/api/orders", {
          params: {
            page,
            limit,
            sort:
              orderFilter === null || `${orderFilter==='true' ? "-" : ""}deliveryStatus`,
          },
        })
        .then((r) => r.data),
  });
}

export function useGetUsersList({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  return useQuery<IResponseUserList>({
    queryKey: ["user-list", page, limit],
    queryFn: async () =>
      axiosInstanceBackEnd()
        .get("/api/users", { params: { page, limit } })
        .then((r) => r.data),
  });
}
