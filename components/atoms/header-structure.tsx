"use client";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useRef } from "react";
import LogoIcon from "./logo-icon";

const HeaderStructure = ({ children }: { children: React.ReactNode }) => {
  const navRef = useRef<HTMLDivElement>(null);
  const handleScrollHeader = (position:number)=>{
    if(!navRef.current)return 
    console.log(position);
    
    if (position===0) {
      navRef.current.classList.add('backdrop-blur-none')
      navRef.current.classList.add('dark:bg-gray-dark/0')
      navRef.current.classList.remove('dark:bg-gray-dark/40')
      navRef.current.classList.remove('backdrop-blur-xl')
    }else{
      navRef.current.classList.add('backdrop-blur-xl')
      navRef.current.classList.remove('backdrop-blur-none')
      navRef.current.classList.remove('dark:bg-gray-dark/0')
      navRef.current.classList.add('dark:bg-gray-dark/40')
      
    }
  }
  return (
    <Navbar
      ref={navRef}
      position="sticky"
      maxWidth="full"
      onScrollPositionChange={handleScrollHeader}
      className="dark:bg-gray-dark/0 fixed transition-all backdrop-saturate-100 backdrop-blur-none"
    >
      <NavbarBrand>
        <div className="h-full w-16 ">
          <LogoIcon />
        </div>
      </NavbarBrand>
      {children}
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default HeaderStructure;
