import useProductsStore from "../store/products";

const SellerProducts = () => {
  const products = useProductsStore((state) => state.products);
 
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#00A86B]">
        Available Products
      </h2>

      {products.length === 0 ? (
        <p>No products available yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="font-bold mt-3">{product.title}</h3>
              <p className="text-gray-600">₦{product.price}</p>
              <p className="text-sm text-gray-400">
                Seller: {product.sellerName || product.seller}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerProducts;