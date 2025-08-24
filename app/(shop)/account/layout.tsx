"use client";
import { CartIcon, LoveIcon, UserAuthIcon } from "@/components/atoms/icons";
import { queryClient } from "@/context/query-provider";
import { axiosInstanceBackEnd } from "@/lib/axios-instance";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/react";
import { addToast } from "@heroui/toast";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { TbLayoutDashboard, TbLogout2 } from "react-icons/tb";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathName = usePathname();

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
    router.push("/");
    router.refresh();
  };

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
        title: "ابتدا وارد شوید .",
        color: "danger",
      });
      router.push("/login");
    }
  }, [pathName, router, isPending, isError]);

  if (isError) {
    return (
      <div className="w-full h-screen bg-slate-100  dark:bg-title-text-light flex items-center justify-center">
        <h1 className="text-5xl font-semibold text-center">مشکلی پیش امد .</h1>
      </div>
    );
  }
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
    <div className="flex justify-center flex-wrap gap-10 container mx-auto py-20 min-h-[70vh]">
      <aside className="shadow-lg min-w-[300px] border border-[#E5E8EB] dark:border-[#323A42] rounded-xl  py-6 flex flex-col justify-between gap-5">
        <div className="flex flex-col gap-5 px-8">
          {data.role === "ADMIN" && (
            <Link href="/dashboard" className=" flex gap-5 text-lg">
              <Button
                className="w-full"
                variant="light"
                startContent={<TbLayoutDashboard size="1.5rem" />}
              >
                داشبورد مدیریت
              </Button>
            </Link>
          )}
          <Button
            className="w-full"
            variant="ghost"
            startContent={<UserAuthIcon />}
          >
            اطلاعات شخصی
          </Button>
          <Link href="/account/wishlist" className=" flex gap-5 text-lg">
            <Button
              className="w-full"
              variant="light"
              startContent={<LoveIcon />}
            >
              کالا های مورد علاقه
            </Button>
          </Link>
          <Link href="/cart" className=" flex gap-5 text-lg">
            <Button
              className="w-full text-right"
              variant="light"
              startContent={<CartIcon />}
            >
              سبد خرید
            </Button>
          </Link>
        </div>
        <div>
          <div className="border-t-1 mt-auto   border-dashed dark:border-[#637381] border-gray-secondary-text-light flex-grow-1" />
          <div className="flex justify-center px-8 pt-4">
            <Button
              variant="light"
              color="danger"
              className="w-full"
              onPress={logOut}
              startContent={<TbLogout2 size={"1.5rem"} />}
            >
              خروج از حساب کاربری
            </Button>
          </div>
        </div>
      </aside>
      <section>{children}</section>
    </div>
  );
};
export default AccountLayout;
