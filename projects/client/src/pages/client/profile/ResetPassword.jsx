import LayoutClient from "../../../components/LayoutClient";
import Jumbotron from "../../../components/Jumbotron";
import ProfileContainer from "../../../feature/profile/components/ProfileContainer";
import { H3 } from "../../../components/Typo";
import { Form, Formik } from "formik";
import FieldPassword from "../../../components/FieldPassword";

function ResetPassword() {
  return (
    <LayoutClient>
      <Jumbotron title="Account | Reset Password" />
      <section className="py-6">
        <ProfileContainer pageName="reset password">
          <div className="p-4 min-h-[500px]">
            <H3>Update Password</H3>
            <Formik initialValues={{ currentPassword: "", password: "", confirmPassword: "" }} onSubmit={() => {
            }}>
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