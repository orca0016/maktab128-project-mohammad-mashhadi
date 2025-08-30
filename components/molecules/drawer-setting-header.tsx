import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  useDisclosure,
} from "@heroui/react";
import { IoSettingsOutline } from "react-icons/io5";
import ThemeChanger from "../atoms/theme-changer";

const DrawerSettingHeader = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };
  return (
    <div>
      <Button
        isIconOnly
        className="rounded-full"
        variant="light"
        onPress={handleOpen}
      >
        <IoSettingsOutline
          className="animate-spin  text-2xl"
          style={{ animationDuration: "8s" }}
        />
      </Button>
      <Drawer
        size="xs"
        backdrop="transparent"
        classNames={{
          closeButton: "left-1 ml-3 mr-auto w-fit",
          base: "rounded-none  bg-shadow-drawer  shadow-2xl",
        }}
        isOpen={isOpen}
        placement={"left"}
        className="dark:text-white text-gray-dark "
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          {() => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                تنظیمات
              </DrawerHeader>
              <DrawerBody className="grid grid-cols-1 gap-2 grid-rows-5 pl-10">
                <ThemeChanger />
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default DrawerSettingHeader;
