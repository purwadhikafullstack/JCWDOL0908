import React from "react";

function UploadPicture({ preview, handleImageChange, alt }) {
  return (
    <label>
      <div
        className="mx-auto hover:cursor-pointer w-60 h-40 flex items-center justify-center border-2 border-slate-100
       lg:w-80 lg:h-60"
      >
        <img
          src={preview}
          alt={alt}
          id="image_preview"
          className={`mx-auto object-contain ${preview ? "w-full h-full" : "hidden"}`}
        />
        <input
          type="file"
          id="photo"
          name="photo"
          className="w-full hidden"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleImageChange}
        />
        <i className={`uil uil-image-upload ${!preview ? " text-8xl text-slate-800" : "hidden"}`}></i>
      </div>
    </label>
  );
}

export default UploadPicture;
