import { useState } from "react";
import EmptyPerson from "../../../images/empty-person.avif";
function PhotoForm({ user }) {
  const [preview, setPreview] = useState(user.profile_photo || EmptyPerson);

  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];

    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selected);
    } else {
      setPreview(user.profile_photo || null);
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
