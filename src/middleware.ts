import { NextAuthMiddlewareOptions, withAuth } from "next-auth/middleware"

const middlewareOptions: NextAuthMiddlewareOptions = {
    secret: process.env.NEXTAUTH_SECRET as string,
    pages: {
        signIn: "/login"
    },
    callbacks: {
        authorized() {
            // console.log("Token", token)
            // return !!token

            // currently withAuth in middleware only supports jwt
            // as fetching data from database is not always available
            // in edge runtimes
            // so token will always have value of null for any
            // strategy other than jwt
            return true
        }
    }
}

export default withAuth(
    async function middleware() {
    },
    middlewareOptions
)

export const config = {
    matcher: [
        "/",
    ]
}
