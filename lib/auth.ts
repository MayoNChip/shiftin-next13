import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email.toLowerCase(),
          },
          include: {
            Employee: true,
            shiftTypes: true,
            userToWorkDay: true,
          },
        });
        return user;
      },
    }),
    GoogleProvider({
      name: "Google",
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      console.log("redirect", url, baseUrl);
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
    async signIn({ user, profile, account }) {
      if (account?.provider === "google") {
        //check if user is in your database
        console.log("google provider login");
        const userInDB = await prisma.user.findUnique({
          where: {
            email: profile?.email!,
          },
        });
        console.log("user", userInDB);
        if (!userInDB) {
          //add your user in DB here with profile data (profile.email, profile.name)
          console.log("no user was found, adding user to db");
          if (!profile?.email) return false;
          try {
            const addedUserRes = await prisma.user.create({
              data: {
                email: profile?.email,
                name: profile?.name,
                image: profile?.image,
              },
            });

            console.log(addedUserRes);
          } catch (error) {
            console.log("add user error", error);
            return false;
          }
          return true;
        }
        return true;
      }
      return true;
    },
    async session({ session, user }) {
      const userData = await prisma.user.findUnique({
        where: {
          email: session.user?.email!,
        },
      });

      if (!userData) return session;
      session.user = { ...userData };
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    signOut: "/",
    // 	error: "/auth/error", // Error code passed in query string as ?error=
    // 	verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/welcome", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};
