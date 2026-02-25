import { create } from "zustand";
import { persist } from "zustand/middleware";

const useProductsStore = create(
  persist(
    (set) => ({
  products: [],
  setProducts: (newProducts) => set({ products: newProducts})
})
  )
);

export default useProductsStore;