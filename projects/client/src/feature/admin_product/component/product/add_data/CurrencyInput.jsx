import React from "react";

const CurrencyInput = ({ value, onChange, name, id, formik }) => {
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    // Remove non-digit characters from the input value
    const numericValue = inputValue.replace(/[^0-9]/g, "");
    // Convert the numeric value to the desired currency format
    const formattedValue = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numericValue);
    // Update the value and pass it to the parent component
    onChange(formattedValue);
  };

  return (
    <input
      type="text"
      name={name}
      id={id}
      className={
        " placeholder:text-xs text-xs bg-gray-50 border border-gray-300 text-slate-800" +
        " sm:text-xs rounded-none h-10 my-1 shadow-slate-800" +
        " focus:ring-light focus:border-light block w-full px-2" +
        " placeholder col-span-5 h-fit py-1"
      }
      value={
        !value
          ? new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(value)
          : value
      }
      onChange={handleInputChange}
      placeholder="0"
    />
  );
};

export default CurrencyInput;
