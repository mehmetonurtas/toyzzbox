import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import prisma from "./lib/prisma";
// import google from "next-auth/providers/google";
import authConfig from "./auth.config";


export const {handlers ,signIn, signOut, auth} = NextAuth({
    adapter: PrismaAdapter(prisma),
    // providers: [google],
    session: {strategy: "jwt"},
    ...authConfig,
})