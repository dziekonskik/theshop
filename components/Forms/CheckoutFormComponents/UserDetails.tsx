import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormInput } from "../FormAtoms/FormInput";
import type { FormData } from "../CheckoutForm";

interface UserDetailsProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

export const UserDetails = ({ register, errors }: UserDetailsProps) => {
  return (
    <div className="flex flex-col items-center md:items-start bg-indigo-300 p-7 rounded-2xl">
      <h2 className="inline-block absolute overflow-hidden h-px w-px -m-px p-0">
        User Details
      </h2>
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
  );
};
