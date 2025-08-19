"use client";

import ProductCard from "@/components/atoms/product-card";
import { useGetCategories, useGetListProduct, useGetSubCategories } from "@/hooks/list-products-hooks";
import { Pagination, Spinner } from "@heroui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const ProductsListGrid = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const limit = 12;
  const [queries, setQueries] = useState({
    page: Number(searchParams.get("page")) || 1,
    category: searchParams.get("category"),
    subCategory: searchParams.get("subcategory"),
    sort: searchParams.get("sort"),
    lowPrice: searchParams.get("lowPrice"),
    highPrice: searchParams.get("highPrice"),
  });
  useEffect(() => {
    const p = Number(searchParams.get("page")) || 1;
    const category = searchParams.get("category");
    const subCategory = searchParams.get("subcategory");
    const sort = searchParams.get("sort");
    const lowPrice = searchParams.get("lowPrice");
    const highPrice = searchParams.get("highPrice");
    setQueries((prev) => ({
      ...prev,
      category,
      subCategory,
      sort,
      highPrice,
      lowPrice,
      page: p,
    }));
  }, [searchParams]);

  const { data: categoryData } = useGetCategories({ page: 1, limit: 1000 });
  const { data: subCategoryData } = useGetSubCategories({
    page: 1,
    limit: 1000,
  });

  const categoryReCords = useMemo(() => {
    const objectHashmap: { [key: string]: ICategory } = {};
    const data = categoryData?.data.categories ?? [];
    for (let item = 0; item < data.length; item++) {
      objectHashmap[data[item].slugname] = data[item];
    }
    return objectHashmap;
  }, [categoryData]);

  const subCategoryReCords = useMemo(() => {
    const objectHashmap: { [key: string]: ISubCategory } = {};
    const data = subCategoryData?.data.subcategories ?? [];
    for (let item = 0; item < data.length; item++) {
      objectHashmap[data[item].slugname] = data[item];
    }
    return objectHashmap;
  }, [subCategoryData]);

  const { data: products, isPending } = useGetListProduct({
    limit,
    page: queries.page,
    sort: queries.sort,
    lowestPrice: queries.highPrice,
    highestPrice: queries.lowPrice,
    category:categoryReCords[queries.category||'']?._id ||null,
    subCategory:subCategoryReCords[queries.subCategory||'']?._id||null
  });

  const handlePageChange = (p: number) => {
    if (p === 0) return;
    setQueries((prev) => ({
      ...prev,
      page: p,
    }));
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    router.replace(`${pathname}?${params.toString()}`, { scroll: true });
  };

  if (isPending)
    return (
      <div className="w-full h-full flex justify-center items-center ">
        <Spinner
          variant="gradient"
          color="secondary"
          label="درحال بارگذاری..."
        />
      </div>
    );
  return (
    <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products?.data.products.map((item) => (
        <ProductCard key={item._id} product={item} />
      ))}
      {products?.data.products.length === 0 && (
        <h1 className="col-span-full  text-3xl text-center my-auto">
          هیچ محصولی با این مشخصات پیدا نشد.
        </h1>
      )}
      <div className="flex w-full justify-center py-2 col-span-full">
        <Pagination
          key={JSON.stringify(products?.data.products)}
          dir="ltr"
          classNames={{
            item: "bg-current/10 ",
            next: "bg-current/10 ",
            prev: "bg-current/10 ",
          }}
          showControls
          showShadow
          color="secondary"
          page={queries.page}
          total={products?.total_pages || 1}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ProductsListGrid;
