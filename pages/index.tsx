import Image from "next/image";
import { Main } from "../components/layout/Main";
import { NewsletterForm } from "../components/Forms/NewsletterForm";

const Home = () => {
  return (
    <Main>
      <NewsletterForm />
    </Main>
  );
};

export default Home;
