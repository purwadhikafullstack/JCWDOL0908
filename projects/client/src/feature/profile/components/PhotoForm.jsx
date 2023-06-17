import { useState } from "react";
import EmptyPerson from "../../../images/empty-person.avif";
import { UpdateProfile } from "../api/UpdateProfile";
import { useDispatch } from "react-redux";
import { setLoading } from "../../LoaderSlice";
import { ToastError, ToastSuccess } from "../../../helper/Toastify";
import { setUser } from "../../auth/slice/UserSlice";

function PhotoForm({ user }) {
  const [preview, setPreview] = useState(process.env.REACT_APP_SERVER_URL + user.profile_photo || EmptyPerson);
  const dispatch = useDispatch();

  const handleImageChange = async (e) => {
    const selected = e.target.files[0];
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];

    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selected);
    } else {
      setPreview(`${process.env.REACT_APP_SERVER_URL + user.profile_photo}` || null);
    }
    await handleSubmit(selected);
  };

  const handleSubmit = async (profile_photo) => {
    dispatch(setLoading(true));
    const formData = new FormData();
    formData.append("photo", profile_photo);
    try {
      const res = await UpdateProfile(formData);
      dispatch(setLoading(false));
      ToastSuccess(res.data.message || "Update Profile Photo Success");
      // update user data in redux
      const payload = {
        ...user,
        profile_photo: res.data.data.profile_photo,
      };
      dispatch(setUser(payload));
    } catch (error) {
      dispatch(setLoading(false));
      ToastError(error.response.data.message || "Update Profile Photo Failed");
      setPreview(EmptyPerson);
    }
  };

  return (
    <form className="flex flex-col gap-5 mb-3">
      {/* image */}
      <label htmlFor="image" className="text-sm text-gray-400 cursor-pointer flex items-center">
        <div className="image mx-auto">
          <img src={preview} alt="profile" className="rounded-full w-40 h-40 object-cover" />
        </div>
        <input
          type="file"
          id="image"
          className="w-full hidden"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleImageChange}
        />
      </label>
    </form>
  );
}

export default PhotoForm;
