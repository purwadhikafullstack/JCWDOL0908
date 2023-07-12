export const numberFormat = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
};

// remove word "HARI"
export const removeHari = (value) => {
  return value.replace("HARI", "");
};