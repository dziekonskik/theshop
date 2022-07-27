import { useRef, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import { Portal } from "../Portal";
import { FormInput } from "./FormAtoms/FormInput";
import { ButtonWithIcon } from "../ButtonsAndLinks/ButtonWithIcon";
import { ArrowUpIcon, CubeTransparentIcon, ExclamationIcon } from "../Svg";
import { AnimatedCheckHeroIcon } from "../Svg/Animated";
import useMediaQuery from "../../util/useMediaquery";

interface ContactFormProps {
  x: number | undefined;
  y: number | undefined;
  contactFormOpen: boolean;
  setContactFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const contactFormSchema = yup.object({
  email: yup.string().email().required(),
  message: yup.string().required(),
});

type ContactFormData = yup.InferType<typeof contactFormSchema>;

export const ContactForm = ({
  x,
  y,
  contactFormOpen,
  setContactFormOpen,
}: ContactFormProps) => {
  const [rerender, setRerender] = useState(0);
  const formRef = useRef<HTMLFormElement | null>(null);
  const matches = useMediaQuery("(max-width: 448px)");

  useEffect(() => {
    setRerender((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const emailInput = formRef.current?.firstElementChild?.firstElementChild
      ?.nextSibling as HTMLInputElement;
    emailInput?.focus();
    // eslint-disable-next-line
  }, [formRef.current]);

  const handleContactFormSubmitMutation = async (data: ContactFormData) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/aws-ses-client`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong.");
    }
  };

  const { mutate, isLoading, isError, isSuccess } = useMutation(
    "contact-form",
    handleContactFormSubmitMutation
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: {
      email: "",
      message: "",
    },
    resolver: yupResolver(contactFormSchema),
    mode: "onSubmit",
  });
  const onSubmit = handleSubmit((data) => mutate(data));

  const navVariants = {
    open: {
      top: y,
      left: x,
      scale: 1,
      transition: {
        type: matches ? "tween" : "spring",
        stiffness: 600,
        damping: 30,
        bounce: 0.3,
        mass: 1.5,
        ease: "easeIn",
        duration: 0.2,
      },
    },
    closed: {
      scale: 0,
      y: 280,
      x: 80,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 50,
      },
    },
  };
  let svgIcon = <ArrowUpIcon className="h-9 w-9" />;
  let buttonText = "Send!";
  if (isLoading) {
    svgIcon = <CubeTransparentIcon className="h-9 w-9 animate-spin" />;
  }
  if (isSuccess && formRef.current) {
    svgIcon = (
      <AnimatedCheckHeroIcon
        className="h-9 w-9"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
      />
    );
    buttonText = "Thank you!";
    window.setTimeout(() => {
      formRef.current = null;
      setContactFormOpen(false);
    }, 1000);
  }
  if (isError) {
    buttonText = "Try Again";
    svgIcon = <ExclamationIcon className="h-9 w-9" />;
  }

  return (
    <Portal>
      <motion.form
        exit="closed"
        initial={{ top: y! + 300, left: x! + 100, scale: 0 }}
        variants={navVariants}
        animate={contactFormOpen ? "open" : "closed"}
        className="absolute z-50 bg-bermuda-intense p-7 w-full max-w-md"
        ref={formRef}
      >
        <FormInput
          errors={errors}
          label="email"
          placeholder="Your email for me to reply to"
          register={register}
          type="text"
        />
        <FormInput
          errors={errors}
          label="message"
          placeholder="Hi, how about... ?"
          register={register}
          type="textarea"
        />
        <ButtonWithIcon
          type="submit"
          bgColor="#F4E13E"
          onClick={onSubmit}
          side="right"
          svgMarkup={svgIcon}
          disabled={isLoading || isSuccess}
        >
          {buttonText}
        </ButtonWithIcon>
      </motion.form>
    </Portal>
  );
};
