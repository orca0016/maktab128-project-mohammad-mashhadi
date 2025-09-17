"use client";
import { axiosInstanceBackEnd } from "@/lib/axios-instance";
import { Spinner } from "@heroui/react";
import { addToast } from "@heroui/toast";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathName = usePathname();

  const { isPending, isError } = useQuery<{ id?: string; role?: string }>(
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
    <div className="flex justify-center flex-wrap gap-10 container mx-auto py-20 min-h-[80vh]">
      {children}
    </div>
  );
};
export default AccountLayout;
