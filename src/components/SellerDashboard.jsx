import { useState } from 'react';
import useUserStore from '../store/useUserStore';
import useProductsStore from '../store/products';
import { Navigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const SellerDashboard = () => {
  const { user } = useUserStore();
  const addProduct = useProductsStore((state) => state.addProduct);
  const products = useProductsStore((state) => state.products);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); 

  if (!user.isLoggedIn) return <Navigate to="/signup" />;

  // Converting file to base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); 
    };
    reader.readAsDataURL(file);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!title || !price || !image) return alert("Please fill all fields and upload an image!");

    const newProduct = {
      id: uuidv4(),
      title,
      price,
      description,
      seller: user.name,
      image,
    };

    addProduct(newProduct);

    setTitle('');
    setPrice('');
    setDescription('');
    setImage(null);
    document.getElementById('product-image').value = ''; 
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded mt-6">
      <h2 className="text-2xl font-bold mb-4 text-[#00A86B]">
        Welcome, {user.name}! Add a Product
      </h2>

      <form onSubmit={handleAddProduct} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Product Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Price (₦)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Product Image</label>
          <input
            id="product-image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-[#00A86B] text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Add Product
        </button>
      </form>

      {products.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-2 text-[#00A86B]">Your Products</h3>
          <ul className="space-y-4">
            {products.map((p) => (
              <li key={p.id} className="border p-2 rounded flex gap-4">
                {p.image && (
                  <img src={p.image} alt={p.title} className="w-20 h-20 object-cover rounded" />
                )}
                <div>
                  <strong>{p.title}</strong> - ₦{p.price} <br />
                  <small>{p.description}</small>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;