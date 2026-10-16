import * as Yup from "yup";

// Every rule for the form lives here. Formik runs this schema for us.
export const registrationSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .required("Enter your full name.")
    .min(3, "Use at least 3 characters.")
    .max(60, "Keep it under 60 characters."),
  email: Yup.string()
    .trim()
    .required("Enter your email address.")
    .email("Enter a valid email, like name@example.com."),
  phone: Yup.string()
    // Ignore spaces and dashes the person types, so "98765 43210" is fine.
    .transform((value) => (value ? value.replace(/[\s-]/g, "") : value))
    .required("Enter a phone number.")
    .matches(/^\+?\d{10,15}$/, "Use 10 to 15 digits. A leading + is fine."),
  country: Yup.string().required("Choose your country."),
  password: Yup.string()
    .required("Create a password.")
    .min(8, "Use at least 8 characters.")
    .matches(/[A-Z]/, "Add at least one capital letter.")
    .matches(/\d/, "Add at least one number."),
  confirmPassword: Yup.string()
    .required("Re-enter your password.")
    .oneOf([Yup.ref("password")], "Passwords do not match."),
  terms: Yup.boolean().oneOf([true], "Accept the terms to register."),
});

export const initialValues = {
  fullName: "",
  email: "",
  phone: "",
  country: "",
  password: "",
  confirmPassword: "",
  terms: false,
};