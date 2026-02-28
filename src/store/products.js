import { create } from "zustand";
import { persist } from "zustand/middleware";

const useProductsStore = create(
  persist(
    (set) => ({
  products: [],
  cart: [],
  setProducts: (newProducts) => set({ products: newProducts}),
  
   addProduct: (newProduct) =>
    set((state) => ({
      products: [...state.products, newProduct],
    })),
  addToCart: (product) => set((state) => ({
    cart: [...state.cart, product],
  })),
  removeFromCart: (id) =>
  set((state) => ({
    cart: state.cart.filter((product) => product.id !== id),
  })),
}),
  {
    name: "products-storage",
    getStorage: () =>localStorage,
  }
  )
);

export default useProductsStore;