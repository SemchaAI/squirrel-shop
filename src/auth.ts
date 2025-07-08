import NextAuth, { AuthError } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import Credentials from "next-auth/providers/credentials";
import prisma from "@/prismaClient";
import { registerGuest } from "./actions/auth";
import { comparePasswords } from "./utils/helpers";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  trustHost: true,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        try {
          if (req.url.includes("?anon=true")) {
            console.log("req", req.url.includes("?anon=true"));
            const user = await registerGuest();
            return user;
          }
          if (!credentials || !credentials?.email || !credentials.password)
            return null;
          const email = credentials.email as string;
          const user = await prisma.user.findUnique({
            where: {
              email,
            },
            include: {
              cart: true,
            },
          });
          if (!user || !user.password) return null;
          const isValid = await comparePasswords(
            credentials.password as string,
            user.password,
          );
          if (!isValid) return null;
          // if (!user.verified) return null;

          //unsafe in future we need to create type and send only part of user data
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            cartId: user.cart!.id, // if user exists then cart exists (check register)
          };
        } catch (error) {
          console.log("[AUTH][authorize]", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.avatar = user.avatar;
        token.cartId = user.cartId;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.avatar = token.avatar;
        session.user.cartId = token.cartId;
      }
      return session;
    },
  },
  logger: {
    error(error: Error) {
      /* We are suppressing the error if it is a CredentialsSignin error
        since there is no reason to show server error for wrong password */
      if ((error as AuthError).type === "CredentialsSignin") {
        // Just return to suppress the error
        console.log("\nError may have diff format because of logger!");
        console.error(`[auth][error] ${(error as AuthError).type}\n`);
        return;
      }
      // Otherwise, log other errors
      console.log("Error may have diff format because of logger!\n");
      console.error(error);
    },
    warn: console.warn,
    debug: console.log,
  },
});
