import { SRC_BACK_END } from "@/helpers/local-paths";
import { separateNumbers } from "@/lib/seperator-numbers";
import { Chip } from "@heroui/react";
import Image from "next/image";
import RatingStars from "./rating-star-product";
import Link from "next/link";

const ProductCard: React.FC<{ product: IProduct }> = ({ product }) => {
  return (
    <Link href={`products/${product._id}`} className="">
      <div className="aspect-square dark:bg-[#28323D] bg-[#F4F6F8] rounded-xl p-3 relative flex items-center justify-center">
        <div className={`absolute left-1.5 top-2 ${product.quantity<=10?'block':"hidden"}`}>
          <Chip color="danger" variant="flat">
             محدود 
          </Chip>
        </div>
        <Image
          src={`${SRC_BACK_END}/images/products/thumbnails/${product.thumbnail}`}
          alt={product.name}
          width={250}
          height={250}
          className="w-full"
        />
      </div>
      <div className="pt-4">
        <h4 className="text-sm dark:text-[#425565]">{product.brand}</h4>
        <h2 className="text-xl dark:text-white text-title-text-light">
          {product.name}
        </h2>
        <p className="text-sm dark:text-white text-title-text-light">
          {separateNumbers(product.price)}
        </p>
        <div className="mt-auto">
          <RatingStars
            totalScore={product.rating.rate}
            totalVotes={product.rating.count}
            showNumbers={true}
          />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
