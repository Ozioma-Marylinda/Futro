import { useEffect, useState } from "react";
import useProductsStore from "../store/products";

const useFetchProducts = () => {
  const products = useProductsStore((state) => state.products);
  const setProducts = useProductsStore((state) => state.setProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (products.length > 0) return;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json");
         if (!response.ok) {
            throw new Error(`Something went wrong: ${response.status}`);
          }
        const data = await response.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setProducts]);
  return { products, loading, error};
}

export default useFetchProducts;