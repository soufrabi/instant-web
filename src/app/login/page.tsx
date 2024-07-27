import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import LoginPageClient from "./LoginPageClient"
import { options } from "@/lib/auth/options"

export default async function LoginPage() {
    const session = await getServerSession(options)

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
