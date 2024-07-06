import { withAuth } from "next-auth/middleware"
// import { NextResponse } from "next/server"

export default withAuth(
    function middleware() {
        // console.log("req.nextUrl.pathname", pathname)
        // console.log("req.nextUrl.token", req.nextauth.token)
    },
    {
        pages: {
            signIn: "/login"
        }
    }
)

export const config = {
    matcher: [
        "/",
    ]
}
