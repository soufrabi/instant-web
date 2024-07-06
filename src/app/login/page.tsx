import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import LoginPageClient from "./LoginPageClient"

export default async function LoginPage() {
    const session = await getServerSession()

    if (session) {
        redirect("/")
    } else {
        // not logged in
        return (
            <LoginPageClient />
        )
    }
}
