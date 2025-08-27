import { addToast } from "@heroui/toast";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  product: ISingleProduct;
  quantity: number;
};

export interface CartState {
  productCart: CartItem[];
}

const initialState: CartState = {
  productCart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<CartItem>) => {
      const existing = state.productCart.find(
        (item) => item.product._id === action.payload.product._id
      );
      if (existing) {
        existing.quantity += action.payload.quantity;
        addToast({
          title: "بروز شد.",
          description: "سبد خرید شما بروز رسانی شد .",
          color: "secondary",
        });
      } else {
        state.productCart.push(action.payload);
        addToast({
          title: "افزوده شد .",
          description: "این محصول به سبد خرید شما اضافه شد .",
          color: "success",
        });
      }
    },

    deleteCartItem: (state, action: PayloadAction<string>) => {
      state.productCart = state.productCart.filter(
        (item) => item.product._id !== action.payload
      );
      addToast({
        title: "پاک شد .",
        description: "محصول حذف شد .",
        color: "danger",
      });
    },

    updateCartItem: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const item = state.productCart.find(
        (item) => item.product._id === action.payload.productId
      );
      if (item) {
        item.quantity = action.payload.quantity;
        addToast({
          title: "بروز شد.",
          description: "سبد خرید شما بروز رسانی شد .",
          color: "secondary",
        });
      }
    },
    
    clearCart: (state) => {
      state.productCart = [];
      addToast({
        title: "موفق.",
        description: "سبد خرید شما پاک شد .",
        color: "success",
      });
    },
  },
});

export const { addCartItem, deleteCartItem, updateCartItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
