import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Entered email address is invalid")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});
