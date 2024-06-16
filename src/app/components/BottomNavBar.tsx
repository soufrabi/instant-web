import { BsIncognito } from "react-icons/bs";
import { BsChatLeftText } from "react-icons/bs";
import { IoCallOutline } from "react-icons/io5";
import { HiOutlineUserGroup } from "react-icons/hi2";
import clsx from "clsx";
import type { LeftSmallSideBarProps } from "./LeftSmallSideBar"
import { AppMode } from "./enums";


type BottomNavBarProps = LeftSmallSideBarProps

export function BottomNavBar({ appMode, setAppMode }: BottomNavBarProps) {

    const handleChatsIconClick = () => {
        setAppMode(AppMode.CHAT)

    }

    const handleCommunitiesIconClick = () => {
        setAppMode(AppMode.COMMUNITY)
    }

    const handleCallsIconClick = () => {
        setAppMode(AppMode.CALLS)
    }

    const handleIncognitoIconClick = () => {
        setAppMode(AppMode.INCOGNITO_CHAT)
    }

    return (
        <div
            className="h-18 flex flex-row justify-around pb-1 pt-2 bg-white"
        >
            <div
                className="cursor-pointer flex flex-col justify-center items-center"
                onClick={handleChatsIconClick}
            >
                <div
                    className={
                        clsx("px-4 py-1",
                            {
                                "shadow-customhovereffect": appMode == AppMode.CHAT
                            },
                        )
                    }
                >
                    <BsChatLeftText
                        className="w-8 h-8"
                    />
                </div>
                <span
                    className={clsx("text-sm",
                        {
                            "font-semibold": appMode === AppMode.CHAT
                        },
                    )}
                >Chats</span>

            </div>
            <div
                className="cursor-pointer flex flex-col justify-center items-center"
                onClick={handleCommunitiesIconClick}
            >
                <div
                    className={
                        clsx("px-4 py-1",
                            {
                                "shadow-customhovereffect": appMode == AppMode.COMMUNITY
                            },
                        )
                    }
                >
                    <HiOutlineUserGroup
                        className="w-8 h-8"
                    />
                </div>
                <span
                    className={clsx("text-sm",
                        {
                            "font-semibold": appMode === AppMode.COMMUNITY
                        },
                    )}
                >Communities</span>

            </div>
            <div
                className="cursor-pointer flex flex-col  justify-center items-center"
                onClick={handleCallsIconClick}
            >
                <div
                    className={
                        clsx("px-4 py-1",
                            {
                                "shadow-customhovereffect": appMode == AppMode.CALLS
                            },
                        )
                    }
                >
                    <IoCallOutline
                        className="w-8 h-8"
                    />
                </div>
                <span
                    className={clsx("text-sm",
                        {
                            "font-semibold": appMode === AppMode.CALLS
                        },
                    )}
                >Calls</span>

            </div>
            <div
                className="cursor-pointer flex flex-col justify-center items-center"
                onClick={handleIncognitoIconClick}
            >
                <div
                    className={
                        clsx("px-4 py-1",
                            {
                                "shadow-customhovereffect": appMode == AppMode.INCOGNITO_CHAT
                            },
                        )
                    }
                >
                    <BsIncognito
                        className="w-8 h-8"
                    />
                </div>
                <span
                    className={clsx("text-sm",
                        {
                            "font-bold": appMode === AppMode.INCOGNITO_CHAT
                        },
                    )}
                >Incognito</span>

            </div>
        </div>
    )

}

