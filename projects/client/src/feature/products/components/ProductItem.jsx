import defaultImage from "../../../images/empty.jpg";
import { Link } from "react-router-dom";
import { numberFormat } from "../../../helper/number_format";

function ProductItem({ product_name, category_name, price, product_image, id_product, stock }) {
  const image_url = product_image ? `${process.env.REACT_APP_API_URL}/${product_image}` : defaultImage;
  return (
    <Link className="flex" to={`/products/${id_product}`}>
      <div
        className="flex flex-col gap-1 bg-white rounded-md p-3 border border-transparent hover:shadow-md hover:border hover:border-gray-100 relative">
        {stock === 0 && (
          <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
            Out of Stock
          </div>
        )}
        <div className="w-full h-[200px]">
          <img
            src={image_url}
            alt={product_name}
            className="w-full h-full object-cover rounded-md"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultImage;
            }}
          />
        </div>
        <div className="flex flex-col">
          <div className="text-xs text-gray-400">{category_name}</div>
          <div className="font-semibold">{product_name}</div>
          <div className="text-sm font-semibold">{numberFormat(price)}</div>
        </div>

      </div>
    </Link>
  );
}

export default ProductItem;