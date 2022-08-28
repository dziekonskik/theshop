import { AddressUnit } from "./AddressUnit";
import { usePersonData } from "../../../contexts/UserContext";

interface UserAddressDisplayProps {
  address: string[];
  aside?: React.ReactNode;
}
export const UserAddressDisplay = ({ aside }: UserAddressDisplayProps) => {
  const { personDetails } = usePersonData();
  const {
    name,
    email,
    phone,
    addressLineOne,
    addressLineTwo,
    city,
    postalCode,
  } = personDetails.address;
  return (
    <div className="flex justify-between items-end">
      <article>
        <AddressUnit title="Contact" data={[name, email, phone]} />
        <AddressUnit title="Address" data={[addressLineOne, addressLineTwo]} />
        <AddressUnit title="City" data={[city, postalCode]} />
      </article>
      {aside}
    </div>
  );
};
