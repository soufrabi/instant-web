"use client"
import Image from "next/image"
import { formatDate } from "../utils/date"

type UserOrGroup = {
    name: string,
    lastMessage: string,
    lastMessageTime: Date,
}

const usersOrGroupsListOriginal: Array<UserOrGroup> = [
    {
        name: "Arun",
        lastMessage: "Hi! Wanna meet",
        lastMessageTime: new Date(),
    },
    {
        name: "Sherry",
        lastMessage: "Hi! Wanna meet",
        lastMessageTime: new Date(1995, 6, 2),
    },
]

const usersOrGroupsList = Array.from({ length: 20 }, () => usersOrGroupsListOriginal[0])


export function ChatsComponent() {
    return (
        <div className="w-full md:min-w-96 md:w-[calc(30vw)] h-full flex flex-col bg-white overflow-y-clip">
            <div className="hidden md:block md:px-6 md:py-4">
                <span
                    className="font-bold text-xl"
                >Chats</span>

            </div>
            <div className="flex flex-col overflow-y-auto">
                {
                    usersOrGroupsList.map((el) => (
                        <div
                            className="w-full flex flex-row gap-3 py-2 px-4 hover:backdrop-brightness-95 border-gray-100 border-b-2"
                        >
                            <Image
                                src={"/blank-avatar-64x64.jpeg"}
                                alt=""
                                width={50}
                                height={50}
                                className="border-gray-200 border-2 rounded-full grow-0 shrink-0 bg-cover "
                            />
                            <div className="w-full flex flex-col">
                                <div className="flex flex-row justify-between">
                                    <div>
                                        <span
                                            className=""
                                        >+91 987654321</span>
                                    </div>
                                    <div>
                                        <span
                                            className="text-sm"
                                        >{formatDate(el.lastMessageTime)}</span>
                                    </div>
                                </div>
                                <div>
                                    <span
                                        className="text-sm"
                                    >{el.lastMessage}</span>
                                </div>

                            </div>

                        </div>
                    ))
                }
            </div>
        </div>

    )
}
