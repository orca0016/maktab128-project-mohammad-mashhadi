import { Schema } from "mongoose";

interface ICategory {
  _id: string;
  name: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
  slugname: string;
  __v: number;
}

interface ISubCategory {
  _id: string;
  name: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  slugname: string;
  __v: number;
}

interface IRating {
  rate: number;
  count: number;
}

export interface ISingleProduct {
  _id: string;
  rating: IRating;
  category: ICategory;
  subcategory: ISubCategory;
  name: string;
  description: string;
  price: number;
  quantity: number;
  brand: string;
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  slugname: string;
  __v: number;
}

const RatingSchema = new Schema<IRating>({
  rate: { type: Number, required: true },
  count: { type: Number, required: true },
});

const CategorySchema = new Schema<ICategory>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  icon: { type: String, required: true },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true },
  slugname: { type: String, required: true },
  __v: { type: Number, required: true },
});

const SubCategorySchema = new Schema<ISubCategory>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true },
  slugname: { type: String, required: true },
  __v: { type: Number, required: true },
});

export const ProductSchema = new Schema<{
  data: ISingleProduct;
  quantity: number;
}>({
  data: {
    _id: { type: String, required: true },
    rating: { type: RatingSchema, required: true },
    category: { type: CategorySchema, required: true },
    subcategory: { type: SubCategorySchema, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    brand: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images: { type: [String], required: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
    slugname: { type: String, required: true },
    __v: { type: Number, required: true },
  },
  quantity: { type: Number, required: true },
});
