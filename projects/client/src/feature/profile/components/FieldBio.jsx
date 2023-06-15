import { useField } from "formik";

function FieldBio({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
      <label className="sm:w-1/4 w-full">{label}</label>
      <input
        {...field}
        {...props}
        // class name from tailwindcss is disabled or active
        className={`sm:w-3/4 w-full text-primary font-body border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-none disabled:border-none disabled:cursor-not-allowed
        ${meta.touched && meta.error ? "border-red-500" : ""}`}
      />
      {meta.touched && meta.error ? <p className="text-red-500 text-sm">{meta.error}</p> : null}
    </div>
  );
}

export default FieldBio;
