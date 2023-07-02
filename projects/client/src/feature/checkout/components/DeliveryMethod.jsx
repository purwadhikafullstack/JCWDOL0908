import { H3 } from "../../../components/Typo";
import { Menu } from "@headlessui/react";
import { shippingCost } from "../api/shippingCost";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { numberFormat, removeHari } from "../../../helper/number_format";
import { setLoading } from "../../LoaderSlice";
import { ToastError } from "../../../helper/Toastify";

function DeliveryMethod({ address, selectedCourier, setSelectedCourier }) {
  const [courier, setCourier] = useState([]);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const fetchCourier = async () => {
    dispatch(setLoading(true));
    try {
      const carts = cart.map((item) => item.id_cart);
      const res = await shippingCost({
        id_address: address.id_address,
        carts,
      });
      setCourier(res.data.data);
    } catch (error) {
      ToastError(error.message || "Failed to get shipping cost");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    (async () => {
      if (address.id_address) {
        setSelectedCourier({});
        await fetchCourier();
      }
    })();
  }, [address]);


  return (
    <div className="py-3">
      <H3>Choose Delivery Method</H3>
      <div className="flex sm:flex-row flex-col gap-2">
        <div className="flex flex-col w-full sm:w-1/2">
          <Menu as="div" className="flex flex-col relative ">
            <Menu.Button
              className="font-title text-left text-lg border bg-primaryLight text-white rounded-md hover:border-primary px-3 py-1 cursor-pointer capitalize flex justify-between">
              {selectedCourier?.code ? `${selectedCourier?.code} - ${selectedCourier?.cost?.service}` : "Choose Courier"}
              <i className="uil uil-angle-down" />
            </Menu.Button>

            {
              courier && (
                <Menu.Items className="flex flex-col shadow-lg border w-full absolute top-10 rounded-md bg-primary">
                  {
                    // map and item, index
                    courier.map((item, index) => (
                      item?.costs.map((cost, index) => (
                        <Menu.Item key={index}>
                          {({ active }) => (
                            <button
                              onClick={() => setSelectedCourier({ ...item, cost })}
                              className={`flex items-center justify-between px-3 py-2 cursor-pointer capitalize ${active ? "bg-primary text-white" : "bg-gray-100"}`}
                            >
                              {item.code}- {cost.service} ({removeHari(cost.cost[0].etd)} days)
                            </button>
                          )}
                        </Menu.Item>
                      ))
                    ))
                  }
                </Menu.Items>
              )
            }
          </Menu>
        </div>
        {
          selectedCourier?.cost?.cost[0].value && (
            <div className="flex flex-col w-full sm:w-1/2 gap-2 bg-gray-100 p-3">
              <p className="font-body"> Courier : {selectedCourier?.code}</p>
              <p className="font-body"> Service : {selectedCourier?.cost?.service}</p>
              <p className="font-body"> Estimation : {removeHari(selectedCourier?.cost?.cost[0].etd)} days</p>
              <p className="font-body"> Price : {numberFormat(selectedCourier?.cost?.cost[0].value)}</p>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default DeliveryMethod;