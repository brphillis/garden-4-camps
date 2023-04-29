import * as Yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Validation = Yup.object().shape({
  name: Yup.string()
    .required("Your Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(18, "Name must not exceed 18 characters"),
  email: Yup.string()
    .required("Email is Required")
    .matches(emailRegExp, "Email is not Valid"),
  password: Yup.string().required("Password is Required"),
  age: Yup.number().required("Age is Required"),
  gender: Yup.string().required("Gender is Required"),
  phone: Yup.string()
    .required("Phone Number is Required")
    .matches(phoneRegExp, "Phone number is not Valid"),
});

export default Validation;
