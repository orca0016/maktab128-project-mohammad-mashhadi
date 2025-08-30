import { axiosInstanceBackEnd } from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () =>
  useQuery<IResponseCategoryData>({
    queryKey: ["category-list"],
    queryFn: async () =>
      await axiosInstanceBackEnd()
        .get("api/categories")
        .then((res) => res.data),
  });

export const useSubcategories = (categoryId: string | undefined) =>
  useQuery<IResponseSubCategory>({
    queryKey: ["subcategories", categoryId],
    enabled: !!categoryId,
    queryFn: async () =>
      axiosInstanceBackEnd()
        .get("api/subcategories", { params: { category: categoryId } })
        .then((r) => r.data),
  });
