import CredentialsProvider from "next-auth/providers/credentials";
import { NuxtAuthHandler } from "#auth";
import { prisma } from "../../db";
import * as bcrypt from "bcrypt";
export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.id = user ? user.id || "" : "";
      }
      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      (session as any).user.id = token.id;
      return Promise.resolve(session);
    },
  },
  providers: [
    //@ts-ignore
    CredentialsProvider.default({
      async authorize(credentials: any) {
        const username = credentials?.username;
        const email = credentials?.email;
        const userData = await prisma.user.findUnique({
          where: { username_email: { username, email } },
        });

        if (!userData) {
          console.log("User not found");
          return false;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials?.password,
          userData.password
        );

        if (isPasswordValid) {
          console.log("ok");
          return userData;
        } else {
          console.log(
            "Warning: Malicious login attempt registered, bad credentials provided"
          );
          return null;
        }
      },
    }),
  ],
});
