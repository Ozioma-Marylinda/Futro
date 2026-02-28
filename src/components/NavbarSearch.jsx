import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavbarSearch = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

     if (!input.trim()) return;


    navigate(`/search?q=${input}`);
    setInput("");
  };

  return (
    <form role="search" onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Search products and jobs..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="p-2 rounded-full text-black"
      />
    </form>
  );
};

export default NavbarSearch;