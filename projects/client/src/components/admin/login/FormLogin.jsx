import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomForm from "./CustomFormLogin";
import { loggingInAdmin } from "../../../feature/admin/AdminLogInSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function FormLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginSchema = Yup.object().shape({
    username: Yup.string().required("required"),
    password: Yup.string().required("required"),
  });

  const onSubmit = async (values, action) => {
    const result = await dispatch(loggingInAdmin(values.username, values.password));
    if (result) navigate("/admin/dashboard");
  };

  return (
    <Formik initialValues={{ username: "", password: "" }} validationSchema={loginSchema} onSubmit={onSubmit}>
      {(formikProps) => {
        return (
          <Form className="flex flex-col gap-4">
            <CustomForm placeholder="username" name="username" type="text" id="username" />
            <CustomForm placeholder="password" name="password" type="password" id="password" />
            <button className="p-1 bg-slate-800 text-white hover:bg-slate-950" type="submit">
              login
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default FormLogin;
