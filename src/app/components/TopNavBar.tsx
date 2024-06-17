import { IoMdExit } from "react-icons/io"
import { HiDotsVertical } from "react-icons/hi"
import { useMemo } from "react"
import clsx from "clsx"
import { AppMode } from "./enums"

type TopNavBarProps = {
    appMode: AppMode
    showLeaveRoomButton: boolean,
    leaveRoom: () => void,
}


export function TopNavBar({ appMode, showLeaveRoomButton, leaveRoom }: TopNavBarProps) {
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
                <div
                    className="px-2 py-2"
                >
                    <HiDotsVertical

                        className="w-6 h-6"
                    />
                </div>
            </div>

        </div>
    )
}


