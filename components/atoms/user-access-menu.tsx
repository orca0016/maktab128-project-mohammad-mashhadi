"use client";
import { queryClient } from "@/context/query-provider";
import {
  addToast,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LuUserPlus } from "react-icons/lu";
import { TbLayoutDashboard, TbLogin2, TbLogout2 } from "react-icons/tb";
import { UserAuthIcon } from "./icons";
import { HiMiniInformationCircle } from "react-icons/hi2";

const UserAccessMenu = ({ user }: { user?: IUserData }) => {
  const router = useRouter();
  const logOut = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
    localStorage.removeItem("user-id");
    queryClient.invalidateQueries({ queryKey: ["user-information"] });

    addToast({
      title: "موفق بود .",
      description: "با موفقیت از حساب خود خارج شدید .",
      color: "success",
    });
    router.refresh();
  };
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
            <UserAuthIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Dropdown menu for user auth" variant="faded">
          {!!user ? (
            <>
                <DropdownItem
                  key="personal-account"
                  startContent={<HiMiniInformationCircle  />}
                  as={Link}
                  href="/account"
                  variant="flat"
                >
                  پروفایل کاربری
                </DropdownItem>
              {user.role === "ADMIN" && (
                <DropdownItem
                  key="dashboard"
                  startContent={<TbLayoutDashboard />}
                  as={Link}
                  href="/dashboard"
                  variant="flat"
                >
                  داشبورد مدیریت
                </DropdownItem>
              )}
              <DropdownItem
                key="sign-up"
                startContent={<TbLogout2 />}
                onPress={logOut}
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
