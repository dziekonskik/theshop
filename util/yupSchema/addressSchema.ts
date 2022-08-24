import * as yup from "yup";
import "yup-phone";

export const addressSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  addressLineOne: yup.string().required(),
  addressLineTwo: yup.string().required(),
  postalCode: yup.string().required(),
  city: yup.string().required(),
  phone: yup.string().phone("PL").required(),
});

export const emptySchema = yup.object({});
