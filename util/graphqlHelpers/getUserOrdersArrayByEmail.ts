import { personAuthApolloClient } from "../../graphql/apolloClient";
import {
  GetPersonOrdersByEmailDocument,
  GetPersonOrdersByEmailQuery,
  GetPersonOrdersByEmailQueryVariables,
} from "../../generated/graphql";

export async function getUserOrdersArrayByEmail(email: string) {
  const { data } = await personAuthApolloClient.query<
    GetPersonOrdersByEmailQuery,
    GetPersonOrdersByEmailQueryVariables
  >({
    query: GetPersonOrdersByEmailDocument,
    variables: { email },
  });
  return data.person?.orders || [];
}
