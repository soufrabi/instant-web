"use server"

import HomePageClient from "./components/HomePageClient"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth/options"

export default async function HomePage() {
    const session = await getServerSession(authOptions)
    if (session) {
        // logged in
        return (
            <HomePageClient />
        )
    } else {
        // not logged in
        redirect("/login?callbackUrl=/")
    }

}
