"use client";
import { PAGE_LIST_DASHBOARD } from "@/helpers/pages-list-dashboard";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { PressEvent } from "@heroui/button";
import Link from "next/link";

const SidebarDashboard = () => {
  const toggleBgItem = (e: PressEvent) => {
    if (e.target.className.includes("bg-[#C1C7CD]/10")) {
      e.target.classList.remove("bg-[#C1C7CD]/10");
    } else {
      e.target.classList.add("bg-[#C1C7CD]/10");
    }
  };
  return (
    <div className=" w-full min-h-full  pt-20  border-l dark:border-[#1C252E] border-[#F2F3F5] px-4">
      <h1 className="text-xl my-3 text-[#C1C7CD] font-bold px-5">مدیریت</h1>
      <Accordion
        selectionMode="multiple"
        variant="splitted"
        itemClasses={{
          base: "transition-background  bg-black/0 shadow-none p-0 text-[#C1C7CD]  ",
          trigger:
            "data-[hover=true]:bg-custom-purple/10   hover:dark:text-custom-purple    rounded-lg h-14 flex items-center px-2",
          title: "text-title-text-light dark:text-white",
          content: "pr-5 py-0 my-0",
        }}
        itemScope
      >
        {PAGE_LIST_DASHBOARD.map((item) => (
          <AccordionItem
            key={item.id}
            startContent={<item.icon />}
            title={item.category}
            onPress={(e) => toggleBgItem(e)}
          >
            <ul
              className={`border-[#919EAB] relative pt-2 pr-3 before:h-[calc(100%-28px)] dark:text-[] text-[#EDEFF2] line-ui-list-dashboard before:bg-[#edeff2]  dark:before:bg-[#282f37] space-y-2`}
            >
              {item.subCategory.map((e, i) => (
                <Link key={i} href={`${e.href}`}>
                  <li className=" relative  line-ui-list-item-dashboard dark:text-[#282F37] hover:bg-[#919EAB]/8 rounded-lg  p-2 after:bg-[#edeff2]  dark:after:bg-[#282f37]">
                    <span className="text-title-text-light dark:text-white">
                      {e.title}
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default SidebarDashboard;
