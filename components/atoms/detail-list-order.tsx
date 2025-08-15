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
import { useQuery } from "@tanstack/react-query";
import OrderDetail from "./order-detail";

const DetailOrderListModal = ({
  isOpen,
  onClose,
  currentOrder,
}: {
  currentOrder: string | null;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) => {
  const { data, isPending } = useQuery<IResponseSingleOrder>({
    queryFn: async () =>
      axiosInstanceBackEnd()
        .get(`/api/orders/${currentOrder}`)
        .then((res) => res.data),
    queryKey: ["detail-orders", currentOrder],
  });

  return (
    <div>
      <Modal
      classNames={{base:'dark:bg-title-text-light'}}
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
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DetailOrderListModal;
