import {
  addCartItem,
  clearCart,
  deleteCartItem,
  updateCartItem,
} from "@/redux-slices/cart-slice";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";

export const useCart = () => {
  const dispatch = useAppDispatch();
  const productCart = useAppSelector(
    (state: RootState) => state.cart.productCart
  );

  return {
    productCart,
    getCartByProductId: (action: string) => {
      return productCart.find((item) => item.product._id === action);
    },
    addToCart: (product: ISingleProduct, quantity: number = 1) =>
      dispatch(addCartItem({ product, quantity })),
    removeFromCart: (productId: string) => dispatch(deleteCartItem(productId)),
    updateCart: (product: ISingleProduct, quantity: number) =>
      dispatch(updateCartItem({ productId: product._id, quantity })),
    clearCart: () =>
      dispatch(clearCart()),
  };
};
