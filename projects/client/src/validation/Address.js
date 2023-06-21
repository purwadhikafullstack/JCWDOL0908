import * as Yup from "yup";

const AddressValidation = Yup.object().shape({
  address: Yup.string().required("Address is required"),
  city: Yup.number().required("City is required").min(1),
  notes: Yup.string().required("Notes is required"),
  zip_code: Yup.string().required("Zip is required"),
});

export { AddressValidation };