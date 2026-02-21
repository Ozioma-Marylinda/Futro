function Navbar() {

  return (
          <nav className="bg-green-600 flex p-4 justify-center text-white">
            <div className="flex-1">
              <div className="flex text-center gap-4">
                <div className="font-black gap-1"><h1>FUTRO</h1></div>
                <div>Product Categories</div>
                <div>Remote jobs</div>
                <div>Checkout Lodges</div>
                <div>Sell/Advertise</div>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <div >
                <input type="search" placeholder="Search products services lodges" aria-label="search" 
                className="flex p-2 rounded-full border-none pe-40" />
              </div>
              <div class="icons">👤</div>
              <div class="icons">🛒</div>
            </div>
          </nav>
  )
}

export default Navbar;