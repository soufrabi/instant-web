"use client"

import React from "react"
import { IoMdSend } from "react-icons/io";
import { BsIncognito } from "react-icons/bs";
import { BsChatLeftText } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { HiDotsVertical } from "react-icons/hi";
import { IoIosLock } from "react-icons/io";
import { nanoid } from "nanoid";
import Markdown from "react-markdown";
import { Button, Field, Fieldset, Input, Label, Switch } from "@headlessui/react";
import { socket } from "@/socket"

type ChatMessageData = {
    text: string,
    from: string,
    to: string,
}

type ChatAreaProps = {
    myUserId: string,
    chatMessageList: Array<ChatMessageData>,
    sendMessage: (chatMessageText: string) => void,
}

enum AppMode {
    INCOGNITO_CHAT,
    SETTINGS,
}


type LeftSmallSideBarProps = {
    appMode: AppMode,
    setAppMode: React.Dispatch<React.SetStateAction<AppMode>>,
}

function LeftSmallSideBar({ appMode, setAppMode }: LeftSmallSideBarProps) {
    return (

        <div className="h-full w-16 bg-gray-100 flex flex-col gap-4 py-4 items-center justify-between">
            <div className="flex flex-col gap-6 py-2">
                <button
                    className=""
                    onClick={() => { setAppMode(AppMode.INCOGNITO_CHAT) }}
                >
                    <BsIncognito
                        className="w-6 h-6"
                    />
                </button>
                <button
                    className=""
                >
                    <BsChatLeftText
                        className="w-6 h-6"
                    />
                </button>
            </div>

            <div className="flex flex-col gap-6 py-2">
                <button
                    className=""
                    onClick={() => { setAppMode(AppMode.SETTINGS) }}
                >
                    <IoSettingsOutline
                        className="w-6 h-6"
                    />
                </button>
                <button className="">
                    <CgProfile
                        className="w-6 h-6"
                    />
                </button>
            </div>
        </div>
    )
}

function ChatArea({ myUserId, chatMessageList, sendMessage }: ChatAreaProps) {
    const chatListBottomRef = React.useRef<HTMLDivElement>(null)
    const [composeMessageTextAreaValue, setComposeMessageTextAreaValue] = React.useState<string>("")
    const handleComposeMessageTextAreaValueChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
        // console.log(composeMessageTextAreaValue)
        setComposeMessageTextAreaValue(ev.target.value)
    }
    let lastKey: string = ""

    const scrollToBottomOfChatList = () => {
        chatListBottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const handleSendButtonClick = () => {
        const messageText = composeMessageTextAreaValue.trim()
        if (messageText.length > 0) {
            sendMessage(messageText)
            setComposeMessageTextAreaValue("")
        }
    }

    const handleComposeMessageKeyDown = (ev: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // console.log(`Key pressed : {ev.key}`)
        if (ev.key === "Enter" && lastKey !== "Shift") {
            ev.preventDefault()
            handleSendButtonClick()
        }

        if (ev.key !== "Enter") {
            lastKey = ev.key
        }

        // console.log(`LastKey : ${lastKey}`)

    }

    React.useEffect(() => {
        scrollToBottomOfChatList()
    }, [chatMessageList])

    return (
        <div className="h-full w-full bg-sky-50 flex flex-col">
            <div
                className="flex-1 flex flex-col gap-2 px-2 py-2 overflow-auto"
            >
                {
                    chatMessageList.map((chatMessage: ChatMessageData) => (
                        <div
                            key={nanoid()}
                            className={`flex flex-row ${chatMessage.from === myUserId ? "justify-end" : "justify-start"}`}
                        >
                            <div className="p-3 rounded-2xl bg-teal-200">
                                <Markdown>
                                    {chatMessage.text}
                                </Markdown>
                            </div>

                        </div>
                    ))
                }

                <div ref={chatListBottomRef}></div>
            </div>
            <div className="p-3 bg-gray-100">
                <div className="flex flex-row items-center gap-2 px-4 py-1">
                    <textarea
                        className="flex-1 bg-white rounded-2xl p-3 outline-gray-300 resize-none"
                        value={composeMessageTextAreaValue}
                        onChange={handleComposeMessageTextAreaValueChange}
                        onKeyDown={handleComposeMessageKeyDown}
                    />
                    <button

                        className="h-fit bg-white p-2 rounded-2xl"
                        onClick={handleSendButtonClick}
                    // disabled={composeMessageTextAreaValue.length === 0}
                    >

                        <IoMdSend
                            className="w-8 h-8 text-green-600"
                        />

                    </button>
                </div>
            </div>


        </div>
    )


}

type AnonChatSideBarProps = {
    currentRoomId: string,
    isInRoom: boolean,
    joinRoom: (room: string) => void,
    leaveRoom: () => void,
}

function AnonChatSideBar({ currentRoomId, isInRoom, joinRoom, leaveRoom }: AnonChatSideBarProps) {
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


function SettingsSideBar() {
    const [enabled, setEnabled] = React.useState<boolean>(false)
    React.useEffect(() => {
        if (enabled) {
            // enableDarkMode
        } else {
            // disableDarkMode
        }
    }, [enabled])
    return (
        <div className="w-[calc(20vw)] h-full flex flex-col bg-white">
            <div className="flex flex-row gap-2 px-4 py-4">
                <div>
                    <span
                    >Dark Mode</span>
                </div>
                <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600"
                >
                    <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
                </Switch>
            </div>
        </div>
    )

}


function NoAccessScreen() {
    return (
        <div
            className="h-full w-full relative overflow-clip"
            style={{
                backgroundImage: 'url("")'
            }}
        >
            <div
                className={`absolute top-0 left-0 h-full w-full bg-[url("/dark-screen-chat-template-interface-with-chat.jpg")] bg-cover bg-center blur-md `}
            >

            </div>
            <div className="absolute flex flex-col justify-center items-center w-full h-full">
                <div className="">
                    <IoIosLock
                        className="w-20 h-20 text-green-300"

                    />
                </div>
                <div className="">
                    <span
                        className="text-3xl text-white select-none"
                    >Please join a room to send messages</span>
                </div>
            </div>
        </div>
    )
}

export default function Home() {
    // const [isConnected, setIsConnected] = React.useState<boolean>(false)
    // const [transportName, setTransportName] = React.useState<any | null>(null)
    const [chatMessageList, setChatMessageList] = React.useState<Array<ChatMessageData>>([])
    const [appMode, setAppMode] = React.useState<AppMode>(AppMode.INCOGNITO_CHAT)
    const [currentRoomId, setCurrentRoomId] = React.useState<string>("")
    const [isInRoom, setIsInRoom] = React.useState<boolean>(false)
    const [anonId, setAnonId] = React.useState<string | null>(null)

    const clearChatMessageList = () => {
        setChatMessageList([])
    }

    const appendToChatMessageList = (newChatMessage: ChatMessageData) => {
        setChatMessageList((prevList) => [...prevList, newChatMessage])
    }

    const sendMessage = (chatMessageText: string) => {
        if (isInRoom) {
            socket.emit('send-message', chatMessageText, currentRoomId)
        } else {
            // console.error("Cannot send message as user is not in any room")
        }
    }


    const onConnect = () => {
        // setIsConnected(true)
        // setTransportName(socket.io.engine.transport.name)

        // socket.io.engine.on("upgrade", (transport) => {
        //     setTransportName(transport.name)
        // })
    }

    const onDisconnect = () => {
        // setIsConnected(false)
        // setTransportName(null)
    }

    const receiveMessage = (msg: ChatMessageData) => {

        // console.log(`Received message : ${msg}`)
        appendToChatMessageList(msg)
    }

    const joinRoom = (roomIdPassed: string) => {

        const roomIdTrimmed = roomIdPassed.trim()
        if (roomIdTrimmed.length > 0) {
            socket.emit('join-room', roomIdTrimmed, (responseStatusCode: number, anonId: string) => {
                if (responseStatusCode === 0) {
                    setIsInRoom(true)
                    setCurrentRoomId(roomIdTrimmed)
                    setAnonId(anonId)
                }
            })
        }
    }

    const leaveRoom = () => {

        socket.emit('leave-room', (responseStatusCode: number) => {
            if (responseStatusCode === 0) {
                setIsInRoom(false)
                setCurrentRoomId("")
                clearChatMessageList()
            }
        })

    }




    React.useEffect(() => {

        if (socket.connected) {
            onConnect()
        } else {
            socket.connect()
        }

        socket.on("connect", onConnect)
        socket.on("disconnect", onDisconnect)

        socket.on("receive-message", receiveMessage)

        return () => {
            socket.off("connect", onConnect)
            socket.off("disconnect", onDisconnect)

            socket.off("receive-message", receiveMessage)

            // socket.disconnect()
        }

    }, [])

    return (
        <main className="h-screen w-screen flex flex-row p-5 bg-slate-300">

            <LeftSmallSideBar appMode={appMode} setAppMode={setAppMode} />

            {
                appMode === AppMode.INCOGNITO_CHAT
                && <AnonChatSideBar
                    currentRoomId={currentRoomId}
                    isInRoom={isInRoom}
                    joinRoom={joinRoom}
                    leaveRoom={leaveRoom}
                />
            }
            {
                appMode === AppMode.SETTINGS && <SettingsSideBar />
            }

            {
                isInRoom && anonId !== null
                    ? <ChatArea myUserId={anonId} chatMessageList={chatMessageList} sendMessage={sendMessage} />
                    : <NoAccessScreen />
            }

            {
                // <div className="">
                //     <p>Status : {isConnected ? "connected" : "disconnected"} </p>
                //     <p>Transport : {transportName !== null ? transportName : "N/A"} </p>
                // </div>
            }

        </main >


    )
}

