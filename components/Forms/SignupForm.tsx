import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput } from "./FormAtoms/FormInput";
import { ButtonWithIcon } from "../ButtonsAndLinks/ButtonWithIcon";
import { CubeTransparentIcon, ExclamationIcon } from "../Svg";
import { TargetIcon } from "../Svg/Feather/TargetIcon";
import { AnimatedCheckHeroIcon } from "../Svg/Animated";
import { registerUserFormSchema } from "../../util/yupSchema/registerUserFormSchema";

type RegisterUserFormData = yup.InferType<typeof registerUserFormSchema>;

export const SignupForm = () => {
  const [emailExistsError, setEmailExistsError] = useState("");
  const router = useRouter();

  const handleUserSignupMutation = async (data: RegisterUserFormData) => {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      reset();
    }
    if (response.status === 409) {
      const { error } = JSON.parse(await response.clone().text());
      setEmailExistsError(error);
      reset();
      throw new Error(error);
    }
  };

  const { mutate, isLoading, isError, isSuccess } = useMutation(
    "user-signup",
    handleUserSignupMutation
  );

  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterUserFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(registerUserFormSchema),
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (data) => mutate(data));

  let svgIcon = <TargetIcon />;
  let buttonText = "Sign up";
  if (isLoading) {
    svgIcon = <CubeTransparentIcon className="animate-spin" />;
  }
  if (isSuccess) {
    svgIcon = (
      <AnimatedCheckHeroIcon
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
      />
    );
    buttonText = "Redirecting to login...";
    window.setTimeout(() => router.push("/auth/login"), 1500);
  }
  if (isError) {
    svgIcon = <ExclamationIcon />;
  }

  return (
    <form className="max-w-md mx-auto my-auto w-full mt-20 lg:mt-10">
      <FormInput
        register={register}
        errors={errors}
        type="text"
        placeholder="email@example.com"
        label="email"
      />
      <FormInput
        register={register}
        errors={errors}
        type="password"
        placeholder="strong password"
        label="password"
      />
      <span className="h-4 mb-2 block font-anonymous text-sm text-error -translate-y-3 relative">
        {emailExistsError}
      </span>
      <ButtonWithIcon
        onClick={onSubmit}
        bgColor="#6C63FF"
        side="right"
        svgMarkup={svgIcon}
        type="submit"
        fullWidth
      >
        {buttonText}
      </ButtonWithIcon>
    </form>
  );
};
