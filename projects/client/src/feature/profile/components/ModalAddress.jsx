import { Dialog } from "@headlessui/react";
import { H3 } from "../../../components/Typo";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { ToastError, ToastSuccess } from "../../../helper/Toastify";
import { addAddress, getCitiesByProvince, getProvince, updateAddress } from "../api/Address";
import { AddressValidation } from "../../../validation/Address";
import { useDispatch } from "react-redux";
import { setLoading } from "../../LoaderSlice";


/**
 * Modal address form used to add or edit address
 * @param isOpen
 * @param onClose
 * @param address - address is an object contains { address, notes, city, province}
 * @returns {JSX.Element}
 */
function ModalAddress({ isOpen, onClose, address }) {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    dispatch(setLoading(true));

    const payload = {
      address: values.address,
      notes: values.notes,
      id_city: values.city,
      zip_code: values.zip_code,
    };

    try {
      // if address is not null, then it's edit address
      if (address?.id) {
        const res = await updateAddress(address.id, payload);
        ToastSuccess(res.data.message || "Success update address");
        onClose();
      } else {
        const res = await addAddress(payload);
        ToastSuccess(res.data.message || "Success save address");
        onClose();
      }
    } catch (error) {
      ToastError(error.message || "Failed save address");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchProvinces = async () => {
    try {
      const res = await getProvince();
      setProvinces(res.data.data);
    } catch (error) {
      ToastError(error.message || "Failed to load data");
    }
  };

  const fetchCities = async (provinceId) => {
    try {
      const res = await getCitiesByProvince(provinceId);
      setCities(res.data.data);
    } catch (error) {
      ToastError(error.message || "Failed to load data");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        dispatch(setLoading(true));
        // promise to get provinces and cities
        await Promise.all([
          fetchProvinces(),
          fetchCities(address.id_province || 1),
        ]);
      } catch (error) {
        ToastError(error.message || "Failed to load data");
      } finally {
        dispatch(setLoading(false));
      }
    })();
  }, [address]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="sm:w-[600px]  w-[380px] bg-white rounded-sm shadow-xl p-6">
          <H3>{address.id_city ? "Edit Address" : "Add New Address"}</H3>
          <Formik
            initialValues={{
              address: address ? address.address : "",
              notes: address ? address.notes : "",
              city: address ? address.id_city : "",
              province: address ? address.id_province : "",
              zip_code: address ? address.zip_code : "",
            }}
            validationSchema={AddressValidation}
            onSubmit={handleSubmit}>
            {({ handleChange,setFieldValue }) => {
              return (
                <Form>
                  <div className="flex flex-col gap-3">
                    <label htmlFor="address" className="block font-medium text-gray-700 mt-3">
                      Address
                    </label>
                    <Field
                      id="address"
                      name="address"
                      as="textarea"
                      placeholder="Complete address"
                      className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <ErrorMessage name="address" component="p" className="text-red-500 text-sm text-center py-1" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label htmlFor="notes" className="block font-medium text-gray-700 mt-3">
                      Notes
                    </label>
                    <Field
                      id="notes"
                      name="notes"
                      as="input"
                      placeholder="Notes"
                      className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <ErrorMessage name="notes" component="p" className="text-red-500 text-sm text-center py-1" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label htmlFor="notes" className="block font-medium text-gray-700 mt-3">
                      Zip Code
                    </label>
                    <Field
                      id="zip_code"
                      name="zip_code"
                      as="input"
                      placeholder="Zip Code / Postal Code"
                      className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <ErrorMessage name="zip_code" component="p" className="text-red-500 text-sm text-center py-1" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label htmlFor="province" className="block font-medium text-gray-700 mt-3">
                      Province
                    </label>
                    <Field
                      id="province"
                      name="province"
                      as="select"
                      placeholder="Province"
                      className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      onChange={async (e) => {
                        handleChange(e);
                        await fetchCities(e.target.value);
                        // reset city value
                        await setFieldValue("city", "");
                      }}
                    >
                      <option value="" >Select Province</option>
                      {provinces.map((province) => (
                        <option key={province.id_province} value={province.id_province}>{province.province}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="province" component="p" className="text-red-500 text-sm text-center py-1" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label htmlFor="city" className="block font-medium text-gray-700 mt-3">
                      City
                    </label>
                    <Field
                      id="city"
                      name="city"
                      as="select"
                      placeholder="City"
                      className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city.id_city} value={city.id_city}>{`${city.type_city} - ${city.city}`}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="city" component="p" className="text-red-500 text-sm text-center py-1" />
                  </div>
                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      type="button"
                      onClick={onClose}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                    >
                      {address?.id ? "Update" : "Save"}
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default ModalAddress;