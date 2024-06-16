import React from "react"
import { Switch } from "@headlessui/react"


type SettingsSideBarProps = {
    isDarkModeEnabled: boolean | null,
    setIsDarkModeEnabled: React.Dispatch<React.SetStateAction<boolean | null>>,
    enableDarkMode: (dark: boolean) => void,
}



export function SettingsSideBar({ isDarkModeEnabled, setIsDarkModeEnabled, enableDarkMode }: SettingsSideBarProps) {

    // const [enabled, setEnabled] = React.useState<boolean>(false)
    React.useEffect(() => {
        const darkModePreferenceInLocalStorage: string | null = localStorage.getItem("darkMode")
        if (darkModePreferenceInLocalStorage) {

            if (darkModePreferenceInLocalStorage === "dark") {
                setIsDarkModeEnabled(true)
            } else if (darkModePreferenceInLocalStorage === 'light') {
                setIsDarkModeEnabled(false)
            }

        }
    }, [])
    React.useEffect(() => {
        // console.log("Dark Mode toggled")
        if (isDarkModeEnabled !== null) {
            if (isDarkModeEnabled) {
                // enableDarkMode
                localStorage.setItem("darkMode", "dark")
                enableDarkMode(true)
            } else {
                // disableDarkMode
                localStorage.setItem("darkMode", "light")
                enableDarkMode(false)
            }

        }
    }, [isDarkModeEnabled])
    return (
        <div className="w-[calc(20vw)] h-full flex flex-col bg-white">
            <div className="flex flex-row gap-2 px-4 py-4">
                <div>
                    <span
                    >Dark Mode</span>
                </div>
                <Switch
                    checked={isDarkModeEnabled !== null ? isDarkModeEnabled : false}
                    onChange={setIsDarkModeEnabled}
                    className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600"
                >
                    <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
                </Switch>
            </div>
        </div>
    )

}


