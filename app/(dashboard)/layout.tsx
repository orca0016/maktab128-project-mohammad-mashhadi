import AuthorizeUserAction from "@/components/molecules/authorize-user-action";
import HeaderStructure from "@/components/molecules/header-structure";
import SidebarDashboard from "@/components/molecules/sidebar-dashboard";
import ScrollableBox from "@/lib/scrollable-box";
import { NavbarContent } from "@heroui/navbar";

const ShopLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dark:bg-gray-dark  bg-gray-light text-gray-dark dark:text-white h-screen">
      <HeaderStructure userAction={<AuthorizeUserAction />}>
        <NavbarContent justify="center"></NavbarContent>
      </HeaderStructure>
      <div className="grid grid-cols-12">
        <div className="col-span-3 relative">
          <ScrollableBox>
            <SidebarDashboard />
          </ScrollableBox>
        </div>
        <div className=" col-span-9 relative">
          <ScrollableBox>
              <div className="py-20 px-7">{children}</div>
          </ScrollableBox>
        </div>
      </div>
    </div>
  );
};
export default ShopLayout;
