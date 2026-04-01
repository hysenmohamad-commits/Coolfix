import { create } from 'zustand';

interface AppState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedBrands: string[];
  toggleBrand: (brand: string) => void;
  selectedAppliance: string | null;
  setSelectedAppliance: (appliance: string | null) => void;
  resetFilters: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  selectedBrands: [],
  toggleBrand: (brand) => 
    set((state) => ({
      selectedBrands: state.selectedBrands.includes(brand)
        ? state.selectedBrands.filter((b) => b !== brand)
        : [...state.selectedBrands, brand],
    })),
  selectedAppliance: null,
  setSelectedAppliance: (appliance) => set({ selectedAppliance: appliance }),
  resetFilters: () => set({ selectedBrands: [], selectedAppliance: null, searchQuery: '' }),
}));
