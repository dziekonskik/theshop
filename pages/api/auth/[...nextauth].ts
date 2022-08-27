import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";
import { personAuthApolloClient } from "../../../graphql/apolloClient";
import {
  GetPersonCredentialsByEmailDocument,
  GetPersonCredentialsByEmailQuery,
  GetPersonCredentialsByEmailQueryVariables,
} from "../../../generated/graphql";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;

        const user = await personAuthApolloClient.query<
          GetPersonCredentialsByEmailQuery,
          GetPersonCredentialsByEmailQueryVariables
        >({
          query: GetPersonCredentialsByEmailDocument,
          variables: {
            email: credentials.email,
          },
          fetchPolicy: "no-cache",
        });

        if (!user.data.person?.id) return null;

        const arePasswordsEqual = await bcrypt.compare(
          credentials.password,
          user.data.person.password
        );

        if (!arePasswordsEqual) return null;

        return user.data.person;
      },
    }),
  ],
};

export default NextAuth(authOptions);
