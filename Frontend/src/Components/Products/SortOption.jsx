import { useSearchParams } from "react-router-dom"

const SortOption = () => {

  const[searchParams, setSearchParams] = useSearchParams("");

  const handelSortChange = (e) => {
    const sortBy = e.target.value;
    searchParams.set("sortBy", sortBy);
    setSearchParams(searchParams);
  };


  return (
    <div className="mb-4 felx items-center justify-end">
      <select
        id="sort"
        onChange={handelSortChange}
        value={searchParams.get("sortBy") || ""}
        className="border p-2 rounded-md focus:outline-none"
      >
        <option value=""></option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="PriceDsc">Price: High to Low</option>
        <option value="populartiy">Popularity</option>
      </select>
    </div>
  )
}

export default SortOption