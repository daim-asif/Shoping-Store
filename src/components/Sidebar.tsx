import { useEffect, useState } from "react";
import { useFilter } from "../context/FilterContext";

const Sidebar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSlectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    keyword,
    setKeyword,
  } = useFilter();

  const [product, setProduct] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "Fashion",
    "trend",
    "shoes",
    "shirt",
  ]);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://dummyjson.com/products");
      const productsData = await response.json();
      const uniqueCategory = Array.from(
        new Set(productsData.products.map((product: any) => product.category))
      );

      setProduct(uniqueCategory);
    } catch (error) {
      console.error("While fetching data for fetchProduct", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };

  const handleRadioChangeCategories = (category: string) => {
    setSelectedCategory(category);
  };

  const handleKeywordClick = (keyword: string) => {
    setKeyword(keyword);
  };

  const handleRestFilter = () => {
    setSearchQuery("");
    setSlectedCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword("");
  };

  return (
    <div className="w-64 p-5 h-screen">
      <h1 className="text-2xl font-bold mb-10 mt-4">Daim Store</h1>

      <section>
        <input
          type="text"
          className="border-2 rounded px-2 mb-4 w-full"
          placeholder="Search Product"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex justify-center items-center mb-4">
          <input
            type="text"
            className="border-2 mr-2 px-5 py-3 w-full"
            placeholder="Min"
            value={minPrice ?? ""}
            onChange={handleMinPriceChange}
          />

          <input
            type="text"
            className="border-2 mr-2 px-5 py-3 w-full"
            placeholder="Max"
            value={maxPrice ?? ""}
            onChange={handleMaxPriceChange}
          />
        </div>

        {/* Category Section */}
        <div className="mb-5">
          <h1 className="text-xl font-semibold mb-3">Category</h1>
        </div>
        <section>
          {product.map((category, index) => (
            <label key={index} className="block mb-2">
              <input
                type="radio"
                name="category"
                value={category}
                onChange={() => handleRadioChangeCategories(category)}
                className="mr-2 w-[16px] h-[16px]"
                checked={selectedCategory === category}
              />
              {category.toLocaleUpperCase()}
            </label>
          ))}
        </section>

        {/* Keywords */}
        <div className="mb-5 mt-4">
          <h1 className="text-xl font-semibold mb-3">Keywords</h1>
          <div>
            {keywords.map((keyword, index) => (
              <button
                key={index}
                onClick={() => handleKeywordClick(keyword)} // Corrected to pass 'keyword'
                className="block mb-2 px-4 py-2 w-full text-left border rounded hover:bg-gray-200"
              >
                {keyword.toLocaleUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleRestFilter}
          className="w-full py-2 bg-black text-white rounded mt-5"
        >
          Reset Filters
        </button>
      </section>
    </div>
  );
};

export default Sidebar;