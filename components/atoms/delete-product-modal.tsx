import { queryClient } from "@/context/query-provider";
import { axiosInstanceBackEnd } from "@/lib/axios-instance";
import {
  addToast,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

const DeleteProductModal = ({
  isOpen,
  onClose,
  currentDelete,
}: {
  currentDelete: string | null;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) => {
  const deleteProduct = useMutation({
    mutationFn: async () =>
      axiosInstanceBackEnd().delete(`/api/products/${currentDelete}`),
    onSuccess: () => {
      addToast({
        title: "موفق بود .",
        description: "محصول مورد نظر پاک شد .",
        color: "warning",
      });
      queryClient.invalidateQueries({
        queryKey: ["product-list"],
      });
      onClose();
    },
    onError: (e) => {
      addToast({
        title: "خطایی رخ داد .",
        description: e.message,
        color: "danger",
      });
    },
  });
  return (
    <div>
      <Modal
        classNames={{ base: "bg-shadow-drawer" }}
        backdrop="blur"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                ایا از حذف این محصول مطمئن هستید؟
              </ModalHeader>
              <ModalBody></ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  انصراف
                </Button>
                <Button color="danger" onPress={() => deleteProduct.mutate()}>
                  تایید
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DeleteProductModal;
