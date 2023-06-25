import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
				const user = { id: "1", name: "Admin", email: "admin@admin.com" };
				return user;
			},
		}),
	],
	// pages: {
	// 	signIn: "/auth/signin",
	// 	signOut: "/auth/signout",
	// 	error: "/auth/error", // Error code passed in query string as ?error=
	// 	verifyRequest: "/auth/verify-request", // (used for check email message)
	// 	newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
	// },
};
