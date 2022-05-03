import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { FormInput } from "./FormAtoms/FormInput";

const NewsletterFormSchema = yup.object({
  email: yup.string().email().required(),
});

type CheckoutFormData = yup.InferType<typeof NewsletterFormSchema>;

export const NewsletterForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CheckoutFormData>({
    resolver: yupResolver(NewsletterFormSchema),
    mode: "onBlur",
  });

  const handleNewsletterSignupMutation = async (data: { email: string }) => {
    await fetch("http://localhost:3000/api/mailer", {
      method: "POST",
      headers: {
        "Content-Type": "application-json",
      },
      body: JSON.stringify(data),
    });
  };

  const { isLoading, isError, mutate, isSuccess } = useMutation(
    "newsletter-signup",
    handleNewsletterSignupMutation
  );

  const onSubmit = handleSubmit((data) => mutate(data));

  return (
    <form onSubmit={onSubmit} className="max-w-md">
      <FormInput
        register={register}
        errors={errors}
        label="email"
        placeholder="Zapisz się na newsletter"
        type="email"
      />
      <button
        type="submit"
        className="inline-flex items-center px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out relative"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
          />
        </svg>

        <span className="ml-2">
          {isSuccess ? "Zapisano!" : isError ? "Wystąpił błąd :(" : "Zapisz"}
        </span>
      </button>
    </form>
  );
};
