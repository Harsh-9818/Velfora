import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"

const FilterSidebar = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: "",
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 2000,
  });

  const [priceRange, setPriceRange] = useState([0, 2000]);

  const categories = ["Top Wear", "Bottom Wear"];

  const colors = [
    "Red",
    "Blue",
    "Black",
    "Green",
    "Yellow",
    "Gray",
    "White",
    "Pink",
    "Beige",
    "Navy"
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const materials = [
    "Cotton",
    "Wool",
    "Denim",
    "Polyester",
    "Silk",
    "Linen",
    "Viscose",
    "Fleece",
  ];

  const brands = [
    "Urban Threads",
    "Modern Fits",
    "Street Style",
    "Beach Breeze",
    "Fashionista",
    "ChicStyle",
  ];

  const genders = ["Men", "Women"]

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 2000,
    });
    setPriceRange([0, params.maxPrice || 2000]);
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const {name, value, checked, type} = e.target;
    let newFilter = {...filters};
    
    if(type === "checkbox"){
      if(checked){
        newFilter[name] = [...(newFilter[name] || []), value];
      }else{
        newFilter[name] = newFilter[name].filter((item) => item !== value)
      }
    }else{
      newFilter[name] = value;
    }
    setFilters(newFilter)
    updateURLParams(newFilter)
  };

  const updateURLParams = (newFilter) => {
    const params = new  URLSearchParams();
    Object.keys(newFilter).forEach((key) => {
      if (Array.isArray(newFilter[key]) && newFilter[key].length > 0){
        params.append(key, newFilter[key].join(","));
      }else if(newFilter[key]){
        params.append(key,newFilter[key])
      }
    });
    setSearchParams(params);
    // navigate (`${params.toString()}`)
  }

  const handlePriceRange = (e) => {
    const newPrice = e.target.value;
    setPriceRange([0,newPrice]);
    const newFilter = {...filters, minPrice: 0, maxPrice: newPrice};
    setFilters(filters);
    updateURLParams(newFilter);
  }
 
  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-600 mb-4">Filter</h3>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Category</label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <input 
            type="radio"
            name="category"
            value={category}
            onChange={handleFilterChange}
            checked={filters.category === category}
            className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-600 border-gray-600"/>
            <span className="text-gray-700">{category}</span>
          </div>
        ))}
      </div>

      {/* Gender Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Gender</label>
        {genders.map((gender) => (
          <div key={gender} className="flex items-center mb-1">
            <input 
            type="radio"
            name="gender"
            value={gender}
            onChange={handleFilterChange}
            checked={filters.gender === gender}
            className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-600 border-gray-600"/>
            <span className="text-gray-700">{gender}</span>
          </div>
        ))}
      </div>

      {/* Color Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Colors</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              name="color"
              value={color}
              onClick={handleFilterChange}
              className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${
                filters.color === color ? "ring-2 ring-blue-500" : ""
              }`}
              style={{background: color.toLowerCase()}}
            ></button>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div className="mb-6">
          <label className="block text-gray-600 font-medium mb-2">Size</label>
          {sizes.map((size) => (
            <div key={size} className="flex items-center mb-1">
              <input 
                type="checkbox"
                name="size"
                value={size}
                onChange={handleFilterChange}
                checked={filters.size.includes(size)}
                className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              />
              <span className="text-gray-700">{size}</span>
            </div>
          ))}
      </div>

      {/* material Filter */}
      <div className="mb-6">
          <label className="block text-gray-600 font-medium mb-2">material</label>
          {materials.map((material) => (
            <div key={material} className="flex items-center mb-1">
              <input 
                type="checkbox"
                name="material"
                value={material}
                onChange={handleFilterChange}
                checked={filters.material.includes(material)}
                className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              />
              <span className="text-gray-700">{material}</span>
            </div>
          ))}
      </div>

      {/* brand Filter */}
      <div className="mb-6">
          <label className="block text-gray-600 font-medium mb-2">brand</label>
          {brands.map((brand) => (
            <div key={brand} className="flex items-center mb-1">
              <input 
                type="checkbox"
                name="brand"
                value={brand}
                onChange={handleFilterChange}
                checked={filters.brand.includes(brand)}
                className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              />
              <span className="text-gray-700">{brand}</span>
            </div>
          ))}
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <label className="block text-gray-600 font-medium mb-2">
          Price Range
        </label>
        <input
          type="range"
          name="priceRange"
          min={0}
          max={2000}
          value={priceRange[1]}
          onChange={handlePriceRange}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  )
}

export default FilterSidebar