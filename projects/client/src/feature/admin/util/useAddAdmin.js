import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createNewAdmin, getAllAdmin, getWarehousesInCities } from "../";
import * as Yup from "yup";

export const useAddAdmin = (setNewAdminClicked, page) => {
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
    const createAdminBtn = document.getElementById("create-admin-btn");
    createAdminBtn.disabled = true;
    const result = await createNewAdmin(values);
    alert(result.message);
    await dispatch(getAllAdmin(page));
    createAdminBtn.disabled = false;
    setNewAdminClicked(false);
  };

  return {
    selectCity,
    setCity,
    warehouses,
    setWarehouses,
    registerSchema,
    onSubmit,
    phoneRegExp,
  };
};
