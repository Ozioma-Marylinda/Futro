import { useEffect, useState } from "react";
import useProductsStore from "../store/products";
import { Link } from "react-router-dom";
import Hero from "./Hero"
import Button from "./Button";
import { formatToNaira } from "../utils/formatCurrency";
import heroAd from "../assets/videos/ad.mp4";

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
  <section className="w-full min-h-[60vh] bg-black text-white">

  <div className="flex flex-col lg:flex-row h-full">

    <div className="w-full lg:w-1/2 h-[40vh] lg:h-auto">
      <video
        src={heroAd}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />
    </div>

    <div className="w-full lg:w-1/2 flex flex-col justify-center items-center text-center px-6 py-10">
      <h1 className="text-4xl md:text-6xl font-bold">
        Welcome to Futro
      </h1>

      <p className="mt-4 text-lg md:text-2xl">
        Buy, Sell & Get Things Done — All on one Platform
      </p>

      <Link to="/marketplace">
        <button className="mt-6 bg-[#00A86B] text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-green-700 transition">
          Explore Marketplace
        </button>
      </Link>
    </div>

  </div>

</section>
      <main className="bg-green-900 py-4">
       <section className="bg-white p-4 md:p-8 rounded-xl mx-4 md:mx-16 mt-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0 text-green-800 font-bold">
    
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
      <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-start md:items-center mr-0">
        <p>We run your errands.</p>
        <p>Need something from Town?</p>
      </div>
      <Link to="/errand" className="mt-2 md:mt-0 mr-8 ml-0">
        <Button />
      </Link>
      </div>

    <div className="flex flex-col md:flex-row gap-2 md:gap-4 md:items-center mt-2 md:mt-0">
      <p>💬 24/7 student support</p>
      <p className="font-bold">
        Are you a FUTO student seller?{" "}
        <Link to="/login" className="underline text-indigo-900">
          Join Futro
        </Link>
      </p>
    </div>
  </div>
</section>

<section className="product-section text-center mt-8 px-4 md:px-16">
  <div className="grid">
    <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
      Featured Products
    </h2>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
  </div>
</section>
        <h3 className="text-sm text-white md:text-2xl">
          Quick campus delivery at your fingertips.
        </h3>

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

export default Main;