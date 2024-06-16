import {IoIosLock} from "react-icons/io"

export function NoAccessScreen() {
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
                        className="text-md sm:text-xl md:text-2xl lg:text-3xl text-white select-none"
                    >Please join a room to send messages</span>
                </div>
            </div>
        </div>
    )
}

