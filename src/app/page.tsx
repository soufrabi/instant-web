"use client"

import React from "react"
import { IoMdSend } from "react-icons/io";
import { BsIncognito } from "react-icons/bs";
import { BsChatLeftText } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { HiDotsVertical } from "react-icons/hi";
import { nanoid } from "nanoid";
import { socket } from "@/socket"
import Markdown from "react-markdown";

type ChatMessageData = {
    text: string,
    from: number,
    to: number,
}

type ChatAreaProps = {
    chatMessageList: Array<ChatMessageData>,
    sendMessage: (chatMessageText: string) => void,
}


const myID: number = 1
const initialChatMessageList: Array<ChatMessageData> = [
    {
        text: "Hello",
        from: 1,
        to: 2,
    },
    {
        text: "I am fine",
        from: 2,
        to: 1
    }

]

function ChatArea({ chatMessageList, sendMessage }: ChatAreaProps) {
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
                    chatMessageList.map((chatMessage) => (
                        <div
                            key={nanoid()}
                            className={`flex flex-row ${chatMessage.from === myID ? "justify-end" : "justify-start"}`}
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

export default function Home() {
    // const [isConnected, setIsConnected] = React.useState<boolean>(false)
    // const [transportName, setTransportName] = React.useState<any | null>(null)
    const [chatMessageList, setChatMessageList] = React.useState<Array<ChatMessageData>>(initialChatMessageList)

    const appendToChatMessageList = (newChatMessage: ChatMessageData) => {
        setChatMessageList((prevList) => [...prevList, newChatMessage])
    }

    const sendMessage = (chatMessageText: string) => {
        socket.emit('send-message', chatMessageText)
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

    const receiveMessage = (msg: string) => {

        // console.log(`Received message : ${msg}`)
        appendToChatMessageList({
            text: msg,
            to: 2,
            from: 1,
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

        socket.on('receive-message', receiveMessage)

        return () => {
            socket.off("connect", onConnect)
            socket.off("disconnect", onDisconnect)

            socket.off("receive-message", receiveMessage)

            // socket.disconnect()
        }

    }, [])

    return (
        <main className="h-screen w-screen flex flex-row p-5 bg-slate-300">

            <div className="h-full w-16 bg-gray-100 flex flex-col gap-4 py-4 items-center justify-between">
                <div className="flex flex-col gap-6 py-2">
                    <button className="">
                        <BsIncognito
                            className="w-6 h-6"
                        />
                    </button>
                    <button className="">
                        <BsChatLeftText
                            className="w-6 h-6"
                        />
                    </button>
                </div>

                <div className="flex flex-col gap-6 py-2">
                    <button className="">
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

                <div className="flex flex-row gap-2 px-4 py-2">
                    <span
                    >Room No&nbsp;</span>
                    <input
                        type="text"
                        className="border-gray-300 outline-none border-2 px-1"
                    />
                </div>
                <div className="flex flex-row gap-2 px-4 py-2">
                    <span
                    >Password</span>
                    <input
                        type="password"
                        className="border-gray-300 outline-none border-2 px-1"
                    />
                </div>
                <div className="flex flex-row gap-2 px-4 py-2">
                    <button className="text-gray-800 bg-green-200 p-2 rounded-md">
                        <span
                        >Join</span>
                    </button>
                    <button className="text-gray-800 bg-green-200 p-2 rounded-md">
                        <span
                        >Create</span>
                    </button>
                </div>
            </div>
            <ChatArea chatMessageList={chatMessageList} sendMessage={sendMessage} />
            {
                // <div className="">
                //     <p>Status : {isConnected ? "connected" : "disconnected"} </p>
                //     <p>Transport : {transportName !== null ? transportName : "N/A"} </p>
                // </div>
            }

        </main>


    )
}

