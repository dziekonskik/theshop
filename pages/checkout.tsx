import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "../components/Forms/CheckoutForm";
import { authOptions } from "./api/auth/[...nextauth]";
import { personAuthApolloClient } from "../graphql/apolloClient";
import {
  GetPersonDetailsByEmailDocument,
  GetPersonDetailsByEmailQuery,
  GetPersonDetailsByEmailQueryVariables,
} from "../generated/graphql";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!.toString()
);
const CheckoutPage = ({
  sessionData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const stripeElementsConfig: StripeElementsOptions = {
    fonts: [
      {
        cssSrc:
          "https://fonts.googleapis.com/css2?family=Anonymous+Pro:ital,wght@0,400;0,700;1,400;1,700&family=Comfortaa:wght@300;400;500;600;700&display=swap",
      },
    ],
    locale: "en",
  };

  return (
    <Elements stripe={stripePromise} options={stripeElementsConfig}>
      <CheckoutForm fetchedUserAddress={sessionData?.address} />
    </Elements>
  );
};

export default CheckoutPage;

interface GetServerSidePropsType {
  sessionData?: {
    address: string[] | undefined;
    avatar:
      | {
          url: string;
          width?: number | null | undefined;
          height?: number | null | undefined;
        }
      | null
      | undefined;
    userEmail: string;
  } | null;
}

export const getServerSideProps: GetServerSideProps<
  GetServerSidePropsType
> = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session?.user.email) {
    return {
      props: {
        session: null,
      },
    };
  }

  const { data } = await personAuthApolloClient.query<
    GetPersonDetailsByEmailQuery,
    GetPersonDetailsByEmailQueryVariables
  >({
    query: GetPersonDetailsByEmailDocument,
    variables: {
      email: session.user.email,
    },
  });

  const address = data.person?.address;
  const avatar = data.person?.avatar;
  const sessionData = { address, avatar, userEmail: session.user.email };

  return {
    props: { sessionData },
  };
};
