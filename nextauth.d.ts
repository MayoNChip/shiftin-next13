// declare module "next-auth" {
// 	interface User {
// 		id: Number;
// 		email: String;
// 		name: String;
// 		image: String;
// 		configured: Boolean;
// 	}

// 	interface Session extends DefaultSession {
// 		user?: User;
// 	}
// }

// declare module "next-auth/jwt" {
// 	interface JWT {
// 		id: Number;
// 		email: String;
// 		name: String;
// 		image: String;
// 		configured: Boolean;
// 	}
// }

import { DefaultSession, DefaultUser } from "next-auth";
import { User } from "@prisma/client";
export enum Role {
	user = "user",
	admin = "admin",
}
interface IUser extends DefaultUser {
	id: string;
	email: string;
	name: string;
	image: string;
	configured: boolean;
}
declare module "next-auth" {
	interface User extends IUser {}
	interface Session {
		user?: User;
	}
}
declare module "next-auth/jwt" {
	interface JWT extends IUser {}
}
