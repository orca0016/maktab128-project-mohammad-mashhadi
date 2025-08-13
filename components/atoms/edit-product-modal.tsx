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
import AddNewProductForm from "../molecules/add-new-product-form";

const EditProductModal = ({
  isOpen,
  onClose,
  currentEdit,
}: {
  currentEdit: string | null;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) => {
  const { data, isPending } = useQuery<IResponseSingleProduct>({
    queryFn: async () =>
      axiosInstanceBackEnd()
        .get(`/api/products/${currentEdit}`)
        .then((res) => res.data),
    queryKey: ["edit-product", currentEdit],
  });

  return (
    <div>
      <Modal
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
                {isPending?(
                    <Spinner className="py-10" label="درحال بارگذاری..."/>
                ):(
                    
                    <AddNewProductForm
                    onEditClose={onClose}
                      editProductData={data?.data.product}
                      isEditing
                    />
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  انصراف
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditProductModal;
