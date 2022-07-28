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
        {label.replace(/([A-Z])/g, " $1").trim()}
      </label>

      {type === "textarea" ? (
        <textarea
          id={label}
          className="border border-b-purple border-l-purple w-full p-3 shadow-sm bg-transparent text-midnight outline-none focus:bg-white"
          rows={5}
          cols={50}
          placeholder={placeholder}
          {...register(label)}
        />
      ) : (
        <input
          id={label}
          type={type}
          className="w-full p-3 shadow-sm bg-transparent border border-b-purple border-l-purple text-midnight focus:bg-white"
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
