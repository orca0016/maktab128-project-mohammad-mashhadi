"use client";
import { SRC_BACK_END } from "@/helpers/local-paths";
import { useCategories } from "@/hooks/category-list";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LandingCategoriesSection = () => {
  const categories = useCategories({ limit: 6 });
  const router = useRouter();
  return (
    <div className="container mx-auto py-18">
      <h1 className="text-4xl text-center md:text-right text-title-text-light dark:text-white dark:text-light font-semibold">
        دسته بندی ها
      </h1>
      <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-6 gap-6 py-6 px-4 md:px-1">
        {categories.data?.data.categories.map((item) => (
          <div
            className="p-6 rounded-xl cursor-pointer shadow transition-background hover:bg-[#EDEFF1] border-[#EDEFF1] dark:border-[#282F37] hover:dark:bg-[#282F37] border-1 flex flex-col items-center"
            onClick={() => router.push(`/products?category=${item.slugname}`)}
            key={item._id}
          >
            <Image
              src={`${SRC_BACK_END}/images/categories/icons/${item.icon}`}
              alt="category image"
              width={100}
              height={100}
              className="w-14 h-14  aspect-square"
            />
            <h2 className="text-title-text-light dark:text-white text-center mt-3 font-bold">
              {item.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingCategoriesSection;
