import { useState, useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { FormInput } from "./FormAtoms/FormInput";
import { Button } from "../ButtonsAndLinks/Button";
import { EnvelopeIcon, ExclamationIcon, CubeTransparentIcon } from "../Svg";
import { AnimatedCheckHeroIcon } from "../Svg/Animated";
import useMediaQuery from "../../util/useMediaquery";

const NewsletterFormSchema = yup.object({
  email: yup.string().email().required(),
});

type NewsletterFormData = yup.InferType<typeof NewsletterFormSchema>;

interface NewsletterFormProps {
  className?: string;
}

export const NewsletterForm = ({ className }: NewsletterFormProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const matches = useMediaQuery("(max-width: 640px)");

  useEffect(() => {
    if (matches) setIsMobile(true);
  }, [matches]);
  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<NewsletterFormData>({
    resolver: yupResolver(NewsletterFormSchema),
    mode: "onBlur",
  });

  const handleNewsletterSignupMutation = async (data: { email: string }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/mailer`, {
      method: "POST",
      headers: {
        "Content-Type": "application-json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("Signup unsuccessful...");
    }
  };

  const { isLoading, isError, mutate, isSuccess } = useMutation(
    "newsletter-signup",
    handleNewsletterSignupMutation
  );

  const onSubmit = handleSubmit(async (data) => {
    await mutate(data);
    reset();
  });

  let svgMarkup: React.ReactNode = (
    <EnvelopeIcon className="ml-4 -translate-y-px" />
  );
  if (isLoading) {
    svgMarkup = <CubeTransparentIcon className="ml-4 animate-spin" />;
  }
  if (isSuccess) {
    svgMarkup = (
      <AnimatedCheckHeroIcon
        className="ml-4 -translate-y-px"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
      />
    );
  }
  if (isError) {
    svgMarkup = (
      <ExclamationIcon className="ml-4 -translate-y-px animate-wiggleOnce" />
    );
  }

  return (
    <form onSubmit={onSubmit} className={className}>
      <FormInput
        register={register}
        errors={errors}
        label="email"
        placeholder="Sign up for a newsletter"
        type="email"
      />
      <Button
        disabled={isLoading}
        onClick={onSubmit}
        type="submit"
        bgColor="#F4F3FF"
        svgMarkup={svgMarkup}
        fullWidth={isMobile}
      >
        {isSuccess ? "Thank you!" : isError ? "Try again" : "Sign me up!"}
      </Button>
    </form>
  );
};
