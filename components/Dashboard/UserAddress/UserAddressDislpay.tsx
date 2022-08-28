import { AddressUnit } from "./AddressUnit";
import type { UserAddress } from "../../../util/types";

interface UserAddressDisplayProps {
  aside?: React.ReactNode;
  address: UserAddress;
}
export const UserAddressDisplay = ({
  aside,
  address,
}: UserAddressDisplayProps) => {
  const {
    name,
    email,
    phone,
    addressLineOne,
    addressLineTwo,
    city,
    postalCode,
  } = address;
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
