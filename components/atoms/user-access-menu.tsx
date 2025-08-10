"use client";
import {
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import Link from "next/link";
import { LuCircleUser } from "react-icons/lu";
import { TbLogout2 } from "react-icons/tb";

import { axiosInstance } from "@/lib/axios-instance";
import { useMutation } from "@tanstack/react-query";
import { LuUserPlus } from "react-icons/lu";
import { TbLayoutDashboard, TbLogin2 } from "react-icons/tb";

const UserAccessMenu = ({ loginData }: { loginData?: IResponseUserData }) => {
  const logOut = useMutation({
    mutationFn: () =>
      fetch("http://localhost:8000/api/auth/logout", {
        method: "GET",
        credentials: "include",
      }).then(res=>res.json()),
    onSuccess: () => {
      alert("shoma kharej shodid");
    },
    onError: (e) => {
      console.log(e);
    },
  });
  return (
    <div>
      <Dropdown
        classNames={{
          content:
            "dark:bg-gray-dark bg-white  dark:text-white text-gray-dark bg-shadow-drawer ",
        }}
      >
        <DropdownTrigger>
          <Button variant="light" className="rounded-full" isIconOnly>
            <LuCircleUser
              className="text-title-text-light dark:text-white"
              size={"1.8rem"}
            />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Dropdown menu for user auth" variant="faded">
          {loginData ? (
            <>
              <DropdownItem key="username">
                <h1 className="text-md ">
                  نام کاربری:{loginData.data.user.username}
                </h1>
                <div className="flex gap-1 pb-2">
                  نام و نام خانوادگی:
                  <p className="text-xs">{loginData.data.user.firstname}</p>
                  <p className="text-xs">{loginData.data.user.lastname}</p>
                </div>
                <Divider />
              </DropdownItem>
              {loginData.data.user.role === "ADMIN" && (
                <DropdownItem
                  key="dashboard"
                  endContent={<TbLayoutDashboard />}
                  as={Link}
                  href="/dashboard"
                  variant="flat"
                >
                  داشبورد مدیریت
                </DropdownItem>
              )}
              <DropdownItem
                key="sign-up"
                endContent={<TbLogout2 />}
                onPress={() => logOut.mutate()}
                variant="flat"
                color="danger"
              >
                خروج از حساب کاربری
              </DropdownItem>
            </>
          ) : (
            <>
              <DropdownItem
                key="login"
                startContent={<TbLogin2 />}
                as={Link}
                href="/login"
              >
                وارد شدن
              </DropdownItem>
              <DropdownItem
                key="sign-up"
                startContent={<LuUserPlus />}
                as={Link}
                href="/sign-up"
              >
                ثبت نام
              </DropdownItem>
            </>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default UserAccessMenu;
