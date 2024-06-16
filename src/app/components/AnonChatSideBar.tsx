import React from "react";
import { Button, Field, Fieldset, Input, Label } from "@headlessui/react";
import { HiDotsVertical } from "react-icons/hi";


export type AnonChatSideBarProps = {
    currentRoomId: string,
    isInRoom: boolean,
    joinRoom: (room: string) => void,
    leaveRoom: () => void,
}

export function AnonChatSideBar({ currentRoomId, isInRoom, joinRoom, leaveRoom }: AnonChatSideBarProps) {
    const [roomId, setRoomId] = React.useState<string>("")
    const [password, setPassword] = React.useState<string>("")
    const statusMessage = React.useMemo<string>(() => {
        if (isInRoom) {
            return `Status : Currently in Room ID ${currentRoomId} `
        } else {
            return "Status : Currently not in any room"
        }

    }, [currentRoomId, isInRoom])

    const handleRoomIdChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setRoomId(ev.target.value)
    }

    const handlePasswordChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(ev.target.value)
    }

    const handleJoinRoomButtonClick = () => {
        joinRoom(roomId)
    }

    const handleLeaveRoomButtonClick = () => {
        leaveRoom()
    }

    return (
        <div className="w-[calc(20vw)] h-full flex flex-col bg-white">
            <div className="flex flex-row py-4 px-4 justify-between items-center">
                <span
                    className="font-bold text-lg"
                >Incognito Chat</span>
                <div className="cursor-pointer">
                    <HiDotsVertical
                        className="w-5 h-5"
                    />
                </div>

            </div>

            <Fieldset className={"w-full px-4"}>
                {
                    // <Legend
                    //     className={"text-lg font-semibold"}
                    // >Room</Legend>
                    //
                }
                <Field
                    className={"py-1 flex flex-col gap-1"}
                >
                    <Label
                        className={"block"}
                    >
                        <span>Room ID</span>
                    </Label>
                    <Input
                        name="roomId"
                        className={"block outline-none border-2 border-gray-200 w-full px-2"}
                        value={roomId}
                        onChange={handleRoomIdChange}
                    />
                </Field>
                <Field
                    className={"py-1 flex flex-col gap-1"}
                >
                    <Label
                        className={"block"}
                    >
                        <span>Password</span>
                    </Label>
                    <Input
                        name="password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className={"block outline-none border-2 border-gray-200 w-full px-2"}
                    />

                </Field>
                <Field
                    className={"py-1 flex flex-row gap-3"}
                >
                    <Button
                        className={"bg-green-200 p-2 rounded-md"}
                        onClick={handleJoinRoomButtonClick}
                    >
                        <span>Join</span>
                    </Button>
                    <Button
                        className={"bg-green-200 p-2 rounded-md"}
                        onClick={handleLeaveRoomButtonClick}
                    >
                        <span>Leave</span>
                    </Button>
                </Field>
            </Fieldset>
            <div className="flex flex-row px-4 py-4">
                <span
                    className=""
                >{statusMessage}</span>
            </div>
        </div>

    )

}


