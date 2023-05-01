import * as Yup from "yup";

const urlRegExp =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

const Validation = Yup.object().shape({
  address: Yup.string().required("Address is required"),
  about: Yup.string()
    .required("Tell us about Your Garden")
    .min(3, "About must be at least 50 characters")
    .max(600, "About must not exceed 600 characters"),
  pictures: Yup.array().of(
    Yup.string()
      .min(1, "A Picture is Required")
      .matches(urlRegExp, "URL is not Valid")
      .required("A Picture is Required")
  ),
});

export default Validation;
