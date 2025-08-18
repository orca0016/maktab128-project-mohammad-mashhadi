import { axiosInstanceBackEnd } from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

export const useCategories = (params: {
  limit?: number;
  category?: string;
}) => {
  return useQuery<IResponseCategoryData>({
    queryKey: ["categories", params],
    queryFn: async () => {
      const res = await axiosInstanceBackEnd().get("api/categories", {
        params,
      });
      return res.data;
    },
    staleTime: 1000 * 60,
  });
};

export const useSubCategories = (params: {
  limit?: number;
  category?: string;
}) => {
  return useQuery<IResponseSubCategory>({
    queryKey: ["subCategories", params],
    queryFn: async () => {
      const res = await axiosInstanceBackEnd().get("api/subCategories", {
        params,
      });
      return res.data;
    },
    staleTime: 1000 * 60,
  });
};
