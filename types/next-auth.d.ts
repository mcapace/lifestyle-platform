import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      verified: boolean;
      membershipTier: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    name: string | null;
    image: string | null;
    verified: boolean;
    membershipTier: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    verified: boolean;
    membershipTier: string;
  }
}

