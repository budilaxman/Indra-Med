"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ui/ProtectedRoute";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default function Dashboard() {
    const { user, logout } = useAuth(); // Adjust based on your AuthContext
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logout(); // Implement your logout functionality
            router.push('/login'); // Redirect to login page after logout
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    if (!user) {
        return <ProtectedRoute />; // Redirect to login if no user is authenticated
    }

    return (
        <div className="h-full w-full flex flex-col">
            {/* Header Section */}
            <div className="px-4 w-full">
                <div className="flex justify-between items-center w-full border-b py-3">
                   
                    <div className="w-1/2">
                        <Input type="text" placeholder="Search Here" className="" />
                    </div>
                    <div className="w-1/4">
                        <Select>
                            <SelectTrigger className="">
                                <SelectValue placeholder="Location" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Location</SelectLabel>
                                    <SelectItem value="Clinic1">Clinic 1</SelectItem>
                                    <SelectItem value="Clinic2">Clinic 2</SelectItem>
                                </SelectGroup>
                                <SelectGroup>
                                    <SelectLabel>Supplier</SelectLabel>
                                    <SelectItem value="Supplier1">Supplier 1</SelectItem>
                                    <SelectItem value="Supplier2">Supplier 2</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex justify-between items-center space-x-4 px-2 py-1 rounded">
                        <div className="rounded-full border border-solid border-gray-300 hover:border-mmsecondary transition-all p-1">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>Profile</DropdownMenuItem>
                                        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="flex-col justify-center">
                            <p className="text-xs text-mmsecondary font-bold">{user.username}</p>
                            <p className="text-[10px]">Last login: {new Date().toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="w-full p-10">
                <h1 className="text-1xl font-bold">Manage Stock Room / <span className="text-red-600">Manage Orders</span></h1>
                <div className="mt-16 flex gap-10 p-40">
                    <button className="bg-purple-100 text-purple-700 p-6 rounded-lg w-1/4 text-center">
                        Place Order
                    </button>
                    <button className="bg-blue-100 text-blue-700 p-6 rounded-lg w-1/4 text-center">
                        Create Order
                    </button>
                    <button className="bg-red-100 text-red-700 p-6 rounded-lg w-1/4 text-center">
                        Open Orders
                    </button>
                    <button className="bg-green-100 text-green-700 p-6 rounded-lg w-1/4 text-center">
                        Completed Orders
                    </button>
                </div>

               
            </div>
        </div>
    );
}
