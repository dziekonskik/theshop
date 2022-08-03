import * as yup from "yup";

export const checkoutFormSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  addressLineOne: yup.string().required(),
  addressLineTwo: yup.string().required(),
  postalCode: yup.string().required(),
  city: yup.string().required(),
  phone: yup.string().phone("PL").required(),
});
