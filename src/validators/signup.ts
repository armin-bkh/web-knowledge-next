import * as Yup from "yup";

export const signupSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(6, "'Name' length must be at least 6 characters long"),
  email: Yup.string()
    .email("Entered email address is invalid")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{11}$/, "Entered phone number is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "'Password' length must be at least 8 characters long"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});
