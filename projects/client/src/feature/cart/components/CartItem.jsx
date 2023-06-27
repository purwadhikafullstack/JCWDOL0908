import { numberFormat } from "../../../helper/number_format";
import defaultImage from "../../../images/empty.jpg";
import { useDispatch } from "react-redux";
import { addToCart, RemoveFromCart } from "../slice/CartSlice";

function CartItem({ product }) {
  const dispatch = useDispatch();
  const image_url = product.product.product_image ? `${process.env.REACT_APP_SERVER_URL}/${product.product.product_image}` : defaultImage;
  const handleMinus = () => {
    const payload = {
      productID: product.id_product,
      quantity: -1,
    };
    dispatch(addToCart(payload));
  };

  const handlePlus = () => {
    const payload = {
      productID: product.id_product,
      quantity: 1,
    };
    dispatch(addToCart(payload));
  };

  const handleRemove = () => {
    dispatch(RemoveFromCart(product.id_product));
  };

  return (
    <div className="flex sm:flex-row flex-col justify-between">
      <div className="flex flex-row sm:items-center sm:space-x-4 gap-2 space-y-2 sm:space-y-0">
        <img
          src={image_url}
          alt={product.product.product_name}
          className="w-20 h-20 object-cover rounded"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultImage;
          }}
        />
        <div className="flex flex-col">
          <span className="font-bold font-title text-gray-700">{product.product.product_name}</span>
          <span className="text-sm text-gray-400">
            <span className="font-medium">Price:</span> {numberFormat(product.product.price)}
          </span>
          <span className="text-sm text-gray-400">
            <span className="font-medium">Weight:</span> {product?.product.weight_kg * product?.quantity} kg
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-2 flex-row gap-3 justify-end">
        <button
          className="flex items-center justify-center text-gray-500"
          title="Remove"
          onClick={handleRemove}>
          <i className="uil uil-trash-alt"></i>
        </button>
        <div className="flex flex-wrap flex-row">
          <button type="button"
                  className="px-3 py-2 border border-r-0 border-gray-300 rounded-l-md hover:bg-gray-100"
                  onClick={handleMinus}>-
          </button>
          <span className="w-10 text-center border-t border-b border-gray-300 flex items-center justify-center">
            {product.quantity}
          </span>
          <button type="button"
                  className="px-3 py-2 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-100"
                  onClick={handlePlus}>+
          </button>
        </div>
        <div className="items-center space-x-2 sm:flex hidden min-w-[100px]">
          <span className="text-sm text-gray-400">{numberFormat(product.product.price * product.quantity)}</span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;