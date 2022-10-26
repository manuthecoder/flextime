import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma";

export const authOptions: any = {
  // Configure Prisma Client
  adapter: PrismaAdapter(prisma),

  // Callback
  callbacks: {
    async jwt({ token, account, profile }) {
      console.log(true);
      return token;
    },
    async signIn(account) {
      if (!account.profile.email.endsWith("@iusd.org")) {
        return false;
      }
      return true;
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
