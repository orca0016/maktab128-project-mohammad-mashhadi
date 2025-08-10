import { OrderIcon, ShopIcon } from "@/components/atoms/icons";

export const PAGE_LIST_DASHBOARD = [
  {
    id:1,
    category: "محصولات",
    icon: ShopIcon,
    subCategory: [
      {
        title: "لیست محصولات ",
        href: "/products",
      },
      {
        title: "اضافه کردن محصول جدید  ",
        href: "/products/new",
      },
    ],
  },
  {
    id:2,
    category: "سفارشات",
    icon: OrderIcon,
    subCategory: [
      {
        title: "لیست سفارشات  ",
        href: "/orders",
      },
    ],
  },
  {
    id:3,
    category: "کاربران",
    icon: OrderIcon,
    subCategory: [
      {
        title: "لیست کاربران ",
        href: "/users",
      },
      {
        title: "اضافه کردن کاربر جدید  ",
        href: "/users/new",
      },
      {
        title: "اضافه کردن کاربر جدید  ",
        href: "/users/new",
      },
      {
        title: "اضافه کردن کاربر جدید  ",
        href: "/users/new",
      },
      {
        title: "اضافه کردن کاربر جدید  ",
        href: "/users/new",
      },
    ],
  },
];
