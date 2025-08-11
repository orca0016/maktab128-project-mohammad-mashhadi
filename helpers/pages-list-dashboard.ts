import { OrderIcon, ShopIcon } from "@/components/atoms/icons";

export const PAGE_LIST_DASHBOARD = [
  {
    id: 1,
    category: "محصولات",
    icon: ShopIcon,
    subCategory: [
      {
        title: "لیست محصولات ",
        href: "/dashboard/products",
      },
      {
        title: "اضافه کردن محصول جدید  ",
        href: "/dashboard/products/new",
      },
    ],
  },
  {
    id: 2,
    category: "سفارشات",
    icon: OrderIcon,
    subCategory: [
      {
        title: "لیست سفارشات  ",
        href: "/dashboard/orders",
      },
    ],
  },
  {
    id: 3,
    category: "کاربران",
    icon: OrderIcon,
    subCategory: [
      {
        title: "لیست کاربران ",
        href: "/dashboard/users",
      },
      {
        title: "اضافه کردن کاربر جدید  ",
        href: "dashboard/users/new",
      },
      {
        title: "اضافه کردن کاربر جدید  ",
        href: "dashboard/users/new",
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
