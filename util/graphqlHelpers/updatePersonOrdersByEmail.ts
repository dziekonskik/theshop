import { personAuthApolloClient } from "../../graphql/apolloClient";
import {
  UpdatePersonOrdersByEmailDocument,
  UpdatePersonOrdersByEmailMutation,
  UpdatePersonOrdersByEmailMutationVariables,
} from "../../generated/graphql";

export async function updatePersonOrdersByEmail(
  email: string,
  orders: string[]
) {
  await personAuthApolloClient.mutate<
    UpdatePersonOrdersByEmailMutation,
    UpdatePersonOrdersByEmailMutationVariables
  >({
    mutation: UpdatePersonOrdersByEmailDocument,
    variables: {
      email,
      orders,
    },
  });
}
