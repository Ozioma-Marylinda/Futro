import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"
import ProductDetails from "./components/ProductDetails";
import Cart from "./pages/CartPage";
import JobDetails from "./pages/JobDetails";
import RemoteJobs from "./components/RemoteJobs";
import Header from "./components/Header";
import SearchResult from "./components/SearchResult";

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
        <Route path="/search" element={<SearchResult />} />
      </Routes>
    </Router>
  );
}

export default App
