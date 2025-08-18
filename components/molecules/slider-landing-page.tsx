"use client";
import { Button } from "@heroui/button";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/parallax";
import { Autoplay, Pagination, Parallax } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const SliderLandingPage = () => {
  return (
    <div className="w-full min-h-fit  bg-[url('/assets/overlay-2.webp')] bg-cover bg-no-repeat bg-center">
      <Swiper
        effect="fade"
        className="min-h-full backdrop-blur-lg bg-slate-50/30 dark:bg-[#000]/70"
        spaceBetween={50}
        slidesPerView={1}
        speed={1500}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        modules={[Parallax, Pagination, Autoplay]}
        style={
          {
            "--swiper-navigation-color": "#7635dc",
            "--swiper-pagination-color": "#7635dc",
          } as React.CSSProperties
        }
      >
        <SwiperSlide
          className="w-full h-full px-6  md:px-20 py-18 flex items-center "
          data-swiper-parallax="-23%"
        >
          <div className="w-full h-full   items-center  grid grid-cols-1 md:grid-cols-2">
            <div className="space-y-8 pb-10 md:pb-0 flex flex-col items-center md:items-start order-2 md:order-1">
              <h1
                className="text-3xl/15 line text-center md:text-right sm:text-3xl/18 md:text-4xl/18 lg:text-5/18 text-black dark:text-white font-semibold"
                data-swiper-parallax="-100"
              >
                بهترین محصول امسال
              </h1>
              <p
                data-swiper-parallax="-200"
                className="text-center md:text-right"
              >
                این محصول با کیفیت خوب و قیت پایین یکی از بهترین محصولات امسال
                شد شما میتونید این محصول رو با ارسال رایگان تهیه کنید
              </p>
              <Link href="/products">
                <Button
                  data-swiper-parallax="-300"
                  size="lg"
                  className="mx-auto md:mx-0"
                  color="secondary"
                  variant="shadow"
                >
                  همین الان بخرید
                  <IoIosArrowBack />
                </Button>
              </Link>
            </div>
            <div className="order-1 md:order-2">
              <Image
                src={"/images/test.webp"}
                alt="product"
                width={500}
                height={500}
                className="w-[70%] m-auto"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide
          className="w-full h-full px-6  md:px-20 py-18 flex items-center"
          data-swiper-parallax="-23%"
        >
          <div className="w-full h-full   items-center  grid grid-cols-1 md:grid-cols-2">
            <div className="space-y-8 pb-10 md:pb-0 flex flex-col items-center md:items-start order-2 md:order-1">
              <h1
                className="text-3xl/15 line text-center md:text-right sm:text-3xl/18 md:text-4xl/18 lg:text-5/18 font-semibold"
                data-swiper-parallax="-100"
              >
                بهترین محصول امسال
              </h1>
              <p
                data-swiper-parallax="-200"
                className="text-center md:text-right"
              >
                این محصول با کیفیت خوب و قیت پایین یکی از بهترین محصولات امسال
                شد شما میتونید این محصول رو با ارسال رایگان تهیه کنید
              </p>
              <Link href="/products">
                <Button
                  data-swiper-parallax="-300"
                  size="lg"
                  className="mx-auto md:mx-0"
                  color="secondary"
                  variant="shadow"
                >
                  همین الان بخرید
                  <IoIosArrowBack />
                </Button>
              </Link>
            </div>
            <div className="order-1 md:order-2">
              <Image
                src={"/images/test.webp"}
                alt="product"
                width={500}
                height={500}
                className="w-[70%] m-auto"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide
          className="w-full h-full px-6  md:px-20 py-18 flex items-center"
          data-swiper-parallax="-23%"
        >
          <div className="w-full h-full   items-center  grid grid-cols-1 md:grid-cols-2">
            <div className="space-y-8 pb-10 md:pb-0 flex flex-col items-center md:items-start order-2 md:order-1">
              <h1
                className="text-3xl/15 line text-center md:text-right sm:text-3xl/18 md:text-4xl/18 lg:text-5/18 font-semibold"
                data-swiper-parallax="-100"
              >
                بهترین محصول امسال
              </h1>
              <p
                data-swiper-parallax="-200"
                className="text-center md:text-right"
              >
                این محصول با کیفیت خوب و قیت پایین یکی از بهترین محصولات امسال
                شد شما میتونید این محصول رو با ارسال رایگان تهیه کنید
              </p>
              <Link href="/products">
                <Button
                  data-swiper-parallax="-300"
                  size="lg"
                  className="mx-auto md:mx-0"
                  color="secondary"
                  variant="shadow"
                >
                  همین الان بخرید
                  <IoIosArrowBack />
                </Button>
              </Link>
            </div>
            <div className="order-1 md:order-2">
              <Image
                src={"/images/test.webp"}
                alt="product"
                width={500}
                height={500}
                className="w-[70%] m-auto"
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SliderLandingPage;
