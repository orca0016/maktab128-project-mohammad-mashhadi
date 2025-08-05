import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  useDisclosure,
} from "@heroui/react";
import { IoSettingsOutline } from "react-icons/io5";

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
          closeButton: "left-1 mr-auto w-fit",
          base: "rounded-none  dark:bg-gray-dark/50  bg-white/50 bg-shadow-drawer  shadow-2xl",
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
              <DrawerBody>
                به زودی...
              </DrawerBody>
            
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default DrawerSettingHeader;
