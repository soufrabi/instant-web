"use client"
import Image from "next/image"
import { useMemo } from "react"
import { useSession } from "next-auth/react"

type DetailProps = {
    fieldKey: string,
    fieldValue: string,
}
function Detail({ fieldKey, fieldValue }: DetailProps) {
    return (
        <div className="bg-white flex flex-col gap-2 p-4">
            <div
                className="text-green-700"
            >{fieldKey}</div>
            <div
            >{fieldValue}</div>
        </div>
    )
}

export function ProfileComponent() {
    const session = useSession()
    const userImageUrl = useMemo(() => {
        return session.data?.user?.image
    }, [session])
    const userFullName = useMemo(() => {
        return session.data?.user?.name
    }, [session])
    const userEmail = useMemo(() => {
        return session.data?.user?.email
    }, [session])

    return (
        <div
            className="w-full h-full flex flex-col bg-gray-200 overflow-y-clip"
        >
            <div className="hidden md:block md:px-6 md:py-4 bg-white">
                <span
                    className="font-bold text-xl"
                >Profile</span>

            </div>
            <hr className="h-0 w-full border-b-2 border-b-gray-100/80" />
            {userImageUrl &&
                <div className="mx-auto my-4 p-4 flex flex-col ">
                    <Image
                        src={userImageUrl}
                        alt={"Profile Photo"}
                        width={192}
                        height={192}
                        className="rounded-full"

                    />
                </div>
            }
            <Detail
                fieldKey="Name"
                fieldValue={userFullName || "."}
            />
            <Detail
                fieldKey="Email"
                fieldValue={userEmail || "."}
            />
        </div>
    )

}
