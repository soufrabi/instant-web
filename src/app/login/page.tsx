import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import LoginPageClient from "./LoginPageClient"
import { authOptions } from "@/lib/auth/options"

export default async function LoginPage() {
    const session = await getServerSession(authOptions)

    if (session) {
        // logged in
        // console.log("Session",session)
        redirect("/")
    } else {
        // not logged in
        return (
            <LoginPageClient />
        )
    }
}
