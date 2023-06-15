import LayoutClient from "../../../components/LayoutClient";
import Jumbotron from "../../../components/Jumbotron";
import ProfileContainer from "../../../feature/profile/components/ProfileContainer";
import { H3 } from "../../../components/Typo";
import { Form, Formik } from "formik";
import FieldPassword from "../../../components/FieldPassword";
import { UpdatePassword } from "../../../feature/profile";
import { UpdatePasswordValidation } from "../../../validation/User";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../feature/LoaderSlice";
import { ToastError, ToastSuccess } from "../../../helper/Toastify";

function ResetPassword() {
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    dispatch(setLoading(true));
    try {
      const res = await UpdatePassword({
        oldPassword: values.currentPassword,
        newPassword: values.password,
      });
      dispatch(setLoading(false));
      ToastSuccess(res.data.message || "Update Password Success");
    } catch (error) {
      dispatch(setLoading(false));
      ToastError(error.response.data.message || "Update Password Failed");
    }
    // reset form
    values.currentPassword = "";
    values.password = "";
    values.confirmPassword = "";
  };


  return (
    <LayoutClient>
      <Jumbotron title="Account | Reset Password" />
      <section className="py-6">
        <ProfileContainer pageName="reset password">
          <div className="p-4 min-h-[500px]">
            <H3>Update Password</H3>
            <Formik
              initialValues={{ currentPassword: "", password: "", confirmPassword: "" }}
              onSubmit={handleSubmit}
              validationSchema={UpdatePasswordValidation}
            >
              <Form className="flex flex-col gap-5">
                <div className="group relative">
                  <FieldPassword name="currentPassword" id="password" placeholder="Current Password"
                                 autoComplete="off" />
                </div>
                <div className="group relative">
                  <FieldPassword name="password" id="password" placeholder="New Password" autoComplete="off" />
                </div>
                <div className="group relative">
                  <FieldPassword name="confirmPassword" id="password" placeholder="Confirm Password"
                                 autoComplete="off" />
                </div>
                <button
                  type="submit"
                  className="bg-primary text-white py-2 px-4 rounded-lg font-semibold font-title w-1/2"
                > Save
                </button>

              </Form>
            </Formik>
          </div>
        </ProfileContainer>
      </section>
    </LayoutClient>
  );
}

export default ResetPassword;