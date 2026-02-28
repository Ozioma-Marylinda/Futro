import { useEffect, useState } from "react";
import useProductsStore from "../store/products";
import { Link } from "react-router-dom";
import { formatToNaira } from "../utils/formatCurrency";

function MainProducts() {
  const setProducts = useProductsStore((state) => state.setProducts);
   const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json");
         if (!response.ok) {
            throw new Error(`Something went wrong: ${response.status}`);
          }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  },[setProducts]);

  const products = useProductsStore((state) => state.products); 
   
  return (
    <>
    <main>
      <h1 className="text-3xl font-extrabold text-green-600 text-center mt-4">EXPLORE YOUR INTERESTS</h1>

      <div>
        <div className="p-20 grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6">
          {loading && (
            <div className="col-span-full flex justify-center">
              <div className="w-10 h-10 border-4 border-green-300 border-t-green-800 rounded-full animate-spin"></div>
            </div>
          )}

        {error && (
          <p className="text-red-400 col-span-full text-center">
            Failed to load products.
          </p>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="text-white col-span-full text-center">
            No products available.
          </p>
        )}

        {!loading && !error &&
          products.map((product) => (
          
           <Link to={`/product/${product.id}`} key={product.id}>
            <div className="bg-gray-50 rounded-xl p-4 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-contain bg-green-50 rounded-lg"
              />
              <h2 className="text-sm font-bold text-green-800 mt-3">
                {product.name}
              </h2>
              <p>{formatToNaira(product.priceCents)}</p>
              <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                {product.description}
              </p>
              <p className="inline-block text-xs font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full mt-3">
                {product.category}
              </p>
              <button className="inline-block px-4 py-2 rounded-full font-bold bg-green-800 text-green-300 hover:bg-green-700 transition">
                Add to cart
              </button>
            </div>
            </Link>
          ))}
      </div>
        </div>
      </main>
    </>
  )
}

export default MainProducts;