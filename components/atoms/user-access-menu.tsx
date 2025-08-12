"use client";
import {
  addToast,
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

import { queryClient } from "@/context/query-provider";
import { axiosInstance, axiosInstanceBackEnd } from "@/lib/axios-instance";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LuUserPlus } from "react-icons/lu";
import { TbLayoutDashboard, TbLogin2 } from "react-icons/tb";

const UserAccessMenu = ({ user }: { user?: IUserData }) => {
  const router = useRouter();
  const logOut = useMutation({
    mutationFn: () =>
      axiosInstanceBackEnd().get("/api/auth/logout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      }),
    onSuccess: () => {
      localStorage.removeItem("access-token");
      localStorage.removeItem("refresh-token");
      localStorage.removeItem("user-id");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      addToast({
        title:'موفق بود .',
        description:'با موفقیت از حساب خود خارج شدید .',
        color:'warning'
      })
      router.refresh();
    },
    onError: (e) => {
      console.log(e);
      addToast({
        title: "مشکلی پیش امد ",
        description: `لطفا بعدا دوباره امتحان کنید. .`,
        color: "danger",
      });
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
          {!!user ? (
            <>
              <DropdownItem key="username">
                <h1 className="text-md ">نام کاربری:{user.username}</h1>
                <div className="flex gap-1 pb-2">
                  نام و نام خانوادگی:
                  <p className="text-xs">{user.firstname}</p>
                  <p className="text-xs">{user.lastname}</p>
                </div>
                <Divider />
              </DropdownItem>
              {user.role === "ADMIN" && (
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
