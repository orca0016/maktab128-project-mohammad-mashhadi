"use client";
import RatingStars from "@/components/atoms/rating-star-product";
import { SRC_BACK_END } from "@/helpers/local-paths";
import { useGetListProduct } from "@/hooks/list-products-hooks";
import { separateNumbers } from "@/lib/seperator-numbers";
import Image from "next/image";
import Link from "next/link";

const CardProduct: React.FC<{ product: IProduct; isLargeProduct?: string }> = ({
  product,
  isLargeProduct,
}) => {
  const defaultStyle = !!isLargeProduct
    ? isLargeProduct === "purple"
      ? "bg-[#EFD6FF] hover:bg-[#C684FF]"
      : "bg-[#FEE9D1] hover:bg-[#FDAB76]"
    : "dark:border-[#28323D] border-[#F4F6F8] hover:bg-[#F4F6F8] hover:dark:bg-[#28323D] border";
  return (
    <div
      className={`${defaultStyle}  transition-background  rounded-xl p-4 flex flex-col justify-between ${
        !!isLargeProduct ? "items-center" : "items-start"
      } shadow`}
    >
      <div className="w-full">
        <Image
          src={`${SRC_BACK_END}/images/products/thumbnails/${product.thumbnail}`}
          alt={product.name}
          width={100}
          height={100}
          className={`${
            !isLargeProduct
              ? " dark:bg-[#28323D] bg-[#F4F6F8]"
              : "drop-shadow-xl"
          }  w-full aspect-square  rounded-lg px-2 mb-3`}
        />
        {!!isLargeProduct && (
          <div className="text-lg text-center text-title-text-light">
            {product.brand}
          </div>
        )}
        <Link href={`/products/${product.slugname}`}>
          <h2
            className={`my-3 font-bold ${
              !!isLargeProduct && "text-title-text-light text-3xl text-center"
            }`}
          >
            {product.name}
          </h2>
        </Link>
      </div>
      <div >
        <p
          className={`my-1  text-custom-purple font-bold  ${
            !!isLargeProduct && "text-2xl mb-10"
          }`}
        >
          {separateNumbers(product.price)}
        </p>
        <RatingStars
          totalScore={product.rating.rate}
          totalVotes={product.rating.count}
          showNumbers={false}
        />
      </div>
    </div>
  );
};
const FeaturedProduct: React.FC<{
  title: string;
  category: string;
}> = ({ category, title }) => {
  const { data: productList } = useGetListProduct({
    limit: 6,
    page: 1,
    category,
  });
  const productCut = productList?.data.products.slice(2, 6);
  return (
    <div className="container mx-auto py-10 space-y-10 ">
      <h1 className="text-3xl font-semibold text-center md:text-right">
        {title}
      </h1>
      <div className="grid  grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 px-10 lg:px-0">
        {productList?.data.products[1] && (
          <CardProduct
            isLargeProduct="orange"
            product={productList.data.products[1]}
          />
        )}
        {productList?.data.products[0] && (
          <CardProduct
            isLargeProduct="purple"
            product={productList.data.products[0]}
          />
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 col-span-1 md:col-span-2 lg:col-span-1  gap-3 ">
          {productCut &&
            productCut.map((item, index) => (
              <CardProduct key={index} product={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
