import { AddressUnit } from "./AddressUnit";

interface UserAddressDisplayProps {
  address: string[];
  aside?: React.ReactNode;
}
export const UserAddressDisplay = ({
  address,
  aside,
}: UserAddressDisplayProps) => {
  const [name, email, phone, addressLineOne, addressLineTwo, city, postalCode] =
    address;
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
