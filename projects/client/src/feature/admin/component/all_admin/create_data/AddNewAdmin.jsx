import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomForm from "../../../../../components/CustomForm";
import CustomSelect from "../../../../../components/CustomSelect";
import { useDispatch } from "react-redux";
import RenderCity from "../edit_data/RenderCity";
import RenderWarehouse from "../edit_data/RenderWarehouse";
import { createNewAdmin, getAllAdmin, getWarehousesInCities } from "../../../";

function AddNewAdmin(props) {
  const { setNewAdminClicked, warehouseCities, page } = props;
  const dispatch = useDispatch();
  const [selectCity, setCity] = useState();
  const [warehouses, setWarehouses] = useState([]);

  // get warehouse list after select city
  const getDataWarehouse = async (cityInput) => {
    const data = await getWarehousesInCities(cityInput);
    setWarehouses([...data]);
  };

  useEffect(() => {
    getDataWarehouse(selectCity);
  }, [selectCity]);
  // =========================================

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const passwordRegex = /^(?=.*\d).{6,}$/;

  const registerSchema = Yup.object().shape({
    username: Yup.string().required("must not blank"),
    email: Yup.string().required("must not blank").email("invalid email format"),
    password: Yup.string()
      .min(6, "password is too short - at least 6 chars minimum")
      .matches(passwordRegex, "must contain 1 number")
      .required(),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
    phone_number: Yup.string().required("must not blank").matches(phoneRegExp, "phone number is not valid"),
    id_city: Yup.number("required").required("required"),
    id_warehouse: Yup.number("required").required("required"),
  });

  const onSubmit = async (values, action) => {
    const result = await createNewAdmin(values);
    alert(result.message);
    await dispatch(getAllAdmin(page));
    setNewAdminClicked(false);
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <button onClick={() => setNewAdminClicked(false)} className="close-btn-modal">
          <i className="uil uil-times-circle"></i>
        </button>
        <div>
          <h1 className="my-4 font-bold">Create Warehouse Admin</h1>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
              phone_number: "",
              id_city: "",
              id_warehouse: "",
            }}
            validationSchema={registerSchema}
            onSubmit={onSubmit}
          >
            {(formikProps) => {
              // get warehouse list after select city
              setCity(formikProps.values.id_city);
              // =========================================
              return (
                <Form className="form-container">
                  <CustomForm label="username" name="username" type="text" id="username" />
                  <CustomForm label="email" name="email" type="email" id="email" />
                  <CustomForm label="password" name="password" type="password" id="password" />
                  <CustomForm label="confirm password" name="confirmPassword" type="password" id="confirm-password" />
                  <CustomForm label="phone number" name="phone_number" type="text" id="phoneNumber" />
                  <CustomSelect
                    // get warehouse list after select city
                    onChange={formikProps.handleChange}
                    // =========================================
                    label="city"
                    name="id_city"
                  >
                    <option value="">Select City</option>
                    <RenderCity warehouseCities={warehouseCities} />
                  </CustomSelect>
                  <CustomSelect label="warehouse" name="id_warehouse">
                    <option value="">Select Warehouse</option>
                    <RenderWarehouse warehouses={warehouses} />
                  </CustomSelect>
                  <div className="row-start-8 row-span-1">
                    <div className="grid grid-cols-2 gap-8 text-sm h-5/6 mt-4">
                      <button className="bg-slate-800 text-white" type="submit">
                        Create
                      </button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default AddNewAdmin;
