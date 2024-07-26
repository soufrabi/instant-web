import React from "react"
import clsx from "clsx"
import { nanoid } from "nanoid"
import { IoMdSend } from "react-icons/io"
import Markdown from "react-markdown"
import { useDeviceContext } from "../providers/DeviceProvider"
import { MAX_MESSAGE_LENGTH } from "./constants"

export type ChatMessageData = {
    text: string,
    from: string,
    to: string,
}

export type ChatAreaProps = {
    myUserId: string,
    chatMessageList: Array<ChatMessageData>,
    sendMessage: (chatMessageText: string) => void,
    maxLineSize: number,
    mobileDisplay: boolean,
}

export function ChatArea({ myUserId, chatMessageList, sendMessage, maxLineSize, mobileDisplay }: ChatAreaProps) {
    const { isTouchDevice } = useDeviceContext()
    const chatListBottomRef = React.useRef<HTMLDivElement>(null)
    const [composeMessageTextAreaValue, setComposeMessageTextAreaValue] = React.useState<string>("")
    const handleComposeMessageTextAreaValueChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
        // console.log(composeMessageTextAreaValue)
        setComposeMessageTextAreaValue(ev.target.value)
    }

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
        if (!isTouchDevice && ev.key === "Enter" && !ev.shiftKey) {
            ev.preventDefault()
            handleSendButtonClick()
        }
    }

    const modifyTextBeforeDisplay = (text: string): string => {
        const whiteSpaceFollowedByNewLineRegex: RegExp = /\s*([\r\n]+)/g
        const lines: string[] = []
        let currentLine: string = ""

        for (const ch of text) {
            // console.log(ch)
            if (ch === '\n' || ch === '\r' || currentLine.length + 1 > maxLineSize) {
                lines.push(currentLine)
                currentLine = ""
                currentLine += ch
            } else {
                currentLine += ch

            }
        }

        if (currentLine.length > 0) {
            lines.push(currentLine)
        }

        // console.log("Lines : ", lines)

        text = lines.join('\n')
        // console.log("New Text before Whitespace Fix: ", text)
        text = text.replace(whiteSpaceFollowedByNewLineRegex, '  \n')
        // console.log("New Text after Whitespace Fix: ", text)
        return text
    }

    React.useEffect(() => {
        scrollToBottomOfChatList()
    }, [chatMessageList])

    return (
        <div
            className={clsx("w-full bg-sky-50 flex flex-col h-full",
                { "max-h-[calc(100svh-7.5rem)]": mobileDisplay }
            )}
        >
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
                                    {modifyTextBeforeDisplay(chatMessage.text)}
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
                        maxLength={MAX_MESSAGE_LENGTH}
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

