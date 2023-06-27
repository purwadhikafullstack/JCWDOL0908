import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { H3 } from "../../../components/Typo";
import { getUserAddresses } from "../../profile";
import { ToastError } from "../../../helper/Toastify";
import AddressItem from "../../profile/components/AddressItem";
import Pagination from "../../../components/Pagination";

function ModalListAddress({ isOpen, onClose, selectedAddress, setSelectedAddress }) {
  const [address, setAddress] = useState({ metadata: {}, addresses: [] });
  const [page, setPage] = useState(1);
  useEffect(() => {
    (async () => {
      try {
        const res = await getUserAddresses(page);
        setAddress({ metadata: res.data.data.metadata, addresses: res.data.data.addresses });
      } catch (error) {
        ToastError(error.message || "Failed to get user addresses");
      }
    })();

  }, [page, isOpen]);

  const { metadata, addresses } = address;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="sm:w-[600px]  w-[380px] bg-white rounded-sm shadow-xl p-6">
          <H3>Choose Address</H3>
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
                    <button className="text-left" onClick={() => {
                      setSelectedAddress(address);
                      onClose();
                    }} key={index}>
                      <AddressItem
                        selectedAddress={selectedAddress.id_address}
                        withAction={false}
                        address={data}
                        setTrigger={() => {
                        }}
                      />
                    </button>
                  );
                })
              ) : (<p className="text-gray-500 font-body">You don't have any address yet</p>)
            }

            {metadata.total_page > 1 && (<Pagination metadata={metadata} setPage={setPage} />)}
          </div>
        </Dialog.Panel>
      </div>

    </Dialog>
  );
}

export default ModalListAddress;