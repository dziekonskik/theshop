import Image from "next/image";
import { Main } from "../components/layout/Main";

const Home = () => {
  return (
    <Main>
      <div style={{ height: "70%" }} className="relative">
        <Image src={"/assets/hero.png"} alt="image of the shop" layout="fill" />
      </div>
    </Main>
  );
};

export default Home;
