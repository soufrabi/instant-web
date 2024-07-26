import { useMemo } from "react"
import { IoMdExit } from "react-icons/io"
import { HiDotsVertical } from "react-icons/hi"
import clsx from "clsx"
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react"
import { AppMode } from "./enums"

type TopNavBarProps = {
    appMode: AppMode
    setAppMode: React.Dispatch<React.SetStateAction<AppMode>>,
    showLeaveRoomButton: boolean,
    leaveRoom: () => void,
}

type DropDownThreeDotsProps = {
    appMode: AppMode
    setAppMode: React.Dispatch<React.SetStateAction<AppMode>>,

}


function DropDownThreeDots({ appMode, setAppMode }: DropDownThreeDotsProps) {

    return (
        <Popover className="relative">
            {({ close }) => (
                <>

                    <PopoverButton className="px-2 py-2 outline-none">
                        <HiDotsVertical

                            className="w-6 h-6"
                        />

                    </PopoverButton>
                    <PopoverPanel
                        anchor="bottom end"
                        className="flex flex-col bg-white select-none shadow-customalldirectionmd"
                    >
                        {
                            appMode !== AppMode.SETTINGS &&
                            <div
                                className="cursor-pointer px-6 py-3 border-b-2 border-b-gray-100/80"
                                onClick={() => {
                                    setAppMode(AppMode.SETTINGS)
                                    close()
                                }}
                            >
                                <span
                                >Settings</span>
                            </div>
                        }
                        {
                            appMode !== AppMode.PROFILE &&
                            <div
                                className="cursor-pointer px-6 py-3 border-b-2 border-b-gray-100/80"
                                onClick={() => {
                                    setAppMode(AppMode.PROFILE)
                                    close()
                                }}
                            >
                                <span
                                >Profile</span>
                            </div>
                        }
                    </PopoverPanel>
                </>
            )
            }

        </Popover>
    )
}

export function TopNavBar({ appMode, setAppMode, showLeaveRoomButton, leaveRoom }: TopNavBarProps) {
    const [topText, isBold] = useMemo(() => {
        switch (appMode) {
            case AppMode.CHATS:
                return ["Instant", true]
            case AppMode.COMMUNITIES:
                return ["Communities", false]
            case AppMode.CALLS:
                return ["Calls", false]
            case AppMode.INCOGNITO_CHAT:
                return ["Incognito Chat", false]
            case AppMode.PROFILE:
                return ["Profile",false]
            default:
                return ["Instant", true]
        }
    }, [appMode])
    const handleLeaveRoomButtonClick = () => {
        leaveRoom()
    }
    return (
        <div
            className="flex flex-row h-12 bg-white justify-between items-center"
        >
            <div
                className="px-4 py-2"
            >
                <span
                    className={clsx("text-2xl font-serif",
                        {
                            "font-semibold": isBold
                        })}
                >{topText}</span>
            </div>
            <div
                className="flex flex-row"
            >
                <div className="flex flex-row justify-center items-center">
                    {showLeaveRoomButton &&
                        <div
                            className="px-2 py-2 flex flex-row gap-2 justify-center items-center"
                            onClick={handleLeaveRoomButtonClick}
                        >
                            <span>
                                Leave Room
                            </span>
                            <IoMdExit
                                className="w-6 h-6"
                            />
                        </div>
                    }
                </div>
                <DropDownThreeDots
                    appMode={appMode}
                    setAppMode={setAppMode}
                />
            </div>

        </div>
    )
}


