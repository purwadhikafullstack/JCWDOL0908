import { ErrorMessage, Field, Form, Formik } from "formik";
import { LoginValidation } from "../../../validation/User";
import { useDispatch } from "react-redux";
import { setLoading } from "../../LoaderSlice";
import { ToastError, ToastSuccess } from "../../../helper/Toastify";
import { useNavigate } from "react-router-dom";
import FieldPassword from "../../../components/FieldPassword";
import Storage from "../../../helper/Storage";
import { KeepUser } from "../slice/UserSlice";

const { loginWithEmailAndPassword } = require("../../auth");

const LoginForm = ({ handlePage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    await dispatch(setLoading(true));
    try {
      const response = await loginWithEmailAndPassword(values.email, values.password);
      const token = response.data.data.token;
      Storage.setToken(token);
      await dispatch(KeepUser(token));
      await dispatch(setLoading(false));
      ToastSuccess("Login Success");
      setTimeout(() => {
        navigate(-1);
      }, 600);
    } catch (error) {
      await dispatch(setLoading(false));
      ToastError(error.response.data.message || "Login Failed");
    }
  };

  return (
    <>
      <Formik initialValues={{ email: "", password: "" }} onSubmit={handleSubmit} validationSchema={LoginValidation}>
        <Form>
          <span className="font-body">Welcome to</span>
          <h1 className="font-title text-2xl text-primary font-bold">
            Furniture<span className="text-primaryLight">.co</span>
          </h1>
          <div className="flex flex-col gap-3 mt-3">
            <div className="group">
              <Field type="email" className="border w-full p-3 rounded-md font-body" placeholder="Email" name="email" />
              <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
            </div>
            <div className="group relative">
              <FieldPassword name="password" placeholder="Password" autocomplate="off" />
            </div>
            <div className="group">
              <button className="px-6 py-2 bg-primary text-white font-title rounded-sm w-full" type="submit">
                Sign In
              </button>
            </div>
          </div>
        </Form>
      </Formik>
      <div className="flex justify-between font-body text-sm mt-5">
        <p>
          Don't have an Account?{" "}
          <button className="text-secondary" onClick={() => handlePage("register")}>
            Sign Up
          </button>
        </p>
        <button
          onClick={() => handlePage("reset")}
          className="text-secondary">Reset Password?
        </button>
      </div>
    </>
  );
};

export default LoginForm;
