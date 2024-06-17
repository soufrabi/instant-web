"use client"

import React from "react"
import { socket } from "@/socket"
import { MediaContextProvider, Media } from "@/app/components/media"
import { LeftSmallSideBar } from "./components/LeftSmallSideBar";
import { AppMode } from "./components/enums";
import type { ChatMessageData } from "./components/ChatArea"
import { ChatArea } from "./components/ChatArea";
import { AnonChatSideBar } from "./components/AnonChatSideBar";
import { NoAccessScreen } from "./components/NoAccessScreen";
import { SettingsSideBar } from "./components/SettingsSideBar";
import { IncognitoChatLobby } from "./components/IncognitoChatLobby";
import { TopNavBar } from "./components/TopNavBar";
import { BottomNavBar } from "./components/BottomNavBar";



export default function Home() {
    // const [isConnected, setIsConnected] = React.useState<boolean>(false)
    // const [transportName, setTransportName] = React.useState<any | null>(null)
    const [chatMessageList, setChatMessageList] = React.useState<Array<ChatMessageData>>([])
    const [appMode, setAppMode] = React.useState<AppMode>(AppMode.INCOGNITO_CHAT)
    const [currentRoomId, setCurrentRoomId] = React.useState<string>("")
    const [isInRoom, setIsInRoom] = React.useState<boolean>(false)
    const [anonId, setAnonId] = React.useState<string | null>(null)
    const [isDarkModeEnabled, setIsDarkModeEnabled] = React.useState<boolean | null>(null)

    const enableDarkMode = (dark: boolean) => {
        if (dark) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }

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

    React.useEffect(() => {
        document.body.style.overflow = "hidden"
    }, [])

    return (
        <MediaContextProvider>
            <main className="h-[100svh] w-screen flex flex-col md:flex-row md:p-2 lg:p-4 bg-slate-300">

                <Media
                    greaterThanOrEqual="md"
                    className="hidden md:h-full md:w-full md:flex md:flex-row"
                >
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
                        appMode === AppMode.SETTINGS
                        && <SettingsSideBar
                            isDarkModeEnabled={isDarkModeEnabled}
                            setIsDarkModeEnabled={setIsDarkModeEnabled}
                            enableDarkMode={enableDarkMode}
                        />
                    }
                    {
                        isInRoom && anonId !== null
                            ? <ChatArea myUserId={anonId} chatMessageList={chatMessageList} sendMessage={sendMessage} maxLineSize={80} mobileDisplay={false} />
                            : <NoAccessScreen />
                    }
                </Media>

                <Media
                    lessThan="md"
                    className="h-full w-full flex flex-col md:hidden"
                >
                    <TopNavBar
                        showLeaveRoomButton={appMode === AppMode.INCOGNITO_CHAT && (isInRoom && anonId != null)}
                        leaveRoom={leaveRoom}
                    />
                    {
                        appMode === AppMode.INCOGNITO_CHAT && (isInRoom && anonId != null) &&
                        <ChatArea myUserId={anonId} chatMessageList={chatMessageList} sendMessage={sendMessage} maxLineSize={30} mobileDisplay={true} />
                    }
                    {
                        appMode === AppMode.INCOGNITO_CHAT && !(isInRoom && anonId != null) &&
                        <IncognitoChatLobby
                            currentRoomId={currentRoomId}
                            isInRoom={isInRoom}
                            joinRoom={joinRoom}
                            leaveRoom={leaveRoom}

                        />
                    }
                    {
                        appMode !== AppMode.INCOGNITO_CHAT && <NoAccessScreen />
                    }
                    <BottomNavBar
                        appMode={appMode}
                        setAppMode={setAppMode}
                    />
                </Media>


            </main >
        </MediaContextProvider>


    )
}

