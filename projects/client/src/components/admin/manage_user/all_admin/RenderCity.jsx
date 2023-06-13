import React from "react";

function RenderCity(props) {
  const { warehouseCities } = props;
  return warehouseCities.map((data) => {
    return (
      <option key={data.id_city} value={data.id_city}>
        {data.type_city} {data.city}
      </option>
    );
  });
}

export default RenderCity;
