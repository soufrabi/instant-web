import { AuthOptions } from "next-auth"
// import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

export const options: AuthOptions = {
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
