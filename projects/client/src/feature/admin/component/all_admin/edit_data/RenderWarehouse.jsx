import React from "react";

function RenderWarehouse(props) {
  const { warehouses } = props;
  return warehouses?.map((warehouse) => {
    return (
      <option key={warehouse.id_warehouse} value={warehouse.id_warehouse}>
        {warehouse.type_city
          ? warehouse.warehouse_name + ", " + warehouse.type_city + " " + warehouse.city
          : warehouse.warehouse_name}
      </option>
    );
  });
}

export default RenderWarehouse;
