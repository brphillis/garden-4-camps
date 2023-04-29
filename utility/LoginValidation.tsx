import * as Yup from "yup";

const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Validation = Yup.object().shape({
  email: Yup.string()
    .required("Email is Required")
    .matches(emailRegExp, "Email is not Valid"),
  password: Yup.string().required("Password is Required"),
});

export default Validation;
