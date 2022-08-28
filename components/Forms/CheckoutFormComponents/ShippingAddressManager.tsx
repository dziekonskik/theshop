import { useState } from "react";
import type {
  UseFormRegister,
  FieldErrors,
  FieldValues,
} from "react-hook-form";
import { Button } from "../../ButtonsAndLinks/Button";
import { ShippingForm } from "./ShippingForm";
import { UserAddressDisplay } from "../../Dashboard/UserAddress/UserAddressDislpay";
import * as yup from "yup";
import { addressSchema } from "../../../util/yupSchema/addressSchema";
import { usePersonData } from "../../../contexts/UserContext";

type AddressDataType = yup.InferType<typeof addressSchema>;

interface ShippingAddressManagerProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  useFetchedAddress: boolean;
  setUseFetchedAddress: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ShippingAddressManager = ({
  errors,
  register,
  useFetchedAddress,
  setUseFetchedAddress,
}: ShippingAddressManagerProps<AddressDataType>) => {
  const { personDetails } = usePersonData();
  const addressFromContext = personDetails.address;
  return (
    <>
      {addressFromContext.name && (
        <Button
          bgColor="#F4F3FF"
          onClick={() => setUseFetchedAddress(!useFetchedAddress)}
          type="button"
        >
          {useFetchedAddress ? "Use form" : "Use address"}
        </Button>
      )}
      {addressFromContext.name && useFetchedAddress ? (
        <UserAddressDisplay address={addressFromContext} />
      ) : (
        <ShippingForm register={register} errors={errors} />
      )}
    </>
  );
};
