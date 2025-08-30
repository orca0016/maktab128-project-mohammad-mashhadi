"use client";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import Link from "next/link";
import { useRef } from "react";
import LogoIcon from "../atoms/logo-icon";
import MenuDrawer from "../atoms/menu-drawer";
import DrawerSettingHeader from "../molecules/drawer-setting-header";

const HeaderStructure = ({
  children,
  userAction,
}: {
  children?: React.ReactNode;
  userAction?: React.ReactNode;
}) => {
  const navRef = useRef<HTMLDivElement>(null);
  const handleScrollHeader = (position: number) => {
    if (!navRef.current) return;

    if (position === 0) {
      navRef.current.classList.add("backdrop-blur-none");
      navRef.current.classList.add("bg-gray-dark/0");
      navRef.current.classList.remove("dark:bg-gray-dark/40");
      navRef.current.classList.remove("bg-slate-50/60");
      navRef.current.classList.remove("backdrop-blur-xl");
    } else {
      navRef.current.classList.add("backdrop-blur-xl");
      navRef.current.classList.remove("backdrop-blur-none");
      navRef.current.classList.remove("bg-gray-dark/0");
      navRef.current.classList.add("dark:bg-gray-dark/40");
      navRef.current.classList.add("bg-slate-50/60");
    }
  };

  return (
    <Navbar
      ref={navRef}
      position="sticky"
      maxWidth="full"
      onScrollPositionChange={handleScrollHeader}
      classNames={{ wrapper: "px-0" }}
      className=" bg-gray-dark/0 fixed transition-all backdrop-saturate-100  backdrop-blur-none px-6 md:px-22 "
    >
        <NavbarBrand className="space-x-4">
          <MenuDrawer />
          <Link href={"/"} className="h-full w-10 ">
            <LogoIcon />
          </Link>
        </NavbarBrand>
        {children}
        <NavbarContent justify="end">
          <NavbarItem>{userAction}</NavbarItem>
          <NavbarItem>
            <DrawerSettingHeader />
          </NavbarItem>
        </NavbarContent>
      
    </Navbar>
  );
};

export default HeaderStructure;
