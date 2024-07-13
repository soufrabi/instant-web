"use client";
import { SessionProvider } from "next-auth/react";
import { MediaContextProvider } from "../components/media";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <MediaContextProvider>
                {children}
            </MediaContextProvider>
        </SessionProvider>
    )
}
