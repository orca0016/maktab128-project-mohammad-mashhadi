"use client";
import { useCategories, useSubCategories } from "@/hooks/category-list";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Button, Switch } from "@heroui/react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { TiArrowBack } from "react-icons/ti";
import { NumericFormat } from "react-number-format";

const CategoriesAccordion = () => {
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
    <Accordion
      showDivider={false}
      isCompact
      items={categoryData.data?.data.categories ?? []}
    >
      {(categoryData.data?.data.categories ?? []).map((item) => (
        <AccordionItem
          classNames={{
            subtitle: "border-none bg-gray-500",
            title: "text-title-text-light dark:text-white",
          }}
          key={item._id}
          aria-label={item.name}
          title={item.name}
        >
          <Link href={{ pathname: "", query: { category: item.slugname } }}>
            <h1 className=" px-2 my-2 font-semibold flex gap-1">
              <TiArrowBack />
              {item.name}
            </h1>
          </Link>
          {Object.values(subCategoryReCords)
            .filter((sub) => sub.category === item._id)
            .map((sub) => (
              <Link
                href={{
                  pathname: "",
                  query: { subcategory: sub.slugname },
                }}
                key={sub._id}
              >
                <p className="px-2 my-3">{sub.name}</p>
              </Link>
            ))}
        </AccordionItem>
      ))}
    </Accordion>
  );
};
const PriceFiltering = () => {
  const [lowPrice, setLowPrice] = useState("");
  const [highPrice, setHighPrice] = useState("");
  const [isSortPrice, setIsSortPrice] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const lPrice = searchParams.get("lowPrice") || "";
    const hPrice = searchParams.get("highPrice") || "";
    setLowPrice(lPrice);
    setHighPrice(hPrice);
  }, [searchParams]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (lowPrice === "") params.delete("lowPrice");
      else params.set("lowPrice", String(lowPrice));

      if (highPrice === "") params.delete("highPrice");
      else params.set("highPrice", String(highPrice));

      if (Number(highPrice) < Number(lowPrice)) {
        params.delete("highPrice");
      }

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 500);

    return () => clearTimeout(handler);
  }, [lowPrice, highPrice, pathname, router, searchParams]);

  const onChangeSortPrice = (isSort: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", isSort ? "price" : "-price");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  return (
    <div>
      <div className="flex flex-col  gap-5 my-6">
        <NumericFormat
          className="dark:bg-[#1D242B] bg-[#F4F6F8] p-2 rounded-lg h-fit py-3 w-auto outline-0"
          value={lowPrice}
          placeholder="کم ترین قیمت"
          thousandSeparator=","
          onValueChange={(e) => {
            setLowPrice(e.value);
          }}
        />
        <NumericFormat
          className={`dark:bg-[#1D242B] bg-[#F4F6F8] p-2 rounded-lg h-fit py-3 w-auto  outline-0 ${
            Number(highPrice) < Number(lowPrice) && highPrice !== ""
              ? "outline-red-500 outline-2"
              : "outline-0"
          }`}
          value={highPrice}
          placeholder="بیشترین قیمت "
          thousandSeparator=","
          onValueChange={(e) => {
            setHighPrice(e.value);
          }}
        />
      </div>
      <Switch
        size="sm"
        color="secondary"
        classNames={{ label: "text-title-text-light dark:text-white" }}
        isSelected={isSortPrice}
        onValueChange={(e) => {
          setIsSortPrice(e);
          onChangeSortPrice(e);
        }}
      >
        کم ترین به بیشترین قیمت{" "}
      </Switch>
    </div>
  );
};

const SidebarProducts = () => {
  const router = useRouter();
  const pathname = usePathname();

  const clearFilters = () => {
    router.replace(`${pathname}`, { scroll: false });
  };
  return (
    <div className="flex flex-col gap-10 sticky top-20">
      <Accordion>
        <AccordionItem
          classNames={{ title: "text-title-text-light dark:text-white" }}
          title="دسته بندی ها"
          indicator={<FaPlus />}
        >
          <CategoriesAccordion />
        </AccordionItem>
        <AccordionItem
          classNames={{ title: "text-title-text-light dark:text-white" }}
          title="فیلتر قیمت"
          indicator={<FaPlus />}
        >
          <PriceFiltering />
        </AccordionItem>
      </Accordion>
      <Button
        onPress={clearFilters}
        variant="shadow"
        color="secondary"
        className="w-full"
      >
        <FaRegTrashAlt />
        پاک کردن تمام فیلتر ها
      </Button>
    </div>
  );
};

export default SidebarProducts;
