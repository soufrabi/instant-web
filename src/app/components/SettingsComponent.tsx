import React from "react"
import { Switch } from "@headlessui/react"
import { IoMdExit } from "react-icons/io"
import { signOut } from "next-auth/react"


type SettingsComponentProps = {
    isDarkModeEnabled: boolean | null,
    setIsDarkModeEnabled: React.Dispatch<React.SetStateAction<boolean | null>>,
    enableDarkMode: (dark: boolean) => void,
}



export function SettingsComponent({ isDarkModeEnabled, setIsDarkModeEnabled, enableDarkMode }: SettingsComponentProps) {

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
        <div className="w-full h-full flex flex-col bg-white overflow-y-clip">
            <div className="hidden md:block md:px-6 md:py-4">
                <span
                    className="font-bold text-xl"
                >Settings</span>

            </div>
            <hr className="h-0 w-full border-b-2 border-b-gray-100/80" />
            <div className="flex flex-row gap-4 px-4 py-4 border-b-2 border-b-gray-100/80">
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
            <div
                className="flex flex-row gap-4 px-4 py-4 border-b-2 border-b-gray-100/80 cursor-pointer"
                onClick={() => { signOut() }}
            >
                <IoMdExit
                    className="w-6 h-6 text-red-600"
                />
                <div>
                    <span
                        className="text-red-600"
                    >Logout</span>
                </div>

            </div>
        </div>
    )

}


