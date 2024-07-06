"use client"
import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc";


export default function LoginPageClient() {
    const handleSignInWithGoogle = () => {
        signIn("google")
    }

    return (
        <main className="h-[100svh] w-screen grid">
            <div
                className="place-self-center border-2 border-gray-300 rounded-xl m-3"
                onClick={handleSignInWithGoogle}
            >
                <div className="flex flex-row items-center justify-center py-4 border-b-2 border-b-gray-200">
                    <div
                    className="flex flex-row gap-2"
                    >
                        <span
                            className="text-4xl font-serif"
                        >Sign in </span>
                        <span
                            className="text-4xl font-serif font-bold"
                        >Instant</span>
                    </div>
                </div>
                <div
                    className="flex flex-col py-10 items-center"
                >
                    <div className="flex flex-row gap-4 items-center justify-between border-2 border-gray-200 px-4 py-3 cursor-pointer">
                        <FcGoogle
                            className="w-8 h-8"
                        />
                        <div>
                            <span
                                className="text-xl font-semibold"
                            >Google</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row border-t-2 border-t-gray-200 py-2 px-6">
                    <span
                        className="text-sm w-full"
                    >By signing in, you agree to Instant&apos;s terms of service and privacy policy.</span>
                </div>
            </div>
        </main>
    )
}
