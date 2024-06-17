import { BsChatLeftText } from "react-icons/bs"
import { HiOutlineUserGroup } from "react-icons/hi"
import { IoCallOutline } from "react-icons/io5"
import { IoSettingsOutline } from "react-icons/io5"
import { BsIncognito } from "react-icons/bs"
import { CgProfile } from "react-icons/cg"
import clsx from "clsx"
import { AppMode } from "./enums"


export type LeftSmallSideBarProps = {
    appMode: AppMode,
    setAppMode: React.Dispatch<React.SetStateAction<AppMode>>,
}


export function LeftSmallSideBar({ appMode, setAppMode }: LeftSmallSideBarProps) {
    return (

        <div className="h-full w-16 bg-gray-100 flex flex-col gap-4 py-4 items-center justify-between">
            <div className="flex flex-col gap-2">
                <button
                    className={clsx("px-2 py-2 hover:shadow-customhovereffect rounded-2xl",
                    )}
                    onClick={() => setAppMode(AppMode.CHATS)}
                >
                    <BsChatLeftText
                        className="w-6 h-6"
                    />
                </button>
                <button
                    className={clsx("px-2 py-2 hover:shadow-customhovereffect rounded-2xl",
                    )}
                    onClick={() => setAppMode(AppMode.COMMUNITIES)}
                >
                    <HiOutlineUserGroup
                        className="w-6 h-6"
                    />
                </button>
                <button
                    className={clsx("px-2 py-2 hover:shadow-customhovereffect rounded-2xl",
                    )}
                    onClick={() => setAppMode(AppMode.CALLS)}
                >
                    <IoCallOutline
                        className="w-6 h-6"
                    />
                </button>
                <button
                    className={clsx("px-2 py-2 hover:shadow-customhovereffect rounded-2xl",
                    )}
                    onClick={() => { setAppMode(AppMode.INCOGNITO_CHAT) }}
                >
                    <BsIncognito
                        className="w-6 h-6"
                    />
                </button>
            </div>

            <div className="flex flex-col gap-2 py-2">
                <button
                    className={clsx("px-2 py-2 hover:shadow-customhovereffect rounded-2xl",
                    )}
                    onClick={() => { setAppMode(AppMode.SETTINGS) }}
                >
                    <IoSettingsOutline
                        className="w-6 h-6"
                    />
                </button>
                <button
                    className={clsx("px-2 py-2 hover:shadow-customhovereffect rounded-2xl",
                    )}
                >
                    <CgProfile
                        className="w-6 h-6"
                    />
                </button>
            </div>
        </div>
    )
}

