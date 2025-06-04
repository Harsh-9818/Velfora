import { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../Components/Products/FilterSidebar";
import SortOption from "../Components/Products/SortOption";
import ProductGrid from "../Components/Products/ProductGrid";
const CollectionPage = () => {
  const [product, setProducts] = useState([]);
  const sideBarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toogleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    if (sideBarRef.ref.current && !sideBarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    // Add eventlistener for click
    document.addEventListener("mousedown", handleClickOutside);
    //Clean event listener
    document.removeEventListener("mousedown", handleClickOutside);
  });

  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = [
        {
          _id: 1,
          name: "Product 1",
          price: "100",
          images: [{ url: "https://picsum.photos/500/500?random=3" }],
        },
        {
          _id: 2,
          name: "Product 2",
          price: "100",
          images: [{ url: "https://picsum.photos/500/500?random=4" }],
        },
        {
          _id: 3,
          name: "Product 3",
          price: "100",
          images: [{ url: "https://picsum.photos/500/500?random=5" }],
        },
        {
          _id: 4,
          name: "Product 4",
          price: "100",
          images: [{ url: "https://picsum.photos/500/500?random=6" }],
        },
        {
          _id: 5,
          name: "Product 5",
          price: "100",
          images: [{ url: "https://picsum.photos/500/500?random=7" }],
        },
        {
          _id: 6,
          name: "Product 6",
          price: "100",
          images: [{ url: "https://picsum.photos/500/500?random=8" }],
        },
        {
          _id: 7,
          name: "Product 7",
          price: "100",
          images: [{ url: "https://picsum.photos/500/500?random=9" }],
        },
        {
          _id: 8,
          name: "Product 8",
          price: "100",
          images: [{ url: "https://picsum.photos/500/500?random=10" }],
        },
      ];
      setProducts(fetchedProducts);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile filter button */}
      <button 
      onClick={toogleSidebar}
      className="lg:hidden border p-2 flex justify-center items-center">
        <FaFilter className="mr-2" /> Filters
      </button>

      {/* Filter Silderbar */}
      <div 
      ref={sideBarRef}
      className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collections</h2>
        
        {/* Sort options */}
        <SortOption/>

        {/* Product Grid */}
        <ProductGrid products={product}/>
      </div>
    </div>
  );
};

export default CollectionPage;
