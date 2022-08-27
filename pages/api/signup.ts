import { NextApiHandler } from "next";
import * as bcrypt from "bcrypt";
import { personAuthApolloClient } from "../../graphql/apolloClient";
import {
  CreatePersonDocument,
  CreatePersonMutation,
  CreatePersonMutationVariables,
  GetPersonCredentialsByEmailQuery,
  GetPersonCredentialsByEmailQueryVariables,
  GetPersonCredentialsByEmailDocument,
} from "../../generated/graphql";
import { registerUserFormSchema } from "../../util/yupSchema/registerUserFormSchema";

const SignupHandler: NextApiHandler = async (req, res) => {
  const userData = await registerUserFormSchema.validate(req.body, {
    strict: true,
  });
  if (!userData.email || !userData.password) {
    return res.status(400).json({ error: "Credentials missing" });
  }

  const { email, password } = userData;
  const passwordHash = await bcrypt.hash(password, 12);

  const uxistingUser = await personAuthApolloClient.query<
    GetPersonCredentialsByEmailQuery,
    GetPersonCredentialsByEmailQueryVariables
  >({
    query: GetPersonCredentialsByEmailDocument,
    variables: {
      email,
    },
    fetchPolicy: "no-cache",
  });

  if (uxistingUser.data.person?.id) {
    return res.status(409).json({ error: "Email allready registered" });
  }

  const user = await personAuthApolloClient.mutate<
    CreatePersonMutation,
    CreatePersonMutationVariables
  >({
    mutation: CreatePersonDocument,
    variables: {
      email,
      password: passwordHash,
    },
  });

  res.status(201).json({ userId: user.data?.createPerson?.id });
};

export default SignupHandler;
