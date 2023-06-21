import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import CustomForm from "../../../../../components/CustomForm";
import CustomSelect from "../../../../../components/CustomSelect";
import ConfirmationModal from "./ConfirmationModal";
import RenderCity from "./RenderCity";
import RenderWarehouse from "./RenderWarehouse";
import { getAllAdmin, getWarehousesInCities, updateAdminWarehouse } from "../../../../../feature/admin";

function EditAdminModal(props) {
  const { warehouseCities, setModal, page } = props;
  const [selectCity, setCity] = useState();
  const [secondButtonValue, setSecondButtonValue] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const dispatch = useDispatch();
  const singleData = useSelector((state) => state.admin.singleAdminWarehouse);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const passwordRegex = /^(?=.*\d).{6,}$/;

  const getDataWarehouse = async (input) => {
    const data = await getWarehousesInCities(input);
    setWarehouses([...data]);
  };

  useEffect(() => {
    getDataWarehouse(selectCity);
  }, [selectCity]);

  useEffect(() => {
    getDataWarehouse(singleData.id_city);
  }, []);

  const editSchema = Yup.object().shape({
    username: Yup.string().required("must not blank").min(5, "username must be at least 5 chars length"),
    email: Yup.string().required("must not blank").email("invalid email format"),
    password: Yup.string()
      .min(6, "password is too short - at least 6 chars minimum")
      .matches(passwordRegex, "must contain 1 number"),
    phoneNumber: Yup.string().required("must not blank").matches(phoneRegExp, "phone number is not valid"),
    id_city: Yup.number("required").required("required"),
    id_warehouse: Yup.number("required").required("required"),
  });

  const onSubmit = async (values, action) => {
    if (secondButtonValue) {
      setConfirmationModal(true);
      setSecondButtonValue(false);
    } else {
      const result = await updateAdminWarehouse({ id_user: singleData.id_user, ...values });
      alert("success edit data");
      setConfirmationModal(false);
      await dispatch(getAllAdmin(page));
      setModal(false);
    }
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <button onClick={() => setModal(false)} className="text-red-700 absolute top-0 right-1 font-bold text-xl">
          <i className="uil uil-times-circle"></i>
        </button>
        <Formik
          initialValues={{
            username: singleData.username,
            email: singleData.email,
            password: "",
            phoneNumber: singleData.phone_number,
            id_city: singleData.id_city,
            id_warehouse: singleData.id_warehouse,
          }}
          validationSchema={editSchema}
          onSubmit={onSubmit}
        >
          {(formikProps) => {
            setCity(formikProps.values.id_city);
            return (
              <Form className="form-container">
                <h1 className="font-semibold">Edit Data</h1>
                <CustomForm label="username" name="username" type="text" id="username" />
                <CustomForm label="email" name="email" type="email" id="email" />
                <CustomForm label="reset password" name="password" type="password" id="password" />
                <CustomForm label="phone" name="phoneNumber" type="text" id="phoneNumber" />
                <CustomSelect onChange={formikProps.handleChange} label="city" name="id_city">
                  <option value="">Select City</option>
                  <RenderCity warehouseCities={warehouseCities} />
                </CustomSelect>
                <CustomSelect label="warehouse" name="id_warehouse">
                  <option value="">Select Warehouse</option>
                  <RenderWarehouse warehouses={warehouses} />
                </CustomSelect>
                <div className="row-start-8 row-span-1">
                  <div className="grid grid-cols-2 gap-8 text-sm h-5/6 mt-4">
                    <button className="bg-green-800 text-white" type="" onClick={() => setSecondButtonValue(true)}>
                      Submit
                    </button>
                    {confirmationModal ? (
                      <ConfirmationModal setConfirmationModal={setConfirmationModal} formikProps={formikProps} />
                    ) : null}
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default EditAdminModal;
