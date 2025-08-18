import AuthorizeUserAction from "@/components/molecules/authorize-user-action";
import DropDownButton from "@/components/atoms/drop-down-btn";
import HeaderStructure from "@/components/molecules/header-structure";
import { NavbarContent, NavbarItem } from "@heroui/navbar";
import Link from "next/link";
import MegaMenu from "@/components/atoms/mega-menu";
import Footer from "@/components/atoms/footer";

const ShopLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pt-16 dark:bg-gray-dark  bg-gray-light text-gray-dark dark:text-white">
      <HeaderStructure userAction={<AuthorizeUserAction />}>
        <NavbarContent justify="center" className="hidden md:flex">
          <NavbarItem className="hidden sm:flex">
            <Link href="/">صفحه اصلی</Link>
          </NavbarItem>
          <NavbarItem className="hidden sm:flex">
            <DropDownButton />
          </NavbarItem>
        </NavbarContent>
      </HeaderStructure>
      <MegaMenu/>
      {children}
      <Footer/>
    </div>
  );
};
export default ShopLayout;
