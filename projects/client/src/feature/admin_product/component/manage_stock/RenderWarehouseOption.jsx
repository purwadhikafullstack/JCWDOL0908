import React from "react";

function RenderWarehouseOption(props) {
  const { warehouses } = props;
  return warehouses.map((warehouse) => {
    return (
      <option key={warehouse.id_warehouse} value={warehouse.id_warehouse}>
        {warehouse.warehouse_name}
      </option>
    );
  });
}

export default RenderWarehouseOption;
