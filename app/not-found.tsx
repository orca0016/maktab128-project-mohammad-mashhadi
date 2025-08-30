'use client'
import { Button } from '@heroui/button'
import Image from 'next/image'
import Link from 'next/link'
  
export default function NotFound() {
  return (
    <div className="dark:bg-gray-dark  flex items-center justify-center min-h-screen">
          <div className="max-w-[380px] flex flex-col gap-3 items-center px-4 text-enter">
            <h1 className="text-4xl font-semibold  text-custom-purple">
            صفحه پیدا نشد .
            </h1>
              <Image
                src="/images/forbidden/character-question.webp"
                width={100}
                height={280}
                alt="girl"
              />
            <p className="text-lg text-title-text-light dark:text-white text-center ">
             متاسفیم، ما نتوانستیم صفحه مورد نظر شما را پیدا کنیم. شاید آدرس اینترنتی (URL) را اشتباه تایپ کرده‌اید؟<br /> حتماً املای خود را بررسی کنید.</p>
            <div>
            </div>
            <Link href="/">
              <Button variant="solid" color="danger">
                برگشتن به صفحه اصلی
              </Button>
            </Link>
          </div>
        </div>
  )
}