"use client";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import { useRef } from "react";
import DrawerSettingHeader from "../molecules/drawer-setting-header";
import LogoIcon from "./logo-icon";

const HeaderStructure = ({
  children,
  userAction,
}: {
  children: React.ReactNode;
  userAction: React.ReactNode;
}) => {
  const navRef = useRef<HTMLDivElement>(null);
  const handleScrollHeader = (position: number) => {
    if (!navRef.current) return;

    if (position === 0) {
      navRef.current.classList.add("backdrop-blur-none");
      navRef.current.classList.add("bg-gray-dark/0");
      navRef.current.classList.remove("dark:bg-gray-dark/40");
      navRef.current.classList.remove("bg-white/40");
      navRef.current.classList.remove("backdrop-blur-xl");
    } else {
      navRef.current.classList.add("backdrop-blur-xl");
      navRef.current.classList.remove("backdrop-blur-none");
      navRef.current.classList.remove("bg-gray-dark/0");
      navRef.current.classList.add("dark:bg-gray-dark/40");
      navRef.current.classList.add("bg-white/40");
    }
  };

  return (
    <Navbar
      ref={navRef}
      position="sticky"
      maxWidth="full"
      onScrollPositionChange={handleScrollHeader}
      className=" bg-gray-dark/0 fixed transition-all backdrop-saturate-100 backdrop-blur-none"
    >
      <NavbarBrand>
        <div className="h-full w-10 ">
          <LogoIcon />
        </div>
      </NavbarBrand>
      {children}
      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">{userAction}</NavbarItem>
        <NavbarItem>
          <DrawerSettingHeader />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default HeaderStructure;
