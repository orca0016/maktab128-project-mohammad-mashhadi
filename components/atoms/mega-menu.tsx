"use client";
import { useCategories, useSubCategories } from "@/hooks/category-list";
import { Badge } from "@heroui/badge";
import { Button } from "@heroui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import Link from "next/link";
import { useMemo } from "react";
import { FiMenu } from "react-icons/fi";
import { TiArrowBack } from "react-icons/ti";
import { CartIcon, LoveIcon } from "./icons";

const MegaMenu = () => {
  const categoryData = useCategories({});
  const subCategoryData = useSubCategories({ limit: 1000 });

  const subCategoryReCords = useMemo(() => {
    const objectHashmap: { [key: string]: ISubCategory } = {};
    const data = subCategoryData?.data?.data.subcategories ?? [];
    for (let item = 0; item < data.length; item++) {
      objectHashmap[data[item]._id] = data[item];
    }
    return objectHashmap;
  }, [subCategoryData]);

  return (
    <div className="  bg-[url(/assets/overlay.webp)]  bg-gradient-to-b bg-center bg-no-repeat bg-cover w-full">
      <div className=" w-full h-16  dark:bg-[#141a21]/80 bg-white/70   ">
        <div className="container h-full flex items-center justify-between px-6 md:px-24 py-2 mx-auto">
          <Popover
            classNames={{
              content: "w-[95vw] right-30 top-10 bg-shadow-drawer",
            }}
            placement="bottom-start"
          >
            <PopoverTrigger>
              <Button variant="light" className="font-bold">
                <FiMenu size={"1.3rem"} />
                دسته بندی ها
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2 w-full flex flex-col flex-now-wrap lg:flex-wrap box-border h-[70vh] md:h-[80vh] overflow-y-auto gap-10">
                {categoryData.data?.data.categories.map((item) => (
                  <div key={item._id}>
                    <Link href={`/products?category=${item.slugname}`}>
                      <h1 className="text-2xl my-2 font-semibold flex gap-1">
                        <TiArrowBack />
                        {item.name}
                      </h1>
                    </Link>
                    {Object.values(subCategoryReCords)
                      .filter((sub) => sub.category === item._id)
                      .map((sub) => (
                        <Link
                          href={`/products?subcategory=${sub.slugname}`}
                          key={sub._id}
                        >
                          <p className="px-5 my-3">{sub.name}</p>
                        </Link>
                      ))}
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <div className="space-x-4 text-title-text-light dark:text-white">
            <Badge
              placement="top-left"
              color="secondary"
              showOutline={false}
              content="5"
            >
              <Link href={"/wishlist"}>
                <LoveIcon />
              </Link>
            </Badge>
            <Badge
              placement="top-left"
              color="success"
              showOutline={false}
              content="1"
            >
              <Link href={"/cart"}>
                <CartIcon />
              </Link>
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
