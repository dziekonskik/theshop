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

type AddressDataType = yup.InferType<typeof addressSchema>;

interface ShippingAddressManagerProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  fetchedUserAddress: string[] | undefined;
  useFetchedAddress: boolean;
  setUseFetchedAddress: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ShippingAddressManager = ({
  errors,
  register,
  fetchedUserAddress,
  useFetchedAddress,
  setUseFetchedAddress,
}: ShippingAddressManagerProps<AddressDataType>) => {
  return (
    <>
      {fetchedUserAddress && fetchedUserAddress.length > 0 && (
        <Button
          bgColor="#F4F3FF"
          onClick={() => setUseFetchedAddress(!useFetchedAddress)}
          type="button"
        >
          {useFetchedAddress ? "Use form" : "Use address"}
        </Button>
      )}
      {fetchedUserAddress?.length && useFetchedAddress ? (
        <UserAddressDisplay address={fetchedUserAddress} />
      ) : (
        <ShippingForm register={register} errors={errors} />
      )}
    </>
  );
};
