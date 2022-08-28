import Image from "next/image";
import { Button } from "../ButtonsAndLinks/Button";
import { NothingHere } from "../NothingHere";
import { UserAddressDisplay } from "./UserAddress/UserAddressDislpay";
import { usePersonData } from "../../contexts/UserContext";
import useMediaQuery from "../../util/useMediaquery";
import dataOkPicture from "../../public/assets/shapes/data_ok.svg";
import type { RenderedInfo } from "../../pages/auth/dashboard";

interface UserDetailsProps {
  setRenderedInfo: React.Dispatch<
    React.SetStateAction<RenderedInfo | undefined>
  >;
}

export const UserDetails = ({ setRenderedInfo }: UserDetailsProps) => {
  const matches = useMediaQuery("(max-width: 768px)");
  const { personDetails } = usePersonData();
  const addressFromContext = personDetails.address;

  if (!addressFromContext.name) {
    return (
      <NothingHere
        setRenderedInfo={setRenderedInfo}
        matches={matches}
        message="Fill out adress details to take advantage from the one click checkout"
      />
    );
  }

  return (
    <div className="w-full lg:w-auto lg:px-32 mx-auto">
      <h1 className="text-center font-comfortaa mt-4 mb-6 lg:mb-10 text-2xl text-midnight">
        Personal data
      </h1>
      <UserAddressDisplay
        address={addressFromContext}
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
