import { create } from "zustand";

const useProductsStore = create((set) => ({
  products: [],
  setProducts: (newProducts) => set({ products: newProducts})
}));

export default useProductsStore;