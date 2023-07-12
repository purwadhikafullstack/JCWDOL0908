import * as Yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const LoginValidation = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const RegisterValidation = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const UserVerification = Yup.object().shape({
  password: Yup.string()
    .matches(/^(?=.*\d).{6,}$/, "Password must contain at least 6 digits")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const BioValidation = Yup.object().shape({
  username: Yup.string().max(50, "Username must be at most 50 characters").nullable(),
  phone: Yup.string().matches(phoneRegExp, "Phone number is not valid").nullable(),
});

const UpdatePasswordValidation = Yup.object().shape({
  currentPassword: Yup.string().required("Old Password is required"),
  password: Yup.string()
    .matches(/^(?=.*\d).{6,}$/, "Password must contain at least 6 digits")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});


export { LoginValidation, RegisterValidation, UserVerification, BioValidation, UpdatePasswordValidation };
