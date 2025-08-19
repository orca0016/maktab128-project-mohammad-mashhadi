import { axiosInstanceBackEnd } from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

export function useGetListProduct({
  page,
  limit,
  sort,
  highestPrice,
  lowestPrice,
  subCategory,
  category,
}: {
  page: number;
  category?: string | null;
  subCategory?: string | null;
  sort?: string | null;
  lowestPrice?: string | null;
  highestPrice?: string | null;
  limit: number;
}) {
  return useQuery<IResponseProduct>({
    queryKey: [
      "product-list",
      page,
      limit,
      category,
      sort,
      lowestPrice,
      highestPrice,
      subCategory,
    ],
    queryFn: async () =>
      axiosInstanceBackEnd()
        .get("/api/products", {
          params: {
            page,
            limit,
            sort,
            category,
            subcategory:subCategory,
            "price[gte]": highestPrice,
            "price[lte]": lowestPrice,
          },
        })
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
