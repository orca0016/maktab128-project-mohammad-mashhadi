"use client";

import { Button } from "@heroui/button";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface Review {
  id: number;
  name: string;
  date: string;
  text: string;
  rating: number;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "حسین محمدی",
    date: "15 مرداد 1404",
    text: "تجربه فوق‌العاده‌ای بود، خیلی راضی هستم. از تیم فروشگاه مینیمال واقعاً ممنونم.",
    rating: 5,
  },
  {
    id: 2,
    name: "زهرا کریمی",
    date: "16 مرداد 1404",
    text: "محصول دقیقاً همونی بود که انتظار داشتم. کیفیت عالی و پشتیبانی سریع.",
    rating: 5,
  },
  {
    id: 3,
    name: "علی رضایی",
    date: "17 مرداد 1404",
    text: "خرید آسون و ارسال سریع. خیلی ممنون از فروشگاه مینیمال.",
    rating: 5,
  },
  {
    id: 4,
    name: "نگین احمدی",
    date: "18 مرداد 1404",
    text: "محصولات با کیفیت و تیم پشتیبانی عالی. مطمئناً دوباره خرید می‌کنم.",
    rating: 5,
  },
  {
    id:5,
    name: "مهدی مشفق",
    date: "18 مرداد 1404",
    text: "بهترین خدماتو من از این سایت تونستم بگیرم خیلی ممنون از وب سایت مینیمال.",
    rating: 5,
  }
];

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ms-1 ${
              i < rating ? "text-yellow-400" : "text-gray-300"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        ))}
    </div>
  );
};

const PopularReviews = () => {
  return (
    <div className="w-full py-10 ">
      <div className="container mx-auto px-4 md:px-0">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">نظرات مشتریان</h2>
          <div className="flex gap-2">
            <Button
              isIconOnly
              variant="light"
              className="custom-prev !static w-10 h-10 flex items-center justify-center rounded-full  dark:text-white text-title-text-light  "
            >
              <BiChevronRight className="w-5 h-5" />
            </Button>
            <Button
              isIconOnly
              variant="light"
              className="custom-next !static w-10 h-10 flex items-center justify-center rounded-full  dark:text-white text-title-text-light  "
            >
              <BiChevronLeft className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id} >
              <div className="dark:bg-[#28323D] bg-[#F4F6F8] my-6  rounded-2xl p-4 shadow-md h-full flex flex-col justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">{review.date}</p>
                  <h3 className="font-bold mb-2">{review.name}</h3>
                  <RatingStars rating={review.rating} />
                  <p className="dark:text-gray-300 text-[#717F88] text-sm mt-3 leading-relaxed">
                    {review.text}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
export default PopularReviews;
