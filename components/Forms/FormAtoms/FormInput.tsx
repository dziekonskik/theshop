import type {
  UseFormRegister,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";

interface FormInputProps<T extends FieldValues> {
  label: Path<T>;
  type: React.HTMLInputTypeAttribute;
  register: UseFormRegister<T>;
  errors: FieldErrors<FieldValues>;
  placeholder: string;
}

export const FormInput = <TFormData extends Record<string, unknown>>({
  label,
  type,
  register,
  errors,
  placeholder,
}: FormInputProps<TFormData>) => {
  return (
    <div className="mb-4 w-full">
      <label
        htmlFor={label}
        className="font-play capitalize text-grey-700 mb-2 block"
      >
        {label}
      </label>

      <input
        id={label}
        type={type}
        className="rounded border-none w-full p-3 shadow-sm"
        placeholder={placeholder}
        {...register(label)}
      />

      <span role="alert" className="text-red-500 mt-0 text-xs font-bold h-3">
        {errors[label]?.message}
      </span>
    </div>
  );
};
