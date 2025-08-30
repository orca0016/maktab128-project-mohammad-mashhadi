"use client";
import AuthorizeUserAction from "@/components/molecules/authorize-user-action";
import HeaderStructure from "@/components/molecules/header-structure";
import SidebarDashboard from "@/components/molecules/sidebar-dashboard";
import { axiosInstanceBackEnd } from "@/lib/axios-instance";
import ScrollableBox from "@/lib/scrollable-box";
import { NavbarContent } from "@heroui/navbar";
import { addToast, Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const ShopLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathName = usePathname();

  const { data, isPending, isError } = useQuery<{ id?: string; role?: string }>(
    {
      queryKey: ["get-user-info"],
      queryFn: async () => {
        return await axiosInstanceBackEnd()
          .get(`/api/users/me`)
          .then((res) => res.data);
      },
    }
  );

  useEffect(() => {
    const userId = localStorage.getItem("user-id");
    const accessToken = localStorage.getItem("access-token");
    if (!userId || !accessToken) {
      router.push("/login");
      addToast({
        title: "ابدا وارد شوید .",
        color: "danger",
      });
    }
  }, [router]);

  useEffect(() => {
    if (isPending) return;
    if (isError) {
      addToast({
        title: "ابدا وارد شوید .",
        color: "danger",
      });
      router.push("/login");
    }
  }, [pathName, router, isPending, isError]);

  useEffect(() => {
    if (isPending) return;
    if (data?.role !== "ADMIN") {
      addToast({
        title: "دسترسی شما رد شد .",
        color: "danger",
      });
      router.push("/forbidden");
    }
  }, [pathName, router, isPending, data]);

  if (isPending) {
    return (
      <div className="w-full h-screen bg-slate-100  dark:bg-title-text-light flex items-center justify-center">
        <Spinner
          color="secondary"
          classNames={{ label: "!text-title-text-light dark:!text-slate-100" }}
          label="درحال بارگذاری..."
          size="lg"
        />
      </div>
    );
  }

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
