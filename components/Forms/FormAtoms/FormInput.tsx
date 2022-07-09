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
  errors: FieldErrors<T>;
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
        className="font-anonymous capitalize text-grey-700 mb-2 block"
      >
        {label}
      </label>

      {type === "textarea" ? (
        <textarea
          id={label}
          className="rounded border-none w-full p-3 shadow-sm"
          rows={5}
          cols={50}
          placeholder={placeholder}
          {...register(label)}
        />
      ) : (
        <input
          id={label}
          type={type}
          className="rounded w-full p-3 shadow-sm bg-transparent border border-b-purple border-l-purple"
          placeholder={placeholder}
          {...register(label)}
        />
      )}

      <span
        role="alert"
        className="text-error font-anonymous mt-1 text-xs h-2 block"
      >
        {errors[label]?.message as string}
      </span>
    </div>
  );
};
