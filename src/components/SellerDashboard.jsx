import { useState } from 'react';
import useUserStore from '../store/useUserStore';
import useSellersStore from '../store/useSellersStore';
import { Navigate } from 'react-router-dom';

const SellerDashboard = () => {
  const { user, signOut} = useUserStore();
  const addSellerProduct = useSellersStore((state) => state.addSellerProduct);
  const sellerProducts = useSellersStore((state) => state.sellerProducts);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const sellerCategories = [
    ...new Set(
      sellerProducts
        .filter((p) => p.sellerEmail === user.email)
        .map((p) => p.category)
    ),
  ];

  if (!user.isLoggedIn) return <Navigate to="/signin" />;

  const handleAddProduct = (e) => {
  e.preventDefault();

  const finalCategory = newCategory || category;
  if (!title || !price || !image) return;

  const newProduct = {
    id: crypto.randomUUID(),
    title,
    price: Number(price),
    category: finalCategory,
    image,
    sellerEmail: user.email,
    sellerName: user.name,
    createdAt: new Date(),
  };

  addSellerProduct(newProduct);

  setTitle('');
  setPrice('');
  setImage(null);
  setCategory("");
  setNewCategory("");
  document.getElementById('product-image').value = '';
};

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <>
     <h2 className="text-2xl font-bold mb-4 text-[#00A86B] text-center">
        Welcome back {user.name}
      </h2>
      <button
        onClick={signOut}
        className="mb-4 bg-gray-300 text-black py-1 px-3 rounded hover:bg-gray-400 text-center"
      >
        Sign Out
      </button>
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded mt-6">
      <h3 className="text-2xl font-bold mb-4 text-[#00A86B] text-center">Add your products</h3>
      <form onSubmit={handleAddProduct} className="space-y-4">
        <input
          type="text"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />

         <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Existing Category</option>
            {sellerCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Or add a new category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />

        <input
          id="product-image"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-[#00A86B] text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Add Product
        </button>
      </form>

      {sellerProducts.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-2 text-[#00A86B]">Your Products</h3>
          <ul className="space-y-4">
            {sellerProducts
              .filter((p) => p.sellerEmail === user.email)
              .map((p) => (
              <li key={p.id} className="border p-2 rounded flex gap-4">
                <img src={p.image} alt={p.title} className="w-20 h-20 object-cover rounded" />
                <div>
                  <strong>{p.title}</strong> - ₦{p.price} <br />
                  <small>Category: {p.category}</small>
                  <small>Seller: {p.seller}</small>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </>
  );
};

export default SellerDashboard;