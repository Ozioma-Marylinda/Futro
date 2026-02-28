import { create } from "zustand";
import { persist } from "zustand/middleware";

const useErrandsStore = create(
  persist(
    (set) => ({
      errands: [],
      addErrand: (errand) => set((state) => ({
        errands: [...state.errands, errand],
      })),
      removeErrand: (id) => set((state) => ({
        errands: state.errands.filter((e) => e.id !== id),
      })),
    }),
    {
      name: "errands-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useErrandsStore;