import { OrderIcon, ShopIcon, UserIcon } from "@/components/atoms/icons";

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
      {
        title: "مدیریت موجودیت ها   ",
        href: "/dashboard/products/entities",
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
    icon: UserIcon,
    subCategory: [
      {
        title: "لیست کاربران ",
        href: "/dashboard/users",
      },
      {
        title: "اضافه کردن کاربر جدید  ",
        href: "dashboard/users/new",
      }
    ],
  },
];
