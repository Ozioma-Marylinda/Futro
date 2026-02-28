import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSellersStore = create(
  persist(
    (set) => ({
      sellerProducts: [],

      addSellerProduct: (product) =>
        set((state) => ({
          sellerProducts: [...state.sellerProducts, product],
        })),

      removeSellerProduct: (id) =>
        set((state) => ({
          sellerProducts: state.sellerProducts.filter(
            (product) => product.id !== id
          ),
        })),
    }),
    {
      name: "sellers-storage",
    }
  )
);

export default useSellersStore;