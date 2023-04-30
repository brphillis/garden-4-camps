import * as Yup from "yup";

const Validation = Yup.object().shape({
  address: Yup.string().required("Address is required"),
  about: Yup.string()
    .required("Tell us about Your Garden")
    .min(3, "About must be at least 50 characters")
    .max(600, "About must not exceed 600 characters"),
  pictures: Yup.array().required("Pictures are required"),
});

export default Validation;
