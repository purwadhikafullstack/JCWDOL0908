import Jumbotron from "../../../components/Jumbotron";
import LayoutClient from "../../../components/LayoutClient";
import ProfileContainer from "../../../feature/profile/components/ProfileContainer";
import { H3 } from "../../../components/Typo";
import AddressItem from "../../../feature/profile/components/AddressItem";
import { useEffect, useState } from "react";
import { getUserAddresses, removeAddress, setPrimaryAddress } from "../../../feature/profile";
import { ToastError, ToastSuccess } from "../../../helper/Toastify";
import Pagination from "../../../components/Pagination";
import ModalAddress from "../../../feature/profile/components/ModalAddress";
import ModelAddressDelete from "../../../feature/profile/components/ModelAddressDelete";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../feature/LoaderSlice";
import { useNavigate } from "react-router-dom";

function Address() {
  const { user } = useSelector((state) => state.user);
  const [address, setAddress] = useState({ metadata: {}, addresses: [] });
  const [page, setPage] = useState(1);
  const [trigger, setTrigger] = useState({
    action: "",
    address: {},
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    (async () => {
      // handle trigger default
      if (trigger.action === "set-default") {
        await handleSetDefault(trigger.address.id);
      }

      try {
        const res = await getUserAddresses(page);
        setAddress({ metadata: res.data.data.metadata, addresses: res.data.data.addresses });
      } catch (error) {
        ToastError(error.message || "Failed to get user addresses");
      }
    })();


  }, [page, trigger]);

  const { metadata, addresses } = address;

  // handle delete address
  const handleDelete = async () => {
    dispatch(setLoading(true));
    try {
      await removeAddress(trigger.address.id);
      ToastSuccess("Success remove address");
    } catch (error) {
      ToastError(error.message || "Failed to delete address");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // handle set default address
  const handleSetDefault = async (addressId) => {
    dispatch(setLoading(true));
    try {
      const res = await setPrimaryAddress(addressId);
      ToastSuccess(res.data.message || "Success set default address");
    } catch (error) {
      ToastError(error.message || "Failed to set default address");
    } finally {
      dispatch(setLoading(false));
      setTrigger({ action: "", address: {} });
    }
  };

  if (!user?.id) {
    ToastError("You must login first");
    window.location.href = "/client";
  }

  return (
    <LayoutClient>
      <Jumbotron title="Account | Address" />
      <ModalAddress
        isOpen={trigger.action === "add" || trigger.action === "edit"}
        onClose={() => setTrigger({ action: "", address: {} })}
        address={trigger.address || {}}
      />
      <ModelAddressDelete
        isOpen={trigger.action === "delete"}
        onClose={() => setTrigger({ action: "", address: {} })}
        address={trigger.address}
        onDelete={handleDelete}
      />
      <section className="py-6">
        <ProfileContainer pageName="address">
          <div className="flex justify-between flex-row mb-3">
            <H3>List Address</H3>
            <button
              className="px-3 py-1 flex items-center rounded-md bg-primaryLight text-white font-bold font-title hover:bg-primary"
              onClick={() => {
                setTrigger({ action: "add", address: {} });
              }}
            >
              Add new address
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {
              addresses.length > 0 ? (
                addresses.map((address, index) => {
                  const data = {
                    id: address.id_address,
                    address: address.address,
                    isPrimary: address.is_primary,
                    notes: address.notes,
                    id_city: address.city.id_city,
                    zip_code: address.zip_code,
                    city: address.city.city,
                    type_city: address.city.type_city,
                    province: address.city.province.province,
                    id_province: address.city.province.id_province,
                  };
                  return (
                    <AddressItem
                      key={index}
                      address={data}
                      setTrigger={setTrigger}
                    />
                  );
                })
              ) : (<p className="text-gray-500 font-body">You don't have any address yet</p>)
            }

            {metadata.total_page > 1 && (<Pagination metadata={metadata} setPage={setPage} />)}
          </div>
        </ProfileContainer>
      </section>
    </LayoutClient>
  );
}

export default Address;