'use client'
import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="w-full h-screen bg-slate-100  dark:bg-title-text-light flex items-center justify-center">
      <Spinner color="secondary" classNames={{label:'!text-title-text-light dark:!text-slate-100'}} label="درحال بارگذاری..." size="lg" />
    </div>
  );
}
