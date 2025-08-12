"use client";

import { useQuery } from "@tanstack/react-query";
import UserAccessMenu from "../atoms/user-access-menu";
import { axiosInstanceBackEnd } from "@/lib/axios-instance";

const AuthorizeUserAction = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("user-id") : null;

  const userQuery = useQuery<IResponseUserData>({
    queryKey: ["user", userId, token],
    enabled: !!token && !!userId,
    queryFn: async () => {
      return axiosInstanceBackEnd().get(`api/users/${userId}`).then(res=>res.data)
    },
  });

  if (!token || !userId) {
    return <UserAccessMenu />;
  }

  if (userQuery.isSuccess) {
    return <UserAccessMenu user={userQuery.data?.data.user} />;
  }

  return <UserAccessMenu />;
};
export default AuthorizeUserAction;
