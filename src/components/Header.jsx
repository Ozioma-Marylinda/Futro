import { useState } from "react";
import { Link } from "react-router-dom";
import useProductsStore from "../store/products";
import { useNavigate } from "react-router-dom";
import useSearchStore from "../store/search";
import NavbarSearch from "./NavbarSearch";

function Header() {
  const cart = useProductsStore((state) => state.cart);
  const cartCount = cart.length;

  const navigate = useNavigate();
  const setSearchTerm = useSearchStore((state) => state.setSearchTerm);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get("search");
    if (!query.trim()) return;
    setSearchTerm(query);
    navigate(`/search?q=${query}`);
  };

  return (
    <header className="bg-green-500">
      <div className="bg-green-800 flex p-2 justify-between text-white text-sm">
        <div>🎓 All-in-one digital ecosystem for FUTO students</div>
        <p>FUTO Events Calendar</p>
      </div>

      <nav className="bg-green-600 p-4 text-white">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <h1 className="font-black text-lg">
              <Link to="/">FUTRO</Link>
            </h1>
          </div>

          <ul className="hidden md:flex gap-4">
            <li>
              <Link to="/categories">Product Categories</Link>
            </li>
            <li>
              <Link to="/jobs">Remote Jobs</Link>
            </li>
            <li>
              <Link to="/lodges">Checkout Lodges</Link>
            </li>
            <li>
              <Link to="/signup">Sell on Futro🏷️</Link>
            </li>
          </ul>

          <div className="hidden md:flex items-center gap-4">
            <NavbarSearch onSubmit={handleSubmit} />
            <Link to="/login">
              <button aria-label="User-account">👤</button>
            </Link>
            <Link to="/cart" className="relative">
              <button aria-label="Cart">
                🛒
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>
          </div>

          <button
            className="md:hidden focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✖️" : "☰"}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <ul className="flex flex-col gap-2">
              <li>
                <Link to="/categories" onClick={() => setMenuOpen(false)}>
                  Product Categories
                </Link>
              </li>
              <li>
                <Link to="/jobs" onClick={() => setMenuOpen(false)}>
                  Remote Jobs
                </Link>
              </li>
              <li>
                <Link to="/lodges" onClick={() => setMenuOpen(false)}>
                  Checkout Lodges
                </Link>
              </li>
              <li>
                <Link to="/signup" onClick={() => setMenuOpen(false)}>
                  Sell on Futro🏷️
                </Link>
              </li>
            </ul>
            <div className="mt-4">
              <NavbarSearch onSubmit={handleSubmit} />
            </div>
            <div className="flex items-center gap-4 mt-2">
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                👤
              </Link>
              <Link to="/cart" className="relative" onClick={() => setMenuOpen(false)}>
                🛒
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;