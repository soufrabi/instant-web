import { IoMdExit } from "react-icons/io"
import { HiDotsVertical } from "react-icons/hi"

type TopNavBarProps = {
    showLeaveRoomButton: boolean,
    leaveRoom: () => void,
}


export function TopNavBar({ showLeaveRoomButton, leaveRoom }: TopNavBarProps) {
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
                    className="text-2xl font-serif"
                >Instant</span>
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


