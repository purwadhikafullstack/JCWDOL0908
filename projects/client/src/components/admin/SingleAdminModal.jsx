import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import CustomForm from "./CustomForm";
import CustomSelect from "./CustomSelect";
import { getWarehouses } from "../../feature/admin/AdminSlice";

function SingleAdminModal(props) {
  const { warehouseCities } = props;
  const [selectCity, setCity] = useState();
  const [warehouses, setWarehouses] = useState([]);
  const singleData = useSelector((state) => state.admin.singleAdminWarehouse);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const getDataWarehouse = async (input) => {
    const data = await getWarehouses(input);
    setWarehouses([...data]);
  };

  useEffect(() => {
    getDataWarehouse(selectCity);
  }, [selectCity]);

  useEffect(() => {
    getDataWarehouse(singleData.id_city);
  }, []);

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

  const editSchema = Yup.object().shape({
    username: Yup.string().required("must not blank"),
    email: Yup.string().required("must not blank").email("invalid email format"),
    password: Yup.string().min(5, "password is too short - at least 5 chars minimum"),
    phoneNumber: Yup.string().required("must not blank").matches(phoneRegExp, "phone number is not valid"),
    id_city: Yup.number("required").required("required"),
    id_warehouse: Yup.number("required").required("required"),
  });

  const onSubmit = async (values, action) => {
    console.log(values);
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
        <button onClick={() => props.setModal(false)} className="text-red-700 absolute top-0 right-1 font-bold text-xl">
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
          {(props) => {
            setCity(props.values.id_city);
            return (
              <Form className="grid grid-rows-8 py-4 text-slate-800 gap-3 overflow-auto">
                <h1 className="font-semibold">Edit Data</h1>
                <CustomForm label="username" name="username" type="text" id="username" />
                <CustomForm label="email" name="email" type="email" id="email" />
                <CustomForm label="reset password" name="password" type="password" id="password" />
                <CustomForm label="phone" name="phoneNumber" type="text" id="phoneNumber" />
                <CustomSelect onChange={props.handleChange} label="city" name="id_city">
                  <option value="">Select City</option>
                  <RenderCity />
                </CustomSelect>
                <CustomSelect label="warehouse" name="id_warehouse">
                  <option value="">Select Warehouse</option>
                  <RenderWarehouse />
                </CustomSelect>

                <div className="row-start-8 row-span-1">
                  <div className="grid grid-cols-2 gap-8 text-sm h-5/6 mt-4">
                    <button className="bg-green-800 text-white" type="submit" disabled={props.isSubmitting}>
                      confirm
                    </button>
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

export default SingleAdminModal;
