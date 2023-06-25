function FilterPrice({ filter, setFilter }) {
  return (
    <div className="flex flex-col">
      <h3 className="font-title text-left text-lg  px-3 py-1">
        Price
      </h3>
      <form className="flex flex-col gap-2 px-3">
        <div className="flex flex-row justify-between items-center">
          <span className="border border-gray-300 flex  bg-gray-100 h-full p-2 items-center rounded-l-md">
            RP.
          </span>
          <input
            type="number"
            min="0"
            className="border border-l-0 border-gray-300 flex-1 p-2 rounded-r-md"
            placeholder="Min"
            value={filter.price[0]}
            onChange={(e) => setFilter({ ...filter, price: [e.target.value, filter.price[1]] })}
          />
        </div>
        <div className="flex flex-row justify-between items-center">
          <span className="border border-gray-300 flex  bg-gray-100 h-full p-2 items-center rounded-l-md">
            RP.
          </span>
          <input
            type="number"
            className="border border-l-0 border-gray-300 flex-1 p-2 rounded-r-md"
            min={filter.price[0]}
            placeholder="Max"
            value={filter.price[1]}
            onChange={(e) => setFilter({ ...filter, price: [filter.price[0], e.target.value] })}
          />
        </div>
      </form>
    </div>
  );
}

export default FilterPrice;
