import { Link } from "react-router-dom";
import useProductsStore from "../store/products";
import { useNavigate } from "react-router-dom";
import useSearchStore from "../store/search";
import NavbarSearch from "./NavbarSearch";

function Header() {
const cart = useProductsStore((state) => state.cart)
const cartCount = cart.length;

  const navigate = useNavigate();
  const setSearchTerm = useSearchStore((state) => state.setSearchTerm);

      const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const query = formData.get("search");
        if (!query.trim()) return;
        setSearchTerm(query); 
        navigate(`/search?q=${query}`);
        };

  return (
        <header className="bg-green-500 ">
          <div className="bg-green-800 flex p-2 justify-between text-white text-sm">
            <div>🎓All-in-one digital ecosystem for Futo students</div>
            <p>Futo Events calender</p>
          </div>
          <nav className="bg-green-600 p-4 text-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-6">
                <h1 className="font-black text-lg"><Link to="/">FUTRO</Link></h1>
                
                <ul className="flex gap-4">
                  <li><Link to="/products">Product Categories</Link></li>
                  <li><Link to="/jobs">Remote jobs</Link></li>
                  <li><Link to="/lodges">Checkout Lodges</Link></li>
                  <li><Link to="/sell">Sell/Advertise</Link></li>
                </ul>
              </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <NavbarSearch />
              </div>
                    
              <button aria-label="User-account">👤</button>
              <Link to="/cart" className="relative">
              <button aria-label="Cart">🛒
                {cartCount > 0 && (<span className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartCount}
                </span>)}
                </button>
              </Link>
            </div>
            </div>
          </nav>
        </header>
  );
}

export default Header;