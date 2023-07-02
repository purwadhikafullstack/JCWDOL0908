import LayoutClient from "../../components/LayoutClient";
import Jumbotron from "../../components/Jumbotron";
import { H3 } from "../../components/Typo";
import { useEffect, useState } from "react";
import ModalAddress from "../../feature/profile/components/ModalAddress";
import { getPrimaryAddress } from "../../feature/profile";
import { ToastError } from "../../helper/Toastify";
import ModalListAddress from "../../feature/checkout/components/ModalListAddress";
import { useSelector } from "react-redux";
import CartItem from "../../feature/cart/components/CartItem";
import { Link } from "react-router-dom";
import SummaryCheckout from "../../feature/checkout/components/SummaryCheckout";
import DeliveryMethod from "../../feature/checkout/components/DeliveryMethod";

function Checkout() {
  const [selectedAddress, setSelectedAddress] = useState({});
  const products = useSelector((state) => state.cart.cart);
  const [selectedCourier, setSelectedCourier] = useState({});
  const [trigger, setTrigger] = useState({
    action: "",
    address: {},
  });

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

  useEffect(() => {
    (async () => {
      await fetchPrimaryAddress();
    })();
  }, []);


  const subTotal = products.reduce((a, b) => a + b.product.price * b.quantity, 0);

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
                          <button
                            type="button"
                            className="px-3 py-2 flex items-center rounded-md border text-gray-900 font-medium font-title hover:bg-gray-100"
                            onClick={() => setTrigger({ action: "change", address: {} })}
                          >
                            Choose Another Address
                          </button>
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
                  </div>
                  <DeliveryMethod
                    address={selectedAddress}
                    selectedCourier={selectedCourier}
                    setSelectedCourier={setSelectedCourier} />
                </div>
                <SummaryCheckout subTotal={parseInt(subTotal)} shipping={selectedCourier?.cost?.cost[0].value} />
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