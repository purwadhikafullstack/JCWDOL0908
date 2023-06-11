import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomForm from "../CustomForm";
import CustomSelect from "../CustomSelect";
import { createNewAdmin, getAllAdmin, getWarehouses } from "../../../../feature/admin/AdminSlice";
import { useDispatch } from "react-redux";

function AddNewAdmin(props) {
  const { setNewAdminClicked, warehouseCities, page } = props;
  const dispatch = useDispatch();
  const [selectCity, setCity] = useState();
  const [warehouses, setWarehouses] = useState([]);

  // get warehouse list after select city
  const getDataWarehouse = async (input) => {
    const data = await getWarehouses(input);
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

  const RenderCity = () => {
    return warehouseCities.map((data) => {
      return (
        <option key={data.id_city} value={data.id_city}>
          {data.type_city} {data.city}
        </option>
      );
    });
  };

  const RenderWarehouse = () => {
    return warehouses.map((warehouse) => {
      return (
        <option key={warehouse.id_warehouse} value={warehouse.id_warehouse}>
          {warehouse.warehouse_name}
        </option>
      );
    });
  };

  const onSubmit = async (values, action) => {
    let result = await createNewAdmin(values);
    alert(result.message);
    await dispatch(getAllAdmin(page));
    setNewAdminClicked(false);
  };

  return (
    <div
      className="fixed maxvh maxvw bg-white z-30 top-0 left-0 modal-container
  flex items-center justify-center"
    >
      <div
        className="px-4 w-5/6 bg-slate-50 relative md:translate-x-24 md:w-1/2
      lg:w-1/3 py-4"
      >
        <button
          onClick={() => setNewAdminClicked(false)}
          className="text-red-700 absolute top-0 right-1 font-bold text-xl"
        >
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
              id_city: "0",
              id_warehouse: "0",
            }}
            validationSchema={registerSchema}
            onSubmit={onSubmit}
          >
            {(formikProps) => {
              // get warehouse list after select city
              setCity(formikProps.values.id_city);
              // =========================================
              return (
                <Form className="grid grid-rows-8 py-4 text-slate-800 gap-3 overflow-auto">
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
                    <option value="0">Select City</option>
                    <RenderCity />
                  </CustomSelect>
                  <CustomSelect label="warehouse" name="id_warehouse">
                    <option value="0">Select Warehouse</option>
                    <RenderWarehouse />
                  </CustomSelect>
                  <div className="row-start-8 row-span-1">
                    <div className="grid grid-cols-2 gap-8 text-sm h-5/6 mt-4">
                      <button className="bg-green-800 text-white" type="submit">
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
