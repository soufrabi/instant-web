import { AuthOptions } from "next-auth"
// import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/db/prisma/init"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { Adapter } from "next-auth/adapters"

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        // GithubProvider({
        //     clientId: process.env.GITHUB_CLIENT_ID!,
        //     clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        // }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            return token
        },
        async session({ session, token }) {
            return session
        },
    },
    pages: {
        signIn: "/login"
    }
}
