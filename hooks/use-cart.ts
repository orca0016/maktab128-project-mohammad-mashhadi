import { cartItem } from "@/components/atoms/cart-table-cell-list";
import { queryClient } from "@/context/query-provider";
import { axiosInstance } from "@/lib/axios-instance";
import { RootState, useAppSelector } from "@/store/store";
import { addToast } from "@heroui/toast";
import { useMutation, useQuery } from "@tanstack/react-query";

interface IUseCart {
  productCart: {
    userId: string;
    _id: string;
    products: Array<cartItem>;
  };
  removeFromCart: (productId: string) => void;
  addToCart: (product: ISingleProduct, quantity: number) => void;
  clearCart: () => void;
  getCartByProductId: (action: string) => unknown;
}
export const useCart = (): IUseCart => {
  const productCart = useAppSelector(
    (state: RootState) => state.cart.productCart
  );
  const newProduct = useMutation({
    mutationFn: async ({
      product,
      quantity,
    }: {
      product: ISingleProduct;
      quantity: number;
    }) =>
      await axiosInstance().post("/api/cart", {
        userId: localStorage.getItem("user-id") || "",
        product,
        quantity,
      }),
    mutationKey: ["new-product-server"],
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["data-carts"],
      });
      addToast({
        title: "محصول اضافه شد.",
        color: "success",
      });
    },
    onError: (e) => {
      if (e.message.includes("401")) {
        addToast({
          title: "ابتدا وارد شوید .",
          description: e.message,
          color: "danger",
        });
      }else{
        addToast({
          title: "مشکلی پیش آمد.",
          description: e.message,
          color: "danger",
        });

      }

    },
  });
  const removeProduct = useMutation({
    mutationFn: async ({ productId }: { productId: string }) =>
      await axiosInstance().delete("/api/cart", {
        params: {
          userId: localStorage.getItem("user-id") || "",
          productId,
        },
      }),
    mutationKey: ["delete-product-server"],
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["data-carts"],
      });
      addToast({
        title: "محصول حذف شد.",
        color: "success",
      });
    },
    onError: (e) => {
      addToast({
        title: "مشکلی پیش آمد.",
        description: e.message,
        color: "danger",
      });
    },
  });
  const clearProducts = useMutation({
    mutationFn: async () =>
      await axiosInstance().delete(
        `/api/cart/${localStorage.getItem("user-id")}`
      ),
    mutationKey: ["clear-product-server"],
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["data-carts"],
      });
      addToast({
        title: "محصول حذف شد.",
        color: "success",
      });
    },
    onError: (e) => {
      addToast({
        title: "مشکلی پیش آمد.",
        description: e.message,
        color: "danger",
      });
    },
  });

  const cartData = useQuery<{
    data: {
      userId: string;
      _id: string;
      products: Array<cartItem>;
    };
  }>({
    queryKey: ["data-carts"],
    queryFn: async () =>
      axiosInstance()
        .get("/api/cart", {
          params: {
            userId: localStorage.getItem("user-id") || "",
          },
        })
        .then((res) => res.data),
  });
  return {
    productCart: cartData.data?.data ?? { userId: "", _id: "", products: [] },
    getCartByProductId: (action: string) => {
      return productCart.find((item) => item.product._id === action);
    },
    addToCart: (product: ISingleProduct, quantity: number = 1) => {
      newProduct.mutate({ product, quantity });
    },
    removeFromCart: (productId: string) => {
      removeProduct.mutate({ productId });
    },
    clearCart: () => {
      clearProducts.mutate();
    },
  };
};
