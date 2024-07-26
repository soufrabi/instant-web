"use client";
import { SessionProvider } from "next-auth/react";
import { MediaContextProvider } from "../components/media";
import DeviceProvider from "./DeviceProvider";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <MediaContextProvider>
                <DeviceProvider>
                    {children}
                </DeviceProvider>
            </MediaContextProvider>
        </SessionProvider>
    )
}
