import { useDispatch } from "react-redux";
import { setLoading } from "../../LoaderSlice";
import { ToastError, ToastSuccess } from "../../../helper/Toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { RegisterValidation } from "../../../validation/User";
import { registerBuyer } from "../api/Register";

const RegisterForm = ({ handlePage }) => {
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    await dispatch(setLoading(true));
    try {
      await registerBuyer(values.email);
      await dispatch(setLoading(false));
      ToastSuccess("Register Success Please Check Your Email");
      handlePage("login");
    } catch (error) {
      await dispatch(setLoading(false));
      ToastError(error.response.data.message || "Register Failed");
    }
  };
  return (
    <>
      <Formik initialValues={{ email: "" }} onSubmit={handleSubmit} validationSchema={RegisterValidation}>
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
            <div className="group">
              <button className="px-6 py-2 bg-primary text-white font-title rounded-sm w-full" type="submit">
                Sign Up
              </button>
            </div>
          </div>
        </Form>
      </Formik>
      <div className="flex justify-between font-body text-sm mt-5">
        <p>
          Already have an Account?{" "}
          <button className="text-secondary" onClick={() => handlePage("login")}>
            Sign In
          </button>
        </p>
      </div>
    </>
  );
};

export default RegisterForm;
