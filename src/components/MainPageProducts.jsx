import { Link } from "react-router-dom";
import useProductsStore from "../store/products";

  const MainPageProducts = () => {
   const { products, loading } = useProductsStore((state) => ({
    products: state.products,
    loading: state.loading,
    }));

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading products...
      </div>
    );
  }
  
   if (!products || products.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No products available.
      </div>
    );
  } 

  return (
    <section className="bg-green-500 py-10">
      <h2 className="text-2xl font-bold text-center mb-6">
        Trending Campus Essentials
      </h2>
       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain mb-4"
            />
            <h3 className="text-lg font-semibold text-green-900">{product.title}</h3>
            <p className="text-green-700 font-bold mt-2">₦{product.price}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MainPageProducts;