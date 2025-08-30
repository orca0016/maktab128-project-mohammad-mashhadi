import { PAGES_LIST } from "@/helpers/page-lists";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  useDisclosure,
} from "@heroui/react";
import Link from "next/link";
import { ListIcon } from "./icons";
import LogoIcon from "./logo-icon";

const MenuDrawer = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button className="block md:hidden rounded-full" onPress={onOpen} isIconOnly variant="light">
        <ListIcon />
      </Button>
      <Drawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{ base: "rounded-none bg-shadow-drawer max-w-[300px]" }}
        dir="ltr"
        size="sm"
      >
        <DrawerContent>
          {() => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                <div className="w-16 ml-auto">
                  <LogoIcon />
                </div>
              </DrawerHeader>
              <DrawerBody>
                <h1 className="text-2xl text-center my-8 font-semibold">
                  مینیمال بهترین شاپ مینیمال
                </h1>
                {PAGES_LIST.map((item, index) => (
                  <Link key={index} href={item.href}>
                    <Button className="w-full" color="secondary">
                      {item.name}
                    </Button>
                  </Link>
                ))}
              </DrawerBody>
              <DrawerFooter></DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MenuDrawer;
