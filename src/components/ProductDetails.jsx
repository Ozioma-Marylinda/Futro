import { useParams, Link, useNavigate } from "react-router-dom";
import useProductsStore from "../store/products";
import { formatToNaira } from "../utils/formatCurrency";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const products = useProductsStore((state) => state.products);
  const addToCart = useProductsStore((state) => state.addToCart)

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
       <div className="p-6 text-center text-red-500">
        Product not found.
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product);
    navigate("/cart");
  };
  
  return (
   <div>
    <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">
      <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-96 object-contain"
        />
      </div>

      <div>
        <h1 className="text-3xl font-bold text-green-900">{product.title}</h1>
         <p className="text-3xl font-extrabold text-green-700 mt-6">{formatToNaira(product.priceCents)}</p>
        <p className="text-gray-600 mt-8 leading-relaxed">
          {product.description}
        </p>
        <span className="inline-block mt-6 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
          {product.category}
        </span>
        <button onClick={handleAddToCart} className="mt-10 w-full md:w-auto px-8 py-3 bg-green-800 text-white rounded-xl hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg">
          Add to Cart
        </button>
      </div>
    </div>
    <Link to="/" className="underline text-green-300 ml-2">
        ← Back
    </Link>
   </div>
  )
}

export default ProductDetails;