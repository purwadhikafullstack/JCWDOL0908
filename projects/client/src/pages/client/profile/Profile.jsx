import { useSelector } from "react-redux";
import LayoutClient from "../../../components/LayoutClient";
import Jumbotron from "../../../components/Jumbotron";
import ProfileContainer from "../../../feature/profile/components/ProfileContainer";
import { H3 } from "../../../components/Typo";
import FieldBio from "../../../feature/profile/components/FieldBio";
import { Form, Formik } from "formik";
import { useState } from "react";
import PhotoForm from "../../../feature/profile/components/PhotoForm";

function Profile() {
  const { user } = useSelector((state) => state.user);
  const [isUpdate, setIsUpdate] = useState(false);

  // protected route
  if (!user?.id) {
    return <h1>Forbidden</h1>;
  }

  return (
    <LayoutClient>
      <Jumbotron title="Account | Bio Data" />
      <section className="py-6">
        <ProfileContainer pageName="profile">
          <div className="p-4 min-h-[500px]">
            <H3>Update Bio Data</H3>

            <PhotoForm user={user} />

            <Formik
              initialValues={{ username: user?.username || "", email: user?.email, phone: user?.phone || "" }}
              onSubmit={() => {
              }}
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
          </div>
        </ProfileContainer>
      </section>
    </LayoutClient>
  );
}

export default Profile;
