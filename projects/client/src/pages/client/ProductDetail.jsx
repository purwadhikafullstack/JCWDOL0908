import LayoutClient from "../../components/LayoutClient";
import Jumbotron from "../../components/Jumbotron";
import { H3 } from "../../components/Typo";
import { useEffect, useState } from "react";
import { singleProducts } from "../../feature/products";
import { ToastError } from "../../helper/Toastify";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../feature/LoaderSlice";
import { numberFormat } from "../../helper/number_format";
import emptyImage from "../../images/empty.jpg";
import { addToCart } from "../../feature/cart/slice/CartSlice";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    (async () => {
      dispatch(setLoading(true));
      try {
        const response = await singleProducts(id);
        setProduct(response.data.data);
      } catch (error) {
        ToastError(error.message || "something went wrong");
      } finally {
        dispatch(setLoading(false));
      }
    })();
  }, []);

  const productImage = process.env.REACT_APP_SERVER_URL + product?.product_image || emptyImage;

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handlePlus = () => {
    if (quantity < product?.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart({
      productID: product?.id_product,
      quantity: quantity,
    }));
  };

  return (
    <LayoutClient>
      <Jumbotron title={`Product Detail | ${product?.product_name}`} />
      <section className="page_container">
        <div className="flex py-6 sm:flex-row flex-col">
          <div className="sm:w-8/12 w-full">
            <div className="w-full sm:h-[400px] h-auto shadow-lg rounded-lg overflow-hidden">
              <img src={productImage}
                   alt={product?.product_name}
                   className="w-full h-full object-cover"
                   onError={(e) => e.target.src = emptyImage} />
            </div>
            <div className="flex flex-wrap mt-4">
              <H3 className="sm:hidden flex">
                {product?.product_name}
              </H3>
              <div className="w-full mt-3" dangerouslySetInnerHTML={{ __html: product?.description }} />
            </div>
          </div>
          <div className="sm:w-4/12 w-full sm:pl-6 mt-6 sm:mt-0">
            <H3 className="hidden sm:flex">{product?.product_name}</H3>
            <div className="flex flex-wrap mt-3 font-body">
              Price: <span className="ml-2 text-primaryLight">{numberFormat(product?.price)}</span>
            </div>
            <div className="flex flex-wrap mt-3 font-body">
              Status: {product.stock > 0 ? <span className="ml-2 text-green-500">In Stock</span> :
              <span className="ml-2 text-red-500">Out of Stock</span>}
            </div>
            <div className="flex flex-wrap mt-3 font-body">
              Weight: <span className="ml-2">{product?.weight_kg} Kg</span>
            </div>
            {
              product.stock > 0 && (
                <form action="" onSubmit={handleAddToCart}
                      className="flex flex-col flex-wrap mt-3 font-body border-t pt-3">
                  <div className="flex flex-row items-center justify-between">
                    <label htmlFor="qty" className="">Qty</label>
                    <div className="flex flex-wrap flex-row">
                      <button type="button"
                              className="px-3 py-2 border border-r-0 border-gray-300 rounded-l-md hover:bg-gray-100"
                              onClick={handleMinus}>-
                      </button>
                      <input type="number" name="qty" id="qty" min={1} max={product?.stock} value={quantity}
                             onChange={handleQuantityChange}
                             className="w-10 text-center border-t border-b border-gray-300 num-field" />
                      <button type="button"
                              className="px-3 py-2 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-100"
                              onClick={handlePlus}>+
                      </button>
                    </div>
                  </div>
                  {
                    user.email ? (
                      <button type="submit"
                              className="mt-3 px-4 py-2 bg-primaryLight text-white rounded-md hover:bg-primary">
                        Add to cart <i className="uil uil-shopping-cart-alt mr-2" />
                      </button>
                    ) : (
                      <div
                        className="mt-3 px-4 py-2 text-white rounded-md text-center bg-primaryLight/30 cursor-not-allowed">
                        Login to add to cart <i className="uil uil-shopping-cart-alt mr-2" />
                      </div>
                    )
                  }
                </form>
              )
            }
          </div>
        </div>
      </section>
    </LayoutClient>
  );
}

export default ProductDetail;