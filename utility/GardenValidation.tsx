import * as Yup from "yup";

// const imageUrlRegExp = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/;

const Validation = Yup.object().shape({
  address: Yup.string().required("Address is required"),
  about: Yup.string()
    .required("Your Name is required")
    .min(3, "About must be at least 50 characters")
    .max(18, "About must not exceed 600 characters"),
  pictures: Yup.array().required("Pictures are required"),
});

export default Validation;
