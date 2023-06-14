import BannerLogin from "../../../images/banner/login.avif";
import LayoutClient from "../../../components/LayoutClient";
import { Field, Form, Formik } from "formik";
import FieldPassword from "../../../components/FieldPassword";
import { UserVerification } from "../../../validation/User";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../feature/LoaderSlice";
import { ToastError, ToastSuccess } from "../../../helper/Toastify";
import { VerifyAccount } from "../../../feature/auth";
import { useEffect, useState } from "react";

function Verification() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  // const token = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const uri = window.location.href;
    const token = uri.substring(uri.lastIndexOf("?q") + 1);
    // remove "?q="
    setToken(token.substring(2));
  }, []);

  const handleSubmit = async (values) => {
    dispatch(setLoading(true));
    try {
      await VerifyAccount(token, values.password);
      dispatch(setLoading(false));
      ToastSuccess("Verification success");
      // Redirect to login page
      setTimeout(() => {
        navigate("/client");
      }, 2000);
    } catch (error) {
      dispatch(setLoading(false));
      ToastError(error.response.data.message || "Verification failed");
    }
  };
  return (
    <LayoutClient>
      <section className="py-6">
        {token}
        <div className="page_container grid sm:grid-cols-2 grid-cols-1 gap-5 ">
          <div className="form flex flex-col justify-center">
            <Formik
              initialValues={{
                password: "",
                confirmPassword: "",
                token: token,
              }}
              onSubmit={handleSubmit}
              validationSchema={UserVerification}
            >
              {(formikProps) => {
                return (
                  <Form>
                    <Field type="hidden" name="token" />
                    <span className="font-body">Welcome to</span>
                    <h1 className="font-title text-2xl text-primary font-bold">
                      Furniture<span className="text-primaryLight">.co</span>
                    </h1>
                    <div className="flex flex-col gap-3 mt-3">
                      <div className="group relative">
                        <FieldPassword name="password" id="password" placeholder="Password" autoComplete="off" />
                      </div>
                      <div className="group relative">
                        <FieldPassword
                          name="confirmPassword"
                          placeholder="Confirm password"
                          id="confirmPassword"
                          autoComplete="off"
                        />
                      </div>
                      <div className="group">

                        <button className="px-6 py-2 bg-primary text-white font-title rounded-sm w-full" type="submit">
                          Submit
                        </button>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
          <div className="banner">
            <div className="image">
              <img className="h-[560px] w-full object-cover" src={BannerLogin} alt="Banner Login" />
            </div>
          </div>
        </div>
      </section>
    </LayoutClient>
  );
}

export default Verification;
