import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { FormData } from "../Forms/CheckoutForm";

interface FormInputProps {
  label: keyof FormData;
  type: React.HTMLInputTypeAttribute;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  placeholder: string;
}

export const FormInput = ({
  label,
  type,
  register,
  errors,
  placeholder,
}: FormInputProps) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={label}
        className="font-bold capitalize text-grey-700 text-lg mb-2 block"
      >
        {label}
      </label>
      <div>
        <input
          id={label}
          type={type}
          className="rounded border-none w-1/2 p-3 shadow-sm"
          placeholder={placeholder}
          {...register(label)}
        />
      </div>
      <span role="alert" className="text-red-500 mt-0 text-xs font-bold h-3">
        {errors[label]?.message}
      </span>
    </div>
  );
};
