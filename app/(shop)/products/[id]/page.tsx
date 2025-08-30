"use client";

import { CartIcon } from "@/components/atoms/icons";
import RatingStars from "@/components/atoms/rating-star-product";
import { SRC_BACK_END } from "@/helpers/local-paths";
import { useCart } from "@/hooks/use-cart";
import { axiosInstanceBackEnd } from "@/lib/axios-instance";
import { separateNumbers } from "@/lib/seperator-numbers";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Chip,
  Spinner,
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/parallax";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ImagesSlider: React.FC<{ images: Array<string> }> = ({ images }) => {
  return (
    <>
      <Swiper
        effect="fade"
        className="min-h-full dark:bg-[#28323D] bg-[#F4F6F8] rounded-3xl"
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        style={
          {
            "--swiper-navigation-color": "#7635dc",
            "--swiper-pagination-color": "#7635dc",
          } as React.CSSProperties
        }
      >
        {images.map((item, index) => (
          <SwiperSlide
            key={index}
            className="w-full h-full p-3 md:p-10    flex items-center "
            data-swiper-parallax="-23%"
          >
            <Image
              src={`${SRC_BACK_END}/images/products/images/${item}`}
              alt="image product"
              width={1000}
              height={1000}
              className="w-full h-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

const AddToCart: React.FC<{ product: ISingleProduct }> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  return (
    <div className="flex items-start md:items-center flex-col md:flex-row gap-5">
      <ButtonGroup size="lg" isIconOnly color="default" variant="bordered">
        <Button
          className="border-1 border-[#E5E8EB] dark:border-[#2F373F] border-l-0 text-title-text-light dark:text-white"
          disabled={quantity === 1}
          onPress={() => setQuantity((prev) => prev - 1)}
        >
          <FaMinus />
        </Button>
        <Button
          className="border-x-0 bg-[#E5E8EB] dark:bg-[#2F373F] text-title-text-light dark:text-white"
          variant="bordered"
        >
          {separateNumbers(quantity)}
        </Button>
        <Button
          isIconOnly
          className="border-1 border-[#E5E8EB] dark:border-[#2F373F] border-r-0 text-title-text-light dark:text-white"
          disabled={quantity === product.quantity}
          onPress={() => setQuantity((prev) => prev + 1)}
        >
          <FaPlus />
        </Button>
      </ButtonGroup>
      <Button
        disabled={product.quantity === 0}
        onPress={() => {
          addToCart(product, quantity);
        }}
        color="default"
        variant="shadow"
        size="lg"
        className="bg-title-text-light w-fit text-white font-semibold dark:bg-white dark:text-title-text-light"
      >
        افزودن به سبد خرید <CartIcon />
      </Button>
    </div>
  );
};

const SingleProductPage = () => {
  const params = useParams();
  const { id } = params;
  const { data: productData, isPending } = useQuery<IResponseSingleProduct>({
    queryKey: ["product", id],
    queryFn: () =>
      axiosInstanceBackEnd()
        .get(`/api/products/${id}`)
        .then((res) => res.data),
  });
  const product = productData?.data.product;
  if (isPending)
    return (
      <div className="w-full h-[60vh] flex justify-center items-center">
        <Spinner color="secondary" label="درحال بارگذاری..." />
      </div>
    );
  if (!product) {
    return (
      <div className="w-full min-h-[50vh]">
        <h2 className="my-auto text-4xl text-center">
          محصول مورد نظر پیدا نشد .
        </h2>
      </div>
    );
  }
  return (
    <div className="container mx-auto py-10 px-8 md:px-0 min-h-[60vh]">
      <div className="pb-10">
        <Breadcrumbs
          size="lg"
          color="secondary"
          classNames={{
            base: "!text-black dark:text-white",
          }}
        >
          <BreadcrumbItem>
            <Link href="/">صفحه اصلی</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link href={`/products?category=${product.category.slugname}`}>
              {product.category.name}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>{product.name}</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="w-full h-full  grid grid-cols-1 md:grid-cols-2 sm:px-5 md:px-0">
        <div className="">
          <ImagesSlider images={product?.images ?? []} />
        </div>
        <div className="px-0 md:px-10  flex flex-col justify-between py-10 gap-6">
          <div>
            <div
              className={`mb-5 ${product.quantity <= 10 ? "block" : "hidden"}`}
            >
              <Chip color="danger" variant="flat">
                محدود
              </Chip>
            </div>
            <h1 className="text-4xl ">{product.name}</h1>
          </div>
          <div className="space-y-6">
            <div className="text-2xl dark:text-white text-title-text-light">
              <span className="text-2xl font-semibold ">قیمت : </span>
              {separateNumbers(product.price)}
              <span className="text-sm px-3">تومان</span>
            </div>
            <div>
              <span className="text-lg font-semibold">موجودی انبار : </span>
              {product.quantity} عدد
            </div>
            <div>
              <span className="text-lg font-semibold">طبقه بندی: </span>
              <span className="text-sm ">
                {product.category.name}{" "}
              </span>
              <span>/</span>
              <span className="text-sm ">
                {product.subcategory.name}{" "}
              </span>
            </div>
            <RatingStars
              totalScore={product.rating.rate}
              totalVotes={product.rating.count}
              showNumbers={true}
            />
            <AddToCart product={product} />
          </div>
        </div>
      </div>
      <div className="custom-styles py-10 ">
        <div dangerouslySetInnerHTML={{ __html: product.description }} />
      </div>
    </div>
  );
};

export default SingleProductPage;
