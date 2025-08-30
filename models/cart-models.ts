import mongoose, { Schema } from "mongoose";
import { ProductSchema } from "./product-model";

const CartSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  products: { type: [ProductSchema], required: true }, 
});

export const CartModel =
  mongoose.models.CartProduct || mongoose.model("CartProduct", CartSchema);
