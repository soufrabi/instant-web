"use client"

import { ReactNode, createContext, useEffect, useState, useContext } from "react"

const isTouchDeviceDefaultValue = false
type DeviceContextType = {
    isTouchDevice: boolean
}

const DeviceContext = createContext<DeviceContextType>({
    isTouchDevice: isTouchDeviceDefaultValue
})

export default function DeviceProvider({
    children
}: {
    children: ReactNode
}) {
    const [isTouchDevice, setIsTouchDevice] = useState<boolean>(isTouchDeviceDefaultValue)

    function isTouchDeviceCheck() {
        return "ontouchstart" in window || window.navigator.maxTouchPoints > 0
    }

    useEffect(() => {
        setIsTouchDevice(isTouchDeviceCheck())
        // console.log("Touch Device", isTouchDevice)
    }, [isTouchDevice])

    return (
        <DeviceContext.Provider
            value={{ isTouchDevice }}
        >
            {children}
        </DeviceContext.Provider>
    )
}

export function useDeviceContext() {
    return useContext(DeviceContext)
}
