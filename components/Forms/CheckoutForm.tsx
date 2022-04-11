import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import cardValid from "card-validator";
import { FormInput } from "./FormInput";

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
    <div className="container max-h-screen">
      <form onSubmit={onSubmit}>
        <div className="h-4/5">
          <div className="grid grid-cols-2">
            <div>
              <h2 className="mb-6 text-2xl text-grey-700">Details</h2>
              <FormInput
                label="name"
                type="text"
                placeholder="John Smith"
                register={register}
                errors={errors}
              />
              <FormInput
                label="email"
                type="email"
                placeholder="js@example.com"
                register={register}
                errors={errors}
              />
            </div>
            <div>
              <h2>Payment</h2>
              <div className="h-32 w-full">
                <div className="h-full w-full">
                  <Image
                    src="http://emilcarlsson.se/assets/MasterCard_Logo.png"
                    alt="Master Card Logo"
                    width={160}
                    height={90}
                  />
                </div>
              </div>

              <FormInput
                label="cardnumber"
                type="number"
                placeholder="5105105105105100"
                register={register}
                errors={errors}
              />
              <FormInput
                label="cardholder"
                type="text"
                placeholder="John Smith"
                register={register}
                errors={errors}
              />

              <div className="flex">
                <div className="">
                  <FormInput
                    label="expiration"
                    type="text"
                    placeholder="MM/YY"
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="ml-4">
                  <FormInput
                    label="cvc"
                    type="text"
                    placeholder="123"
                    register={register}
                    errors={errors}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-base leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Purchase
              </button>
              <p>
                Having problem with checkout?{" "}
                <a href="#">Contact our support</a>.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
