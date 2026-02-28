import useProductsStore from "../store/products";


const ProductCategories = () => {
  const productCategories = useProductsStore((state) => state.products);
  const categories = productCategories.filter(products => products.categories)
  return (
    <>
    <h2 className="text-sm font-bold text-green-800 mt-3">
      {product.category}
    </h2>
    </>
  )
}

export default ProductCategories;