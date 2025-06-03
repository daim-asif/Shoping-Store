import { useEffect, useState } from "react";
import { useFilter } from "../context/FilterContext";
import { Tally3 } from "lucide-react";
import axios from "axios";
import BookCard from "./BookCard";

export const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
    useFilter();

  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const itemPerPage = 12;

  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${itemPerPage}&skip=${
      (currentPage - 1) * itemPerPage
    }`;
    
    if (keyword) {
      url = `https://dummyjson.com/products/search?q=${keyword}`;
      console.log(`value${keyword}`);
    }

    axios
      .get(url)
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching the data.", error);
      });
  }, [currentPage, keyword]);

  const getFilteredProducts = () => {
    let filteredProducts = products;

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );

      console.log(filteredProducts);
    }

    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice
      );
    }

    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice
      );
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (filter) {
      case "expensive":
        return filteredProducts.sort((a, b) => b.price - a.price);
      case "cheap":
        return filteredProducts.sort((a, b) => a.price - b.price);
      case "popular":
        return filteredProducts.sort((a, b) => b.rating - a.rating);
      default:
        return filteredProducts;
    }
  };

  const filteredProducts = getFilteredProducts();

  const totalProducts = 190;
  const totalpage = Math.ceil(totalProducts / itemPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalpage) {
      setCurrentPage(page);
    }
  };

  const getPaginationButtons = () => {
    const buttons: number[] = [];
    let startpage = Math.max(1, currentPage - 2);
    let endpage = Math.min(totalpage, currentPage + 2);
  
    // Adjust range if there are less than 5 pages in view
    if (currentPage <= 2) {
      endpage = Math.min(totalpage, 5);
    }
  
    if (currentPage >= totalpage - 1) {
      startpage = Math.max(1, totalpage - 4);
    }
  
    for (let i = startpage; i <= endpage; i++) {
      buttons.push(i);
    }
  
    return buttons;
  };
  

  return (
    <section className="xl:w-[55rem]  lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5">
      <div className="md-5">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="relative md-5 mt-5">
            <button
              className="border px-4 py-2 rounded-full flex items-center mb-[1rem]"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <Tally3 className="mr-2" />
              {filter === "all"
                ? "Filter"
                : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>

            {dropdownOpen && (
              <div className="absolute bg-white border border-gray-300 rounded mt-2 w-full sm:w-40">
                <button
                  onClick={() => setFilter("cheap")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                >
                  Cheap
                </button>

                <button
                  onClick={() => setFilter("expensive")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                >
                  Expensive
                </button>

                <button
                  onClick={() => setFilter("popular")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                >
                  Popular
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <BookCard
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.thumbnail}
              price={product.price}
            />
          ))}
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 mt-5">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="border px-4 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex flex-wrap gap-2">
            {getPaginationButtons().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`border px-4 py-2 rounded-full ${
                  page === currentPage ? "bg-black text-white" : ""
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalpage}
            className="border px-4 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default MainContent;
