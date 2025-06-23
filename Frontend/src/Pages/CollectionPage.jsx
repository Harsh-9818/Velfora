import { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../Components/Products/FilterSidebar";
import SortOption from "../Components/Products/SortOption";
import ProductGrid from "../Components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilter } from "../redux/slices/productSlice";
const CollectionPage = () => {
  const {collection } = useParams();
  const [searchParams] = useSearchParams();  
  const dispatch = useDispatch();
  const {products, loading, error } = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);

  const sideBarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsByFilter({collection, ...queryParams}));
  }, [dispatch, collection, searchParams]);

  const toogleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    if (sideBarRef.current && !sideBarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    // Add eventlistener for click
    document.addEventListener("mousedown", handleClickOutside);
    //Clean event listener
    return () => {
    document.removeEventListener("mousedown", handleClickOutside);
    }
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
        <ProductGrid products={products} loading={loading} error={error}/>
      </div>
    </div>
  );
};

export default CollectionPage;
