import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-gray-50 rounded-xl p-4 shadow-md hover:shadow-lg transition duration-300">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-40 object-contain"
        />
        <h2 className="text-sm font-bold text-green-800 mt-2">
          {product.title}
        </h2>
        <p className="text-lg font-extrabold text-green-700 mt-1">
          ₦{product.price}
        </p>
        <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
          {product.category}
        </span>
      </div>
    </Link>
  )
}

export default ProductCard;