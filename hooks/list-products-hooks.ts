import { axiosInstanceBackEnd } from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

export function useGetListProduct({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  return useQuery<IResponseProduct>({
    queryKey: ["product-list", page, limit], 
    queryFn: async () =>
      axiosInstanceBackEnd()
        .get("/api/products", { params: { page, limit } })
        .then((r) => r.data),
  });
}

export const useGetSubCategories = ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) =>
  useQuery<IResponseSubCategory>({
    queryKey: ["subCategory-list"],
    queryFn: async () =>
      axiosInstanceBackEnd()
        .get("/api/subcategories", {
          params: {
            limit,
            page,
          },
        })
        .then((res) => res.data),
  });
export const useGetCategories = ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) =>
  useQuery<IResponseCategoryData>({
    queryKey: ["category-list"],
    queryFn: async () =>
      axiosInstanceBackEnd()
        .get("/api/categories", {
          params: { limit, page },
        })
        .then((res) => res.data),
  });
