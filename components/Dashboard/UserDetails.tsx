import Image from "next/image";
import { Button } from "../ButtonsAndLinks/Button";
import useMediaQuery from "../../util/useMediaquery";
import { NothingHere } from "./UserAddress/NothingHere";
import { UserAddressDisplay } from "./UserAddress/UserAddressDislpay";
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

  return (
    <div className="w-full lg:w-auto lg:px-32 mx-auto">
      <h1 className="text-center font-comfortaa mt-4 mb-6 lg:mb-10 text-2xl text-midnight">
        Personal data
      </h1>
      <UserAddressDisplay
        address={address}
        aside={
          <aside className="hidden lg:block">
            <Image
              src={dataOkPicture}
              alt="filled dashboard graphic"
              width={200}
              height={400}
            />
          </aside>
        }
      />
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
