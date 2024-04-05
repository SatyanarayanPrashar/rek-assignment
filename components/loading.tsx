"use client"

export const LoadingBox = () => {
    return (
        <div className="flex flex-col items-center">
            <div>Loading...</div>
            <div className="w-[77px] h-2 border-[1px] rounded-md overflow-hidden">
              <div className="h-full bg-[#4D4D4D] animate-loading"></div>
            </div>
        </div>
    )
}