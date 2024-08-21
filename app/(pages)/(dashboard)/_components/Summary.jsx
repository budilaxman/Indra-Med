"use client"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BsThreeDotsVertical } from "react-icons/bs";

import { HiCircleStack } from "react-icons/hi2";


const Summary = () => {
    return (
        <div className="w-full px-3 py-2">
            <div className="flex justify-between items-center">
                {/* Heading  */}
                <div className="">
                    <p className="text-bold text-gray-600 text-sm font-bold">Inventory Summary</p>
                </div>
                {/* options */}
                <div className="">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="rounded-full p-2 hover:bg-gray-100">
                                <BsThreeDotsVertical />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    Inventory List
                                    {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    Point Of Sales
                                    {/* <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut> */}
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <br />
            <div className="flex-col justify-center items-center w-full">
                <div className="flex justify-center items-end">
                    <div className=" p-4 bg-white rounded-full w-fit ">
                        < HiCircleStack className="text-xl " />
                    </div>
                </div>
                <br />
                <div className="text-center">
                    <p className="font-bold">$ 12,258</p>
                    <p className="text-gray-800 text-sm">Total Value</p>
                </div>
            </div>
        </div>
    )
}

export default Summary