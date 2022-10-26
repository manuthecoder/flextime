import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma";

export const authOptions: any = {
  // Configure Prisma Client
  adapter: PrismaAdapter(prisma),

  // Callback
  callbacks: {
    async signIn(account) {
      if (!account.profile.email.endsWith("@iusd.org")) {
        return false;
      }
      const admin = await fetch(
        "https://flextime.vercel.app/api/checkIfAdmin?email=" +
          account.profile.email
      ).then((res) => res.json());

      return true;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },

  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  theme: {
    logo: "https://i.ibb.co/9vqnLWg/image.png",
    colorScheme: "light",
  },
};

export default NextAuth(authOptions);
