import { useNavigate } from "react-router-dom";
import useSearchStore from "../store/search";

const NavbarSearch = () => {
  const navigate = useNavigate();
  const searchTerm = useSearchStore((state) => state.searchTerm);
  const setSearchTerm = useSearchStore((state) => state.setSearchTerm);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) return;

    navigate(`/search?q=${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <form role="search" onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Search products and jobs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 rounded-full text-black"
      />
    </form>
  );
};

export default NavbarSearch;