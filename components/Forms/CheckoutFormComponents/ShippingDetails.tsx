import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormInput } from "../FormAtoms/FormInput";
import type { FormData } from "../CheckoutForm";

interface UserDetailsProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

export const ShippingDetails = ({ register, errors }: UserDetailsProps) => {
  return (
    <section
      className="md:h-full px-6"
      style={{
        backgroundImage: `linear-gradient(
    45deg,
    transparent 0%,
    transparent 39.99%,
    #F4E13E 40%,
    #F4E13E 59.99%,
    transparent 60%
  )`,
      }}
    >
      <h2 className="inline-block absolute overflow-hidden h-px w-px -m-px p-0">
        Shipping Details
      </h2>

      <div className="block lg:flex lg:gap-5">
        <FormInput
          label="name"
          type="text"
          placeholder="Your name"
          register={register}
          errors={errors}
        />
        <FormInput
          label="email"
          type="email"
          placeholder="Your email address"
          register={register}
          errors={errors}
        />
      </div>
      <div>
        <FormInput
          label="addressLineOne"
          type="text"
          placeholder="e.g., street, PO Box, or company name"
          register={register}
          errors={errors}
        />
        <FormInput
          label="addressLineTwo"
          type="text"
          placeholder="e.g., apartment, suite, unit, or building"
          register={register}
          errors={errors}
        />
        <FormInput
          label="postalCode"
          type="text"
          placeholder="ZIP or postal code."
          register={register}
          errors={errors}
        />
        <FormInput
          label="city"
          type="text"
          placeholder="City, district, suburb, town, or village."
          register={register}
          errors={errors}
        />
        <FormInput
          label="phone"
          type="number"
          placeholder="Telephone number"
          register={register}
          errors={errors}
        />
      </div>
    </section>
  );
};
