import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"
import ProductDetails from "./components/ProductDetails";
import Cart from "./pages/CartPage";
import JobDetails from "./pages/JobDetails";
import RemoteJobs from "./components/RemoteJobs";
import Header from "./components/Header";
import SearchResult from "./components/SearchResult";
import ProductCategories from "./components/ProductCategories";
import SignIn from "./components/SingIn";
import SignUp from "./components/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import SellerDashboard from "./components/SellerDashboard";
import Marketplace from "./components/Marketplace";
import Errand from "./components/Errand";
import FutoEvents from "./components/FutoEvents";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  
  return (
    <>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/jobs" element={<RemoteJobs />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/seller-dashboard" element={
            <PrivateRoute>
              <SellerDashboard />
            </PrivateRoute>
          }
        />
        <Route path="/sellers" element={<Marketplace />} />
        <Route
          path="/errand"
          element={
            <ProtectedRoute>
              <Errand />
            </ProtectedRoute>
          }
        />
        <Route path="/events" element={<FutoEvents />} />
        <Route path="/categories" element={<ProductCategories />} />
      </Routes>
    </Router>
    </>
  );
}

export default App
