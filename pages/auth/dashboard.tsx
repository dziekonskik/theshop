import { useState, useEffect } from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { personAuthApolloClient } from "../../graphql/apolloClient";
import {
  GetPersonDetailsByEmailDocument,
  GetPersonDetailsByEmailQuery,
  GetPersonDetailsByEmailQueryVariables,
} from "../../generated/graphql";
import { usePersonData } from "../../contexts/UserContext";
import { MenuPanel } from "../../components/Dashboard/MenuPanel";
import { InformationPanel } from "../../components/Dashboard/InformationPanel";
import { UserAvatar } from "../../components/Dashboard/UserAvatar";
import { DashboardNavigation } from "../../components/Dashboard/DashboardNavigation";
import { AccessDenied } from "../../components/Dashboard/AccessDenied";
import useMediaQuery from "../../util/useMediaquery";

export type RenderedInfo = "UserDetails" | "ShippingAdddress" | "OrderHIstory";

const DashboardPage = ({
  sessionData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [renderedInfo, setRenderedInfo] = useState<RenderedInfo>();
  const matches = useMediaQuery("(max-width: 768px)");
  const { personDetails, setPersonAddress } = usePersonData();

  useEffect(() => {
    if (!matches) setRenderedInfo("UserDetails");
  }, [matches]);

  useEffect(() => {
    if (sessionData?.address && !personDetails.address.name) {
      const [
        name,
        email,
        phone,
        addressLineOne,
        addressLineTwo,
        city,
        postalCode,
      ] = sessionData?.address;
      setPersonAddress({
        name,
        email,
        phone,
        addressLineOne,
        addressLineTwo,
        city,
        postalCode,
      });
    }
  }, [sessionData?.address, personDetails.address.name, setPersonAddress]);

  if (!sessionData) {
    return <AccessDenied />;
  }

  const { address, userEmail, avatar, orders } = sessionData;
  const menuPanelVisible = !matches || (matches && !renderedInfo);
  const userDisplayName = address?.length ? address[0] : userEmail;
  return (
    <div className="flex-1 px-4 flex w-full justify-center">
      {menuPanelVisible && (
        <MenuPanel>
          <UserAvatar avatar={avatar} displayName={userDisplayName} />
          <DashboardNavigation setRenderedInfo={setRenderedInfo} />
        </MenuPanel>
      )}
      <InformationPanel
        renderedInfo={renderedInfo}
        setRenderedInfo={setRenderedInfo}
        address={address}
        orders={orders}
      />
    </div>
  );
};

export default DashboardPage;

interface GetServerSidePropsType {
  sessionData?: {
    address: string[] | null;
    avatar: {
      url: string;
      width?: number | null | undefined;
      height?: number | null | undefined;
    } | null;

    userEmail: string;
    orders: string[] | null;
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
    fetchPolicy: "no-cache",
  });

  const address = data.person?.address || null;
  const avatar = data.person?.avatar || null;
  const orders = data.person?.orders || null;
  const sessionData = {
    address,
    avatar,
    orders,
    userEmail: session.user.email,
  };

  return {
    props: { sessionData },
  };
};
