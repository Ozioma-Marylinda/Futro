import { create } from 'zustand';

const useSearchStore = create((set) => ({
  products: [],
  services: [],
  lodges: [],
  searchTerm: '',
  
  setProducts: (products) => set({ products }),
  setServices: (services) => set({ services }),
  setLodges: (lodges) => set({ lodges }),
  setSearchTerm: (term) => set({ searchTerm: term }),
}));

export default useSearchStore;