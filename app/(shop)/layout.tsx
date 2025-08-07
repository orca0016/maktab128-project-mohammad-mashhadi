import AuthorizeUserAction from "@/components/atoms/authorize-user-action";
import DropDownButton from "@/components/atoms/drop-down-btn";
import HeaderStructure from "@/components/molecules/header-structure";
import { NavbarContent, NavbarItem } from "@heroui/navbar";
import Link from "next/link";

const ShopLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dark:bg-gray-dark  bg-gray-light text-gray-dark dark:text-white">
      <HeaderStructure userAction={<AuthorizeUserAction />}>
        <NavbarContent justify="center">
          <NavbarItem className="hidden sm:flex">
            <Link href="/">صفحه اصلی</Link>
          </NavbarItem>
          <NavbarItem className="hidden sm:flex">
            <DropDownButton />
          </NavbarItem>
        </NavbarContent>
      </HeaderStructure>
      {children}
    </div>
  );
};
export default ShopLayout;
