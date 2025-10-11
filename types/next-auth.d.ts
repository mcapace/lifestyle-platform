import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    verified: boolean;
    membershipTier: string;
  }

  interface Session {
    user: User & {
      id: string;
      verified: boolean;
      membershipTier: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    verified: boolean;
    membershipTier: string;
  }
}

