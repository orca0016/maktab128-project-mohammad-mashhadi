import { queryClient } from "@/context/query-provider";
import { axiosInstanceBackEnd } from "@/lib/axios-instance";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import { UseMutationResult, useQuery } from "@tanstack/react-query";
import OrderDetail from "./order-detail";

const DetailOrderListModal = ({
  isOpen,
  onClose,
  currentOrder,
  changeStatusOrder,
}: {
  currentOrder: string | null;
  changeStatusOrder: UseMutationResult<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    Error,
    {
      orderId: string;
      orderStatus: boolean;
      deliveryDate: string;
    },
    unknown
  >;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) => {
  const { data, isPending } = useQuery<IResponseSingleOrder>({
    enabled: !!currentOrder,
    queryKey: ["detail-order", currentOrder],
    queryFn: async () =>
      axiosInstanceBackEnd()
        .get(`/api/orders/${currentOrder}`)
        .then((res) => res.data),
  });

  return (
    <div>
      <Modal
        classNames={{
          base: "bg-shadow-drawer ",
        }}
        backdrop="blur"
        size="lg"
        scrollBehavior="outside"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                {isPending ? (
                  <Spinner className="py-10" label="درحال بارگذاری..." />
                ) : !data ? (
                  <p className="text-2xl text-center">
                    سفارش مورد نظر پیدا نشد{" "}
                  </p>
                ) : (
                  <OrderDetail data={data} />
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  بستن
                </Button>
                <Button
                  className={data?.data.order.deliveryStatus ? "hidden" : ""}
                  variant="solid"
                  color="success"
                  isLoading={changeStatusOrder.isPending}
                  onPress={() => {
                    changeStatusOrder.mutate({
                      orderId: data?.data.order._id ?? "",
                      orderStatus: !data?.data.order.deliveryStatus,
                      deliveryDate:
                        data?.data.order.deliveryStatus === false
                          ? new Date().toISOString()
                          : data?.data.order.deliveryDate ?? "",
                    });
                    queryClient.invalidateQueries({
                      queryKey: ["detail-order"],
                    });
                  }}
                >
                  تغییر وضعیت سفارش
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DetailOrderListModal;
