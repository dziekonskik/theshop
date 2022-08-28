import { createContext, useCallback, useContext, useState } from "react";
import type { UserDetails } from "../util/types";

interface UserContext {
  readonly personDetails: UserDetails;
  readonly setPersonAddress: (address: UserDetails["address"]) => void;
}

const UserContext = createContext<UserContext | null>(null);

interface UserContextProviderProps {
  children: React.ReactNode;
}

const initialState: UserDetails = {
  email: "",
  avatar: {
    url: "",
    width: 0,
    height: 0,
  },
  address: {
    name: "",
    email: "",
    phone: "",
    addressLineOne: "",
    addressLineTwo: "",
    postalCode: "",
    city: "",
  },
  orders: [],
};

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [personDetails, setPersonDetails] = useState<UserDetails>(initialState);

  const setPersonAddress = useCallback((address: UserDetails["address"]) => {
    setPersonDetails((prevDetails) => ({ ...prevDetails, address }));
  }, []);

  return (
    <UserContext.Provider value={{ personDetails, setPersonAddress }}>
      {children}
    </UserContext.Provider>
  );
};

export const usePersonData = () => {
  const userData = useContext(UserContext);

  if (!userData) {
    throw new Error("You forgot UserContextProvider");
  }

  return userData;
};
