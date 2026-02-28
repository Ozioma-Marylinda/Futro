import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-green-600 text-white py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 font-bold text-lg">
          Futro
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm">
          <Link to="/"> Home</Link>
          <li><Link to="/categories">All Products</Link></li>
          <li><Link to="/login">Sign In</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
        </div>

        <div className="mt-4 md:mt-0 text-sm text-gray-100">
          &copy; {new Date().getFullYear()} Futro. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer;