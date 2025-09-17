"use client";
import { convertDate } from "@/helpers/miladi-to-shamsi";
import { axiosInstanceBackEnd } from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

const PersonalAccountPage = () => {
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("user-id") : null;
  const { data: userData, isLoading } = useQuery<IResponseSingleUser>({
    queryKey: ["personal-user-data"],
    enabled: !!userId,
    queryFn: async () => {
      return await axiosInstanceBackEnd()
        .get(`/api/users/${userId}`)
        .then((res) => res.data);
    },
  });
  const user = userData?.data.user;
  if (!user) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <h1 className="text-3xl">
          {!isLoading ? " اطلاعات کاربری پیدا نشد" : "درحال بارگذاری..."}{" "}
        </h1>
      </div>
    );
  }

  return (
    <>
      <div className="min-w-[300px] h-full border border-[#E5E8EB] dark:border-[#323A42]  rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-center mb-4">
          <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full text-2xl font-bold text-purple-600">
            {user.firstname.charAt(0).toUpperCase()}
          </div>
        </div>

        <h2 className="text-xl font-semibold text-center mb-2 text-title-text-light dark:text-white mt-auto">
          {user.firstname} {user.lastname}
        </h2>
        <p className="text-title-text-light dark:text-white text-center mb-4">
          @{user.username}
        </p>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <span className="font-medium text-title-text-light dark:text-white">
              شماره موبایل:
            </span>
            <span className="text-title-text-light/90 dark:text-white/90">
              {user.phoneNumber}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="font-medium text-title-text-light dark:text-white">
              آدرس:
            </span>
            <span className="text-title-text-light/90 dark:text-white/90">
              {user.address}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="font-medium text-title-text-light dark:text-white">
              نقش:
            </span>
            <span className="text-title-text-light/90 dark:text-white/90">
              {user.role === "ADMIN" ? "ادمین" : "کاربر عادی"}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="font-medium text-title-text-light dark:text-white">
              تاریخ ساخت:
            </span>
            <span className="text-title-text-light/90 dark:text-white/90">
              {convertDate(user.createdAt).jalaliDate}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalAccountPage;
