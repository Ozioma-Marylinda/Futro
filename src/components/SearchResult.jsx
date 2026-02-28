import { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useSearchStore from "../store/search";
import useProductsStore from "../store/products";
import useJobsStore from "../store/jobs";

const SearchResult = () => {
  const location = useLocation();

  const searchTerm = useSearchStore((state) => state.searchTerm);
  const setSearchTerm = useSearchStore((state) => state.setSearchTerm);

  const products = useProductsStore((state) => state.products);
  const jobs = useJobsStore((state) => state.jobs);

  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q");

    if (query) {
      setSearchTerm(query);
    }
  }, [location.search, setSearchTerm]);

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return [];
    return products.filter((item) =>
      item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const filteredJobs = useMemo(() => {
    if (!searchTerm.trim()) return [];
    return jobs.filter((item) =>
      item?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [jobs, searchTerm]);

  const noResults =
    searchTerm.trim() &&
    filteredProducts.length === 0 &&
    filteredJobs.length === 0;

  return (
    <div className="p-6">

      <input
        type="text"
        placeholder="Search products and jobs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 border rounded-lg mb-8 focus:outline-none focus:ring-2 focus:ring-black"
      />

      <h1 className="text-2xl font-bold mb-6">
        Results for "{searchTerm}"
      </h1>

      {/* filtering products */}
      {filteredProducts.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-4">🛍 Products</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {filteredProducts.map((product) => (
              <div key={product.id} className="border rounded-lg p-4 shadow-sm">
                
                {imageLoading && (
                  <div className="h-40 bg-gray-200 animate-pulse rounded mb-3"></div>
                )}

                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-40 w-full object-cover rounded mb-3"
                    onLoad={() => setImageLoading(false)}
                  />
                )}

                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600">
                  {product.description}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* filtering jobs */}
      {filteredJobs.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-4">💼 Jobs</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div key={job.id} className="border rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-600">
                  {job.description}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* No result */}
      {noResults && (
        <p className="text-gray-500 text-center mt-10">
          No results found.
        </p>
      )}
    </div>
  );
};

export default SearchResult;