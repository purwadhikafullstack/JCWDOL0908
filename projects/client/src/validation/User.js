import * as Yup from "yup";

const LoginValidation = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const RegisterValidation = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const UserVerification = Yup.object().shape({
  token: Yup.string().required("Token is required"),
  password: Yup.string()
    .matches(/^(?=.*\d).{6,}$/, "Password must contain at least 6 digits")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export { LoginValidation, RegisterValidation, UserVerification };
