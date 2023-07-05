import React from "react";

function RenderProductsOption(props) {
  const { products } = props;
  return products?.map((product) => {
    return (
      <option key={product.id_product} value={product.id_product}>
        {product.product_name.toUpperCase()}
      </option>
    );
  });
}

export default RenderProductsOption;
