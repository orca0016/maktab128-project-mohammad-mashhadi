"use client";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

export default function Forbidden() {
  return (
    <div className="dark:bg-gray-dark  flex items-center justify-center min-h-screen">
      <div className="max-w-[380px] flex flex-col gap-3 items-center px-4 text-enter">
        <h1 className="text-4xl font-semibold  text-custom-purple">
          دسترسی رد شد{" "}
        </h1>
        <p className="text-lg text-title-text-light dark:text-white text-center ">
          صفحه‌ای که می‌خواهید به آن دسترسی پیدا کنید، دسترسی محدود دارد.
        </p>
        <p>لطفاً با مدیر  تماس بگیرید.</p>
        <div>
          <Image
            src="/images/forbidden/girl-allowed.webp"
            width={100}
            height={280}
            alt="girl"
          />
        </div>
        <Link href="/">
          <Button variant="solid" color="danger">
            برگشتن به صفحه اصلی
          </Button>
        </Link>
      </div>
    </div>
  );
}
