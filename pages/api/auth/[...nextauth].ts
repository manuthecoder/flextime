import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  callbacks: {
    async signIn(account) {
      if (!account.profile.email.endsWith("@iusd.org")) {
        return false;
      }
      const admin = await fetch(
        "/api/checkIfAdmin?email=" + account.profile.email
      ).then((res) => res.json());

      return true;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
