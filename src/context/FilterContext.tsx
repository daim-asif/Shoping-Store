import { createContext, useContext, useState, type ReactNode } from "react";

interface FilterContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void; // Fixed typo
  minPrice: number | undefined;
  setMinPrice: (minPrice: number | undefined) => void;
  maxPrice: number | undefined;
  setMaxPrice: (maxPrice: number | undefined) => void;
  keyword: string;
  setKeyword: (keyword: string) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // Fixed typo
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [keyword, setKeyword] = useState<string>("");

  return (
    <FilterContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory, // Fixed typo
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        keyword,
        setKeyword,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within FilterProvider");
  }

  return context;
};