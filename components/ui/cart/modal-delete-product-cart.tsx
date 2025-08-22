import { useCart } from "@/hooks/use-cart";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";

const DeleteModalProductCart = ({
  isOpen,
  onClose,
  currentDelete,
}: {
  currentDelete: string | null;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) => {
  const { removeFromCart } = useCart();
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
                <Button
                  color="danger"
                  onPress={() => {
                    removeFromCart(currentDelete || "");
                    onClose();
                  }}
                >
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

export default DeleteModalProductCart;
