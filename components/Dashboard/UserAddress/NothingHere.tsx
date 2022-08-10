import Image from "next/image";
import { Button } from "../../ButtonsAndLinks/Button";
import notFounfPicture from "../../../public/assets/shapes/not_found.svg";
import type { RenderedInfo } from "../../../pages/auth/dashboard";

interface NothingHereProps {
  matches: boolean;
  setRenderedInfo: React.Dispatch<
    React.SetStateAction<RenderedInfo | undefined>
  >;
}

export const NothingHere = ({ matches, setRenderedInfo }: NothingHereProps) => (
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
