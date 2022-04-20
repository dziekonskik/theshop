import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import cardValid from "card-validator";
import { UserDetails, PaymentDetails } from "./CheckoutFormComponents";

let checkoutFormSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  cardnumber: yup
    .string()
    .test((value) => cardValid.number(value).isValid)
    .required(),
  cardholder: yup.string().required(),
  expiration: yup.string().required(),
  cvc: yup.string().required(),
});

export type FormData = yup.InferType<typeof checkoutFormSchema>;

export const CheckoutForm = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(checkoutFormSchema),
    mode: "onBlur",
  });
  const onSubmit = handleSubmit((data) => console.log(data));
  return (
    <div className="container md:max-h-screen justify-center">
      <form onSubmit={onSubmit} className="px-6">
        <div className="md:h-4/5">
          <div className="grid md:grid-cols-2 md:gap-7">
            <div className="col-start-1">
              <UserDetails register={register} errors={errors} />
              <div className="flex justify-end md:hidden">
                <button
                  type="submit"
                  className="w-full md:w-auto my-6 inline-block px-7 py-3 bg-blue-600 text-white font-medium text-base leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Next
                </button>
              </div>
            </div>
            <div className="md:col-start-2">
              <PaymentDetails register={register} errors={errors} />
              <div>
                <button
                  type="submit"
                  className="w-full md:w-auto my-6 inline-block px-7 py-3 bg-blue-600 text-white font-medium text-base leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Purchase
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
