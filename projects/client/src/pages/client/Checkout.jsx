import LayoutClient from "../../components/LayoutClient";
import Jumbotron from "../../components/Jumbotron";
import { H3 } from "../../components/Typo";
import { useEffect, useState } from "react";
import ModalAddress from "../../feature/profile/components/ModalAddress";
import { getPrimaryAddress } from "../../feature/profile";
import { ToastError, ToastSuccess } from "../../helper/Toastify";
import ModalListAddress from "../../feature/checkout/components/ModalListAddress";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../../feature/cart/components/CartItem";
import { Link, useNavigate } from "react-router-dom";
import SummaryCheckout from "../../feature/checkout/components/SummaryCheckout";
import DeliveryMethod from "../../feature/checkout/components/DeliveryMethod";
import { createOrder } from "../../feature/checkout";
import { setLoading } from "../../feature/LoaderSlice";

function Checkout() {
  const [selectedAddress, setSelectedAddress] = useState({});
  const [selectedWarehouse, setSelectedWarehouse] = useState({});
  const products = useSelector((state) => state.cart.cart);
  const [stockAvailable, setStockAvailable] = useState({
    status: true,
    message: "",
  });
  const [selectedCourier, setSelectedCourier] = useState({});
  const [trigger, setTrigger] = useState({
    action: "",
    address: {},
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const subTotal = products.reduce((a, b) => a + b.product.price * b.quantity, 0);

  const fetchPrimaryAddress = async () => {
    try {
      const res = await getPrimaryAddress();
      setSelectedAddress(res.data.data);
    } catch (error) {
      ToastError(error.message || "Failed to get user addresses");
    }
  };


  const handleCloseInsert = async () => {
    setTrigger({ action: "", address: {} });
    await fetchPrimaryAddress();
  };

  const handleCheckout = async () => {
    dispatch(setLoading(true));
    try {
      const carts = products.map((item) => item.id_cart);
      await createOrder({
        id_address: selectedAddress.id_address,
        id_warehouse: selectedWarehouse.id_warehouse,
        carts,
        shipping_cost: selectedCourier?.cost?.cost[0].value,
        shipping_service: `${selectedCourier?.code} - ${selectedCourier?.cost?.service}`,
        total_price: subTotal + selectedCourier?.cost?.cost[0].value,
      });
      ToastSuccess("Checkout success");
      setTimeout(() => {
        navigate("/account/transaction");
      }, 1000);
    } catch (error) {
      ToastError(error.message || "Failed to checkout");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    (async () => {
      await fetchPrimaryAddress();
    })();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      products.forEach((product) => {
        if (product.quantity > product.product.stock) {
          setStockAvailable({
            status: false,
            message: `Stock for ${product.product.product_name} is not available` + (product.product.stock > 0 ? ` only ${product.product.stock} left remove and re add to cart` : ""),
          });
        }
      });
    }
  }, [products]);

  return (
    <LayoutClient>
      <Jumbotron title="Checkout" />
      <ModalAddress
        isOpen={trigger.action === "add"}
        onClose={handleCloseInsert}
        address={trigger.address || selectedAddress}
      />
      <ModalListAddress
        isOpen={trigger.action === "change"}
        onClose={() => setTrigger({ action: "", address: {} })}
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
      />
      <section className="py-6">
        <div className="page_container flex sm:flex-row flex-col min-h-[450px] gap-3">
          {
            products.length > 0 ? (
              <>
                <div className="w-full sm:w-8/12">
                  <div className="border-b-8">
                    <H3>Shipping Address</H3>
                    <div className="flex flex-col justify-between py-3 mb-3 rounded-md w-full gap-3 border-y">
                      {
                        selectedAddress?.id_city ? (
                          <>
                            <h3 className="text-lg font-semibold font-title capitalize">{selectedAddress?.notes}</h3>
                            <p className="text-gray-500 font-body">
                              {selectedAddress?.address}, {selectedAddress?.city.city}, {selectedAddress?.city.province.province}
                            </p>
                          </>
                        ) : (
                          <>
                            <h3 className="font-body">You don't have any address, please add new</h3>
                            <button
                              className="px-3 py-2 flex items-center rounded-md bg-primaryLight text-white font-medium font-title hover:bg-primary w-fit"
                              onClick={() => setTrigger({ action: "add", address: {} })}
                            >
                              Add New Address
                            </button>
                          </>
                        )
                      }
                    </div>
                    <div className="py-3">
                      {
                        selectedAddress?.id_city && (
                          <div className="flex flex-row gap-2">
                            <button
                              type="button"
                              className="px-3 py-2 flex items-center rounded-md border text-gray-900 font-medium font-title hover:bg-gray-100"
                              onClick={() => setTrigger({ action: "change", address: {} })}
                            >
                              Choose Another Address
                            </button>
                            <Link to="/account/address"
                                  className="px-3 py-2 flex items-center rounded-md border text-gray-900 font-medium font-title hover:bg-gray-100">
                              Manage Address
                            </Link>
                          </div>
                        )
                      }
                    </div>
                  </div>
                  <div className="border-b-8 py-3 flex flex-col gap-2">
                    {
                      products.map((product) => (
                        <CartItem key={product.id_product} product={product} withAction={false} />
                      ))
                    }
                    {
                      !stockAvailable.status && (
                        <div className="flex flex-col items-center justify-center py-6">
                          <span className="text-red-500 font-title text-lg">{stockAvailable.message}</span>
                        </div>
                      )
                    }
                  </div>
                  <DeliveryMethod
                    address={selectedAddress}
                    setSelectedWarehouse={setSelectedWarehouse}
                    selectedCourier={selectedCourier}
                    setSelectedCourier={setSelectedCourier} />
                </div>
                <SummaryCheckout
                  stockAvailable={stockAvailable}
                  handleCheckout={handleCheckout}
                  subTotal={parseInt(subTotal)}
                  shipping={selectedCourier?.cost?.cost[0].value} />
              </>
            ) : (
              <div className="w-full flex flex-col items-center justify-center gap-3">
                <h3 className="font-title">You don't have any product in cart, shop now!</h3>
                <Link
                  className="px-3 py-2 flex items-center rounded-md bg-primaryLight text-white font-medium font-title hover:bg-primary w-fit"
                  to="/products"
                >
                  Shop Now
                </Link>
              </div>
            )
          }
        </div>
      </section>
    </LayoutClient>
  );
}

export default Checkout;