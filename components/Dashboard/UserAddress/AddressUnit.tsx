interface AddressUnitProps {
  data: string[];
  title: string;
}

export const AddressUnit = ({ data, title }: AddressUnitProps) => (
  <div className="px-6 py-4 border my-6 border-t-purple border-l-purple border-b-midnight border-r-midnight w-max relative text-midnight">
    <span className="absolute -top-3 bg-bermuda -translate-y-px px-2 -translate-x-2 font-comfortaa">
      {title}
    </span>
    <div className="font-anonymous">
      {data.map((userData, index) => (
        <span className="block" key={index}>
          {userData}
        </span>
      ))}
    </div>
  </div>
);
