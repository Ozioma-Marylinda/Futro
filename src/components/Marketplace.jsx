import useSellersStore from "../store/useSellersStore";

const Marketplace = () => {
  const sellerProducts = useSellersStore((state) => state.sellerProducts);

  if (sellerProducts.length === 0) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold text-[#00A86B]">Marketplace</h2>
        <p className="mt-4 text-gray-600">No seller products yet.</p>
      </div>
    );
  }
  const categories = [...new Set(sellerProducts.map((product) => product.category))];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#00A86B] text-center">Marketplace</h2>

      {categories.map((cat) => (
        <div key={cat} className="mb-8">
          <h3 className="text-xl font-semibold mb-4">{cat}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sellerProducts
              .filter((p) => p.category === cat)
              .map((product) => (
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
                    Seller: {product.sellerName}
                  </p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Marketplace;