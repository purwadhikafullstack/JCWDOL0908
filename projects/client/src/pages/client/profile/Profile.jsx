import { useDispatch, useSelector } from "react-redux";
import LayoutClient from "../../../components/LayoutClient";
import Jumbotron from "../../../components/Jumbotron";
import ProfileContainer from "../../../feature/profile/components/ProfileContainer";
import { H3 } from "../../../components/Typo";
import FieldBio from "../../../feature/profile/components/FieldBio";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import PhotoForm from "../../../feature/profile/components/PhotoForm";
import { UpdateBio } from "../../../feature/profile/";
import { setLoading } from "../../../feature/LoaderSlice";
import { ToastError, ToastSuccess } from "../../../helper/Toastify";
import { BioValidation } from "../../../validation/User";
import { setUser } from "../../../feature/auth/slice/UserSlice";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user } = useSelector((state) => state.user);
  const [isUpdate, setIsUpdate] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    dispatch(setLoading(true));
    try {
      const res = await UpdateBio(values);
      dispatch(setLoading(false));
      ToastSuccess(res.data.message || "Update Bio Data Success");
      setIsUpdate(false);
      // update user data in redux
      const payload = {
        ...user,
        username: res.data.data.username,
        phone_number: res.data.data.phone_number,
      };
      dispatch(setUser(payload));
    } catch (error) {
      dispatch(setLoading(false));
      ToastError(error.response.data.message || "Update Bio Data Failed");
    }
  };

  if (!user?.id) {
    ToastError("You must login first");
    window.location.href = "/client";
  }

  return (
    <LayoutClient>
      <Jumbotron title="Account | Bio Data" />
      <section className="py-6">
        <ProfileContainer pageName="profile">
          <H3>Update Bio Data</H3>

          <PhotoForm user={user} />

          <Formik
            initialValues={{ username: user?.username || "", email: user?.email, phone: user?.phone_number || "" }}
            onSubmit={handleSubmit}
            validationSchema={BioValidation}
          >
            <Form className="flex flex-col gap-5">
              <FieldBio label="Username" name="username" type="text" disabled={!isUpdate} />
              <FieldBio label="Email" name="email" type="email" disabled />
              <p className="text-sm text-gray-400 text-right">*email cannot be changed</p>
              <FieldBio label="Phone" name="phone" type="text" disabled={!isUpdate} />

              <div className="flex flex-row gap-3">

                <button
                  type="button"
                  className="bg-secondary text-white py-2 px-4 rounded-lg font-semibold font-title w-1/2"
                  onClick={() => setIsUpdate(!isUpdate)}
                >
                  {isUpdate ? "Cancel" : "Edit"}
                </button>

                <button
                  type="submit"
                  className="bg-primary text-white py-2 px-4 rounded-lg font-semibold font-title w-1/2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!isUpdate}
                >
                  Save
                </button>

              </div>
            </Form>
          </Formik>
        </ProfileContainer>
      </section>
    </LayoutClient>
  );
}

export default Profile;
