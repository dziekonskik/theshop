import { useEffect } from "react";
import { usePersonData } from "../contexts/UserContext";
import type { FetchedUserData } from "./types";

export const useSetPersonAddressToContext = (
  userData: FetchedUserData | undefined
) => {
  const { personDetails, setPersonAddress } = usePersonData();
  useEffect(() => {
    if (userData?.address && !personDetails.address.name) {
      const [
        name,
        email,
        phone,
        addressLineOne,
        addressLineTwo,
        city,
        postalCode,
      ] = userData?.address;
      setPersonAddress({
        name,
        email,
        phone,
        addressLineOne,
        addressLineTwo,
        city,
        postalCode,
      });
    }
  }, [userData?.address, personDetails.address.name, setPersonAddress]);
};
