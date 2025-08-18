"use client";
import { SRC_BACK_END } from "@/helpers/local-paths";
import { useGetCategories } from "@/hooks/list-products-hooks";
import { Button } from "@heroui/button";
import Image from "next/image";
import Link from "next/link";
import { BiChevronLeft } from "react-icons/bi";

const TopCategories = () => {
  const categories = useGetCategories({ limit: 3, page: 1 });
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl text-center sm:text-right font-semibold text-title-text-light dark:text-white">
        محبوب ترین کتگوری ها{" "}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2  md:grid-rows-2  gap-6 py-6 px-10 md:px-0 ">
        {categories.data?.data.categories.map((item, index) => (
          <div
            key={index}
            className={`shadow dark:bg-[#28323D] bg-[#F4F6F8] px-6 py-8 rounded-xl  col-span-1 flex  ${
              index === 0 ? "gap-5 row-span-2 flex-col-reverse justify-between items-center" : "row-span-1 flex-col-reverse gap-4 sm:flex-row justify-between"
            }`}
          >
            <div className={`flex justify-between ${index===0 ?'flex-col md:flex-row w-full ':'flex-col'}`}>
              <span className=" text-lg md:text-4xl  font-semibold">{item.name}</span>
              <Link href={`/products?categories=${item.slugname}`}>
                <Button variant="light" className="text-lg md:text-xl">دیدن محصولات  <BiChevronLeft/></Button>
              </Link>
            </div>
            <div className="">
              <Image
                src={`${SRC_BACK_END}/images/categories/icons/${item.icon}`}
                alt={item.name}
                width={index===0? 350 : 250}
                className={`drop-shadow-2xl w-[200px] md:w-[350px]`}
                height={index===0? 350 : 250}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCategories;
