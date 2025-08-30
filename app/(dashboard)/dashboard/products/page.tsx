"use client";
import AddNewProductForm from "@/components/molecules/add-new-product-form";
import ProductsListTable from "@/components/molecules/products-list-table";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import Link from "next/link";
import { IoMdAdd } from "react-icons/io";

const ProductsListPage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold mb-2">لیست محصولات</h1>

        <Button
          className="bg-title-text-light text-white dark:bg-white dark:text-title-text-light font-semibold"
          onPress={onOpen}
        >
          اضافه کردن محصول
          <IoMdAdd size={"1.4rem"} />
        </Button>
      </div>
      <Modal
        size="lg"
        classNames={{ base: "bg-shadow-drawer min-h-[400px]" }}
        scrollBehavior="inside"
        isOpen={isOpen}
        backdrop="blur"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                محصول جدید
              </ModalHeader>
              <ModalBody>
                <AddNewProductForm isModalNewForm={onClose} />
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
      <Breadcrumbs color="secondary" size="md" >
        <BreadcrumbItem>
          <Link href="/dashboard">داشبورد</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>محصولات</BreadcrumbItem>
      </Breadcrumbs>
      <div className="max-w-[1200px] mx-auto my-11">
        <ProductsListTable />
      </div>
    </div>
  );
};

export default ProductsListPage;
