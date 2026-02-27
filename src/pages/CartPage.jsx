import { Link } from "react-router-dom"
import useProductsStore from "../store/products";
import { formatToNaira } from "../utils/formatCurrency";

const CartPage = () => {
  const cart = useProductsStore((state) => state.cart);
  const removeFromCart = useProductsStore((state) => state.removeFromCart);
  const totalPriceScents = cart.reduce((total, product) => {
    return total + (product.priceCents || 0);
  }, 0);


  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-green-900 text-white flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/" className="underline text-green-300">
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="bg-white text-green-900 rounded-xl p-6 shadow-lg">
        {cart.map((product) => (
          <div
            key={product.id}
            className="flex justify-between items-center border-b py-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={product.image}
                alt={product.title}
                className="w-16 h-16 object-contain bg-green-50 rounded"
              />
              <div>
                <p className="font-bold">{product.title}</p>
                <p>{formatToNaira(product.priceCents)}</p>
              </div>
            </div>

            <button
              onClick={() => removeFromCart(product.id)}
              className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-500 transition"
            >
              Remove
            </button>
          </div>
        ))}
        <div className="mt-6 text-right">
          <p className="text-xl font-bold">
            Total: {formatToNaira(totalPriceScents)}
          </p>
        </div>
      </div>
      <Link to="/" className="underline text-green-300">
        <button className="bg-green-600 text-white px-4 mt-2 py-2 rounded-full hover:bg-red-500 transition">
             Add more
        </button>
      </Link>
    </div>
  );
}

export default CartPage;