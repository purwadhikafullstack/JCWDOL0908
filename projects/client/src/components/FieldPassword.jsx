import { useState } from "react";
import { useField } from "formik";

const FieldPassword = ({ ...props }) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <input
        type={showPassword ? "text" : "password"}
        {...field}
        {...props}
        className="border w-full p-3 rounded-md font-body"
      />

      {meta.touched && meta.error ? <p className="text-red-500 text-sm font-body">{meta.error}</p> : null}

      <button
        className="absolute right-3 top-3 text-secondary"
        onClick={() => setShowPassword(!showPassword)}
        type="button"
      >
        {showPassword ? <i className="uil uil-eye"></i> : <i className="uil uil-eye-slash"></i>}
      </button>
    </>
  );
};

export default FieldPassword;
