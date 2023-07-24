import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAdmin, getWarehousesInCities, updateAdminWarehouse } from "../";
import * as Yup from "yup";

export const useEditAdmin = (setModal, page) => {
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
      const confirmBtn = document.getElementById("confirm-admin-btn");
      confirmBtn.disabled = true;
      const result = await updateAdminWarehouse({ id_user: singleData.id_user, ...values });
      alert(result.message);
      setConfirmationModal(false);
      await dispatch(getAllAdmin(page));
      confirmBtn.disabled = false;
      setModal(false);
    }
  };

  return {
    selectCity,
    setCity,
    secondButtonValue,
    setSecondButtonValue,
    warehouses,
    setWarehouses,
    confirmationModal,
    setConfirmationModal,
    singleData,
    phoneRegExp,
    passwordRegex,
    editSchema,
    onSubmit,
  };
};
