import { Link } from "react-router-dom";
function Header() {

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
              <form role="search">
                <input type="search" 
                placeholder="Search products, services, lodges" 
                aria-label="Search" 
                className="p-2 rounded-full text-black" />
              </form>
            
              <button aria-label="User-account">👤</button>
              <button aria-label="Cart">🛒</button>
            </div>
            </div>
          </nav>
        </header>
  );
}

export default Header;