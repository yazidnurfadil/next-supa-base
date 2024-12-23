import { object, string } from "yup";

export const phoneRegExp = /(0|\+62)?8\d{9,}$/i;

export const LoginSchema = object().shape({
  password: string().required("Password is required"),
  email: string().email("Email is invalid").required("Email is required"),
});

// export const RegisterSchema = object().shape({
//   name: string().required("Name is required"),
//   email: string()
//     .email("This field must be an email")
//     .required("Email is required"),
//   password: string().required("Password is required"),
//   confirmPassword: string()
//     .required("Confirm password is required")
//     .oneOf([ref("password")], "Passwords must match"),
// });

export const BusinessSchema = object().shape({
  ownerName: string().required("Owner's Name is required"),
  businessName: string().required("Business Name is required"),
  businessSlug: string().required("Business Slug is required"),
  ownerPhone: string().matches(phoneRegExp, "Phone number is not valid"),
  businessPhone: string().matches(phoneRegExp, "Phone number is not valid"),
  ownerEmail: string()
    .email("Email is invalid")
    .required("Owner's Email is required"),
});
