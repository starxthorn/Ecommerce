import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import db from "@/lib/db";
import User from "@/models/User";

export const AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Ecommerce",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await User.findOne({ email: credentials.email });
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        await db();
        const Existuser = await User.findOne({ email: user.email });
        if (!Existuser) {
          await User.create({
            avatar: user.image,
            name: user.name,
            email: user.email,
          });
        }
        return true;
      } catch (error) {
        return false;
      }
    },
  },
};

const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };
