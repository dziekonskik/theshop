import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput } from "./FormAtoms/FormInput";
import { ButtonWithIcon } from "../ButtonsAndLinks/ButtonWithIcon";
import { CubeTransparentIcon } from "../Svg";
import { registerUserFormSchema } from "../../util/yupSchema/registerUserFormSchema";

type FormData = yup.InferType<typeof registerUserFormSchema>;

export const SignupForm = () => {
  const [emailExistsError, setEmailExistsError] = useState("");

  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(registerUserFormSchema),
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (data) => {
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
    }
  });

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
        svgMarkup={<CubeTransparentIcon />}
        type="submit"
        fullWidth
      >
        Sign up
      </ButtonWithIcon>
    </form>
  );
};
