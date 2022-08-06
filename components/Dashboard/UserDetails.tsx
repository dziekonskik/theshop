import Image from "next/image";
import { Button } from "../ButtonsAndLinks/Button";
import useMediaQuery from "../../util/useMediaquery";
import notFounfPicture from "../../public/assets/shapes/not_found.svg";
import dataOkPicture from "../../public/assets/shapes/data_ok.svg";
import type { RenderedInfo } from "../../pages/auth/dashboard";

interface UserDetailsProps {
  setRenderedInfo: React.Dispatch<
    React.SetStateAction<RenderedInfo | undefined>
  >;
  address: string[] | undefined;
}

export const UserDetails = ({ setRenderedInfo, address }: UserDetailsProps) => {
  const matches = useMediaQuery("(max-width: 768px)");
  if (!address?.length) {
    return <NothingHere setRenderedInfo={setRenderedInfo} matches={matches} />;
  }
  const [name, email, phone, addressLineOne, addressLineTwo, city, postalCode] =
    address;

  return (
    <div className="w-full lg:w-auto lg:px-32 mx-auto">
      <h1 className="text-center font-comfortaa mt-4 mb-6 lg:mb-10 text-2xl text-midnight">
        Personal data
      </h1>
      <div className="flex justify-between items-end">
        <article>
          <AddressUnit title="Contact" data={[name, email, phone]} />
          <AddressUnit
            title="Address"
            data={[addressLineOne, addressLineTwo]}
          />
          <AddressUnit title="City" data={[city, postalCode]} />
        </article>
        <aside className="hidden lg:block">
          <Image
            src={dataOkPicture}
            alt="filled dashboard graphic"
            width={200}
            height={400}
          />
        </aside>
      </div>
      <span className="block mt-6 lg:hidden">
        <Button
          bgColor="#F4F3FF"
          type="button"
          onClick={() => setRenderedInfo(undefined)}
          fullWidth={matches}
        >
          Go back
        </Button>
      </span>
    </div>
  );
};

interface AddressUnitProps {
  data: string[];
  title: string;
}

const AddressUnit = ({ data, title }: AddressUnitProps) => (
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

interface NothingHereProps {
  matches: boolean;
  setRenderedInfo: React.Dispatch<
    React.SetStateAction<RenderedInfo | undefined>
  >;
}

const NothingHere = ({ matches, setRenderedInfo }: NothingHereProps) => (
  <div className="relative w-80 md:w-full h-full mx-auto flex flex-col justify-between">
    <span className="block mt-6 lg:hidden">
      <Button
        bgColor="#F4F3FF"
        type="button"
        onClick={() => setRenderedInfo(undefined)}
        fullWidth={matches}
      >
        Go back
      </Button>
    </span>
    <article className="text-center font-comfortaa">
      <p>Nothing is here</p>
      <h2>
        Fill out adress details to take advantage from the one click checkout
      </h2>
    </article>
    <Image
      src={notFounfPicture}
      alt="graphic - woman with refresh sign as nothing here"
    />
  </div>
);
