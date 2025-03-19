import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartProduct = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  images: string[];
  isOrder?: boolean;
};

type Product = {
  products?: CartProduct[];
};

type Action = {
  addToCart: (product: CartProduct) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  editCartProduct: (id: string, product: CartProduct) => void;
  orderAmount: () => number | undefined;
};

export const useCart = create<Product & Action>()(
  persist(
    (set) => ({
      products: [],
      addToCart(product) {
        set(({ products }) => ({
          products: [...(products ?? []), { ...product, isOrder: true }],
        }));
      },
      clearCart: () => set({ products: [] }),
      removeFromCart(id) {
        set(({ products }) => ({
          products: products?.filter(({ _id }) => _id != id),
        }));
      },
      editCartProduct(id, product) {
        set(({ products }) => ({
          products: products?.map((prev) => {
            if (prev._id === id) {
              return product;
            }
            return prev;
          }),
        }));
      },

      orderAmount() {
        return this.products?.reduce((acc, product) => {
          if (!product?.isOrder) return acc;
          acc = acc + product?.price * product?.quantity;
          return acc;
        }, 0);
      },
    }),
    { name: "cart-storage" }
  )
);
