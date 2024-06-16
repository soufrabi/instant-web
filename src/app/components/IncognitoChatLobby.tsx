import React from "react";
import { Button, Field, Fieldset, Input, Label, Legend } from "@headlessui/react";
import type { AnonChatSideBarProps } from "./AnonChatSideBar";

type IncognitoChatLobbyProps = AnonChatSideBarProps



// for mobile devices
export function IncognitoChatLobby({ currentRoomId, isInRoom, joinRoom, leaveRoom }: IncognitoChatLobbyProps) {
    const [roomId, setRoomId] = React.useState<string>("")
    const handleRoomIdChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setRoomId(ev.target.value)
    }

    const handleJoinRoomButtonClick = () => {
        const roomIdTrimmed = roomId.trim()
        if (roomIdTrimmed.length > 0) {
            joinRoom(roomIdTrimmed)
        }
    }


    return (
        <div className="h-full w-full bg-white shadow-md">

            <Fieldset className={"h-full w-full p-4"}>
                <Legend >
                    <span
                        className="text-xl font-semibold"
                    >Incognito Chat Lobby</span>
                </Legend>
                <Field className="py-1 flex flex-col gap-1">
                    <Label
                        className={"block"}
                    >
                        <span
                            className=""
                        >Room ID</span>
                    </Label>
                    <Input
                        type="text"
                        className={"block outline-none border-2 border-gray-200 w-full px-2"}
                        value={roomId}
                        onChange={handleRoomIdChange}
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
                </Field>



            </Fieldset>



        </div>
    )
}

