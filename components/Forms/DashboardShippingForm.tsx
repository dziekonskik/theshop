import { useSession } from "next-auth/react";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePersonData } from "../Dashboard/UserContext";
import useMediaQuery from "../../util/useMediaquery";
import { ShippingDetails } from "./CheckoutFormComponents/ShippingDetails";
import { addressSchema } from "../../util/yupSchema/addressSchema";
import { ButtonWithIcon } from "../ButtonsAndLinks/ButtonWithIcon";
import { Button } from "../ButtonsAndLinks/Button";
import { ArrowDownIcon, CubeTransparentIcon, ExclamationIcon } from "../Svg";
import { AnimatedCheckHeroIcon } from "../Svg/Animated/AnimatedCheckHeroIcon";
import type { RenderedInfo } from "../../pages/auth/dashboard";

type FormData = yup.InferType<typeof addressSchema>;

interface DashboardShippingFormProps {
  setRenderedInfo: React.Dispatch<
    React.SetStateAction<RenderedInfo | undefined>
  >;
}

export const DashboardShippingForm = ({
  setRenderedInfo,
}: DashboardShippingFormProps) => {
  const { setPersonAddress } = usePersonData();
  const matches = useMediaQuery("(max-width: 768px)");
  const session = useSession();
  const registeredUserEmail = session.data?.user.email;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(addressSchema),
    mode: "onBlur",
    defaultValues: {
      addressLineOne: "",
      addressLineTwo: "",
      city: "",
      email: "",
      name: "",
      phone: "",
      postalCode: "",
    },
  });

  const handleUpdateAddress = async (data: FormData) => {
    const response = await fetch("/api/user-address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address: data, email: registeredUserEmail }),
    });

    if (response.ok) {
      setPersonAddress(data);
      reset();
    }
    if (!response.ok) {
      throw new Error("Address update not successful");
    }
  };
  const { mutate, isError, isLoading, isSuccess } = useMutation(
    "addressUpdate",
    handleUpdateAddress
  );

  const onSubmit = handleSubmit(async (data) => {
    if (!registeredUserEmail) return;
    mutate(data);
  });

  let iconToDisplay: JSX.Element = <ArrowDownIcon />;
  let textToDiplay = "Save";
  if (isLoading) {
    iconToDisplay = <CubeTransparentIcon className="animate-spin" />;
  }
  if (isSuccess) {
    iconToDisplay = <AnimatedCheckHeroIcon />;
    textToDiplay = "Done";
  }
  if (isError) {
    iconToDisplay = <ExclamationIcon />;
    textToDiplay = "Try again";
  }
  return (
    <div className="lg:px-32">
      <span className="flex lg:ml-2 lg:hidden my-6">
        <Button
          bgColor="#F4F3FF"
          type="button"
          onClick={() => setRenderedInfo(undefined)}
          fullWidth={matches}
        >
          Go back
        </Button>
      </span>
      <ShippingDetails errors={errors} register={register} />
      <span className="flex md:-translate-y-full lg:ml-2 my-6">
        <ButtonWithIcon
          svgMarkup={iconToDisplay}
          side="right"
          bgColor="#6C63FF"
          type="submit"
          onClick={onSubmit}
          fullWidth={matches}
        >
          {textToDiplay}
        </ButtonWithIcon>
      </span>
    </div>
  );
};
