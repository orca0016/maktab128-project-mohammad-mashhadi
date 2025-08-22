"use client";
import RatingStars from "@/components/atoms/rating-star-product";
import { SRC_BACK_END } from "@/helpers/local-paths";
import { useGetListProduct } from "@/hooks/list-products-hooks";
import { separateNumbers } from "@/lib/seperator-numbers";
import Image from "next/image";
import Link from "next/link";

const CardProduct: React.FC<{ product: IProduct }> = ({ product }) => {
  return (
    <div className="dark:border-[#28323D] border-[#F4F6F8] hover:bg-[#F4F6F8] hover:dark:bg-[#28323D] transition-background border rounded-xl p-4 flex flex-col justify-between shadow">
      <div>
        <Image
          src={`${SRC_BACK_END}/images/products/thumbnails/${product.thumbnail}`}
          alt={product.name}
          width={100}
          height={100}
          className="w-full aspect-square dark:bg-[#28323D] bg-[#F4F6F8] rounded-lg px-2 mb-3"
        />
        <Link href={`/products/${product._id}`} className="my-3 font-bold">{product.name}</Link>
      </div>
      <div>
        <p className="my-1  text-custom-purple font-bold  ">
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
const SuggestionsProducts: React.FC<{
  title: string;
  category: string;
}> = ({ category, title }) => {
  const { data: ProductList } = useGetListProduct({
    limit: 6,
    page: 1,
    category,
  });

  return (
    <div className="container mx-auto py-10 space-y-10 ">
      <h1 className="text-3xl font-semibold text-center md:text-right">{title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 px-10 lg:px-0">
        {ProductList?.data.products.map((item, index) => (
          <CardProduct key={index} product={item} />
        ))}
      </div>
    </div>
  );
};

export default SuggestionsProducts;
