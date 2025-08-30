import dbConnect from "@/lib/db-conection";
import { CartModel } from "@/models/cart-models";

class CartController {
  public async getAllPRoduct({ userId }: { userId: string }) {
    await dbConnect();
    const carts = await CartModel.findOne({ userId });
    if (!carts) return null;
    return carts;
  }
  public async getProductById({
    userId,
    productId,
  }: {
    userId: string;
    productId: string;
  }) {
    await dbConnect();
    const carts = await CartModel.findOne({ userId });
    if (!carts) return null;
    carts.products = carts.products.find(
      (item: { data: ISingleProduct; quantity: number }) =>
        item.data._id === productId
    );
    return carts;
  }
  public async addProduct({
    userId,
    quantity,
    product,
  }: {
    userId: string;
    quantity: number;
    product: ISingleProduct;
  }) {
    await dbConnect();

    const existingCart = await CartModel.findOne({ userId });

    if (existingCart) {
      const productExists = existingCart.products.some(
        (item: { data: ISingleProduct; quantity: number }) =>
          item.data._id === product._id
      );

      if (productExists) {
        existingCart.products = existingCart.products.map(
          (item: { data: ISingleProduct; quantity: number }) =>
            item.data._id === product._id ? { data: product, quantity } : item
        );
      } else {
        existingCart.products.push({ data: product, quantity });
      }

      await existingCart.save();
      return existingCart;
    } else {
      const newCart = new CartModel({
        userId,
        products: [{ data: product, quantity }],
      });
      await newCart.save();
      return newCart;
    }
  }
  public async removeProduct({
    userId,
    productId,
  }: {
    userId: string;
    productId: string;
  }) {
    await dbConnect();

    const cart = await CartModel.findOne({ userId });
    if (!cart) return null;

    cart.products = cart.products.filter(
      (p: { data: ISingleProduct; quantity: number }) =>
        p.data._id !== productId
    );
    await cart.save();
    return cart;
  }
  public async clearCart({ userId }: { userId: string }) {
    await dbConnect();

    const cart = await CartModel.deleteMany({ userId });

    return cart;
  }
}

export const CartServices = new CartController();
