import { useEffect, useState } from "react";
import useProductsStore from "../store/products";
import { Link } from "react-router-dom";
import Hero from "./Hero"
import Button from "./Button";
import { formatToNaira } from "../utils/formatCurrency";

function Main() {
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
      <Hero />
      <main className="bg-green-900 py-4">
        <section className="bg-white p-2 justify-center items-center rounded-xl mx-16">
        <div className="info flex items-center text-green-800 font-bold">
          <div className="errand flex gap-2 items-center">
            <p>We run your errands.</p>
            <p>Need something from Campus or town?</p>
            <Button />
          </div>
          <p className="ml-auto">💬 24/7 student support</p>
        <p className="ml-auto font-bold">Are you a FUTO student seller? <Link to="/sell" className="underline text-indigo-900">Join Futro</Link></p>
        </div>
      </section>
      <section className="product-section flex flex-wrap text-center ">
        <div className="grid mt-4 mb-0">
          <h2 className="text-3xl font-extrabold text-white mb-1">
          Featured Products
        </h2>
      </div>
    </section>
        <p className="text-sm text-white">
          Quick campus delivery at your fingertips.
        </p>

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
          
            <div
              key={product.id}
              className="bg-gray-50 rounded-xl p-4 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-contain bg-green-50 rounded-lg"
              />
              <h2 className="text-sm font-bold text-green-800 mt-3">
                {product.title}
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
          ))}
      </div>
        </div>
      </main>
    </>
  )
}

export default Main;