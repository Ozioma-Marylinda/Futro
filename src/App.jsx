import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"
import ProductDetails from "./components/ProductDetails";
import Cart from "./pages/CartPage";
import JobDetails from "./pages/JobDetails";
import RemoteJobs from "./components/RemoteJobs";
import Header from "./components/Header";

function App() {
  
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/jobs" element={<RemoteJobs />} />
      </Routes>
    </Router>
  );
}

export default App
