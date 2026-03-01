import { useState } from "react";
import useUserStore from "../store/useUserStore";
import useErrandsStore from "../store/useErrandsStore";
import { Navigate } from "react-router-dom";

const Errand = () => {
  const user = useUserStore((state) => state.user);
  const addErrand = useErrandsStore((state) => state.addErrand);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [deadline, setDeadline] = useState("");

  if (!user || !user.isLoggedIn) {
  return <Navigate to="/login" replace />;
 }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !location || !deadline) return;

    const newErrand = {
      id: crypto.randomUUID(),
      title,
      description,
      location,
      deadline,
      studentName: user.name,
      studentEmail: user.email,
      createdAt: new Date(),
    };

    addErrand(newErrand);

    setTitle("");
    setDescription("");
    setLocation("");
    setDeadline("");

    alert("Errand request submitted successfully!");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded mt-6">
      <h2 className="text-2xl font-bold mb-4 text-[#00A86B] text-center">
        Submit an Errand Request
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Errand Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          rows={4}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="date"
          placeholder="Deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-[#00A86B] text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Submit Errand
        </button>
      </form>
    </div>
  );
};

export default Errand;