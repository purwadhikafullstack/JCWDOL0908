import * as Yup from "yup";

const AddressValidation = Yup.object().shape({
  address: Yup.string().required("Address is required"),
  city: Yup.number().required("City is required"),
  notes: Yup.string().required("Notes is required"),
});

export { AddressValidation };