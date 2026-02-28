import { useEffect, useState } from "react";

const ProductCategories = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();

        setProducts(data);

        const uniqueCategories = [
          "all",
          ...new Set(data.map((item) => item.category)),
        ];

        setCategories(uniqueCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        );

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading products...
      </p>
    );

  if (error)
    return (
      <p className="text-center mt-10 text-red-500">
        {error}
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Shop by Category
      </h2>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full capitalize transition ${
              selectedCategory === cat
                ? "bg-green-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 w-full object-contain mb-4"
            />

            <h3 className="font-semibold text-lg mb-2 line-clamp-2">
              {product.title}
            </h3>

            <p className="text-green-600 font-bold mb-2">
              ${product.priceCents}
            </p>

            <p className="text-sm text-gray-600 line-clamp-3">
              {product.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategories;

