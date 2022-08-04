import { NextApiHandler } from "next";
import * as yup from "yup";
import { personAuthApolloClient } from "../../graphql/apolloClient";
import {
  SetPersonAddressByEmailMutation,
  SetPersonAddressByEmailDocument,
  SetPersonAddressByEmailMutationVariables,
} from "../../generated/graphql";
import { addressSchema } from "../../util/yupSchema/addressSchema";

type FormData = yup.InferType<typeof addressSchema>;

type RequestBodyType = { address: FormData; email: string };

function isRequestBodyType(reqBody: any): reqBody is RequestBodyType {
  return (
    reqBody &&
    "email" in reqBody &&
    typeof reqBody.email === "string" &&
    "address" in reqBody &&
    "name" in reqBody.address &&
    typeof reqBody.address.name === "string"
  );
}

const updateUserAddressHandler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).setHeader("Allow", "POST").json({});
  }

  if (!isRequestBodyType(req.body)) {
    return res.status(400).json({ error: "Invalid request body format" });
  }

  const { address, email } = req.body;
  const userAddress = await addressSchema.validate(address, {
    strict: true,
  });

  const { data } = await personAuthApolloClient.mutate<
    SetPersonAddressByEmailMutation,
    SetPersonAddressByEmailMutationVariables
  >({
    mutation: SetPersonAddressByEmailDocument,
    variables: {
      address: [
        userAddress.name,
        userAddress.email,
        userAddress.phone,
        userAddress.addressLineOne,
        userAddress.addressLineTwo,
        userAddress.city,
        userAddress.postalCode,
      ],
      email,
    },
  });
  if (data?.updatePerson?.id) {
    return res.status(201).json({ message: "Address updated" });
  } else {
    return res.status(501).json({ error: "Address not updated" });
  }
};

export default updateUserAddressHandler;
