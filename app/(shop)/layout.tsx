import Footer from "@/components/atoms/footer";
import MegaMenu from "@/components/atoms/mega-menu";
import AuthorizeUserAction from "@/components/molecules/authorize-user-action";
import HeaderStructure from "@/components/molecules/header-structure";
import { PAGES_LIST } from "@/helpers/page-lists";
import { NavbarContent, NavbarItem } from "@heroui/navbar";
import Link from "next/link";

const ShopLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pt-16 dark:bg-gray-dark  bg-gray-light text-gray-dark dark:text-white">
      <HeaderStructure userAction={<AuthorizeUserAction />}>
        <NavbarContent justify="center" className="hidden md:flex">
          {PAGES_LIST.map((item, index) => (
            <NavbarItem key={index} className="hidden sm:flex">
              <Link href={item.href}>{item.name}</Link>
            </NavbarItem>
          ))}
        </NavbarContent>
      </HeaderStructure>
      <MegaMenu />
      {children}
      <Footer />
    </div>
  );
};
export default ShopLayout;
