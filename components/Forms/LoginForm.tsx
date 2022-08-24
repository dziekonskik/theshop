import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput } from "./FormAtoms/FormInput";
import { ButtonWithIcon } from "../ButtonsAndLinks/ButtonWithIcon";
import { LoginIcon } from "../Svg/Feather";
import { registerUserFormSchema } from "../../util/yupSchema/registerUserFormSchema";

type FormData = yup.InferType<typeof registerUserFormSchema>;

export const LoginForm = () => {
  const [loginError, setLoginError] = useState<string>("");
  const router = useRouter();

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

  const onSubmit = handleSubmit(async (data, event) => {
    signIn("credentials", { ...data, redirect: false }).then((response) => {
      if (response?.ok) {
        router.push("/auth/dashboard");
      } else {
        setLoginError("Incorrect credentials");
        reset();
      }
    });
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
        {loginError}
      </span>
      <ButtonWithIcon
        onClick={onSubmit}
        bgColor="#6C63FF"
        side="right"
        svgMarkup={<LoginIcon />}
        type="submit"
        fullWidth
      >
        Log in
      </ButtonWithIcon>
      <Link href="/auth/signup">
        <a className="mt-9 block font-anonymous text-purple">
          Do not have an account yet? Register here!
        </a>
      </Link>
    </form>
  );
};
