import React, { useEffect, useState } from "react";
import ClosedBtnModal from "../../../../components/ClosedBtnModal";
import { getTopProducts } from "../../";

function AllTopProducts(props) {
  const { setAllProducts, filterState, months, warehouses, selectingDate, currencyFormat } = props;
  const [salesList, setSalesList] = useState([]);

  const warehouseChoice = [...warehouses]?.filter((warehouse) => {
    return warehouse.id_warehouse == filterState.warehouse;
  });

  useEffect(() => {
    (async () => {
      const id_warehouse = filterState.warehouse;
      if (filterState.year && filterState.month) {
        const currentMonth = selectingDate(filterState.month, filterState.year, 1);
        const topSales = await getTopProducts({ ...currentMonth, id_warehouse, limit: "" });
        console.log(topSales);
        setSalesList([...topSales.result]);
      } else if (!(filterState.year && filterState.month)) {
        const topSales = await getTopProducts({ startDate: "", endDate: "", id_warehouse, limit: "" });
        console.log(topSales);
        setSalesList([...topSales.result]);
      }
    })();
  }, []);

  const RenderData = () => {
    return salesList?.map((sale, index) => {
      return (
        <div
          key={index + 1}
          className=" px-2 md:px-4 text-primary font-medium text-xs py-2 md:py-2
            md:text-base grid grid-cols-9 items-center"
        >
          <h1 className="col-span-4 lg:col-span-5 scale-95">{sale.product_name}</h1>
          <h1 className="col-span-2 text-center scale-95">{sale.totalItem} item(s)</h1>
          <h1 className="text-right col-span-3 lg:col-span-2 scale-95">
            {currencyFormat(parseInt(sale.totalTransaction))}
          </h1>
        </div>
      );
    });
  };

  return (
    <div className="modal-background">
      <div className="modal-container h-fit w-[93%]">
        <ClosedBtnModal setModal={setAllProducts} />
        <div>
          <h1 className="modal-header-text">Top Sales By Products</h1>
          <div
            className="flex flex-col text-xs md:text-sm md:-gap-2 md:-mt-4
        lg:text-base"
          >
            <h1>
              <i className="font-normal">
                {filterState.month && filterState.year
                  ? `In ${months[filterState.month]}, ${filterState.year}, ${
                      warehouseChoice[0]?.warehouse_name ? "at " + warehouseChoice[0].warehouse_name : "all-warehouse"
                    }-warehouse`
                  : `In 2023, ${
                      warehouseChoice[0]?.warehouse_name
                        ? "at " + warehouseChoice[0].warehouse_name + "-warehouse"
                        : "all-warehouse"
                    }`}
              </i>{" "}
            </h1>
          </div>
          <div
            className="text-xs md:text-sm overflow-auto max-h-[27.5rem] mt-3 mb-4
      flex flex-col gap-1 md:gap-2 shadow-inner bg-slate-100 p-2"
          >
            <div
              className=" px-2 md:px-4 text-primary font-bold text-sm py-2 md:py-2
              md:text-lg lg:text-xl grid grid-cols-9 items-center"
            >
              <h1 className="col-span-4 lg:col-span-5 ">product</h1>
              <h1 className="col-span-2 text-center">qty</h1>
              <h1 className="text-right col-span-3 lg:col-span-2">total sales</h1>
            </div>
            <RenderData />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllTopProducts;
