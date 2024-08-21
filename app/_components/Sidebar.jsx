"use client";
import { FaHome } from "react-icons/fa";
import { TbLayoutDashboard } from "react-icons/tb";
import { HiOutlineInboxIn } from "react-icons/hi";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { CgFileDocument } from "react-icons/cg";
import { MdOutlineSettings } from "react-icons/md";
import { MdSupportAgent } from "react-icons/md";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import Image from "next/image";
import { HiExternalLink } from "react-icons/hi";
import { PiPackageBold } from "react-icons/pi";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const tabs = [
    {
        active_icon: <FaHome className="text-2xl text-white" />,
        default_icon: <FaHome className="text-2xl text-gray-700" />,
        name: "Home",
        path: "/" // Home path
    },
    {
        active_icon: <TbLayoutDashboard className="text-2xl text-white" />,
        default_icon: <TbLayoutDashboard className="text-2xl text-gray-700" />,
        name: "Manage Stock Room",
        path: "/manage" // Manage Stock Room path
    },
    {
        active_icon: <PiPackageBold className="text-2xl text-white" />,
        default_icon: <PiPackageBold className="text-2xl text-gray-700" />,
        name: "Order",
        path: "/order" // Order path
    },
    {
        active_icon: <HiOutlineInboxIn className="text-2xl text-white" />,
        default_icon: <HiOutlineInboxIn className="text-2xl text-gray-700" />,
        name: "Receive",
        path: "/receive" // Receive path
    },
    {
        active_icon: <MdOutlineCurrencyExchange className="text-2xl text-white" />,
        default_icon: <MdOutlineCurrencyExchange className="text-2xl text-gray-700" />,
        name: "Dispense to Bill",
        path: "/dispense-to-bill" // Dispense to Bill path
    },
    {
        active_icon: <HiExternalLink className="text-2xl text-white" />,
        default_icon: <HiExternalLink className="text-2xl text-gray-700" />,
        name: "Dispense",
        path: "/dispense" // Dispense path
    },
    {
        active_icon: <CgFileDocument className="text-2xl text-white" />,
        default_icon: <CgFileDocument className="text-2xl text-gray-700" />,
        name: "Reports",
        path: "/reports" // Reports path
    },
    {
        active_icon: <MdOutlineSettings className="text-2xl text-white" />,
        default_icon: <MdOutlineSettings className="text-2xl text-gray-700" />,
        name: "Settings",
        path: "/settings" // Settings path
    },
    {
        active_icon: <MdSupportAgent className="text-2xl text-white" />,
        default_icon: <MdSupportAgent className="text-2xl text-gray-700" />,
        name: "Technical Support",
        path: "/technical-support" // Technical Support path
    }
];

const Sidebar = () => {
    const pathname = usePathname(); // Get the current pathname
    const [isMouseOver, setIsMouseOver] = useState(false);
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleTabClick = (path) => {
        router.push(path); // Navigate to the corresponding path
    };

    useEffect(() => {
        const sidebar = document.getElementById("sidebar");
        if (sidebar) {
            sidebar.addEventListener("mouseover", () => {
                setIsMouseOver(true);
            });
            sidebar.addEventListener("mouseout", () => {
                setIsMouseOver(false);
            });
        }
    }, []);

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <div id="sidebar" className="h-full shadow-xl w-[5vw] hover:w-[15vw] transition-all">
            <div className="flex-col justify-center items-center h-full">
                {/* sidebar brand */}
                <div className="text-center flex justify-center items-center py-3">
                    <Image src="/mmd_logo.svg" width={40} height={40} alt="logo" />
                </div>
                {/* sidebar tabs */}
                <div className="flex-col justify-between items-center px-2">
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            onClick={() => handleTabClick(tab.path)}
                            className={cn(
                                `text-lg flex w-full items-center rounded-md py-2 my-2 gap-2`,
                                pathname === tab.path ? "bg-mmsecondary" : "hover:bg-purple-100",
                                isMouseOver ? "justify-start ps-2" : "justify-center"
                            )}
                        >
                            {pathname === tab.path ? tab.active_icon : tab.default_icon}
                            {isMouseOver && (
                                <div
                                    className={cn(
                                        `text-xs`,
                                        isMouseOver ? "block scale-100" : "hidden scale-0 ",
                                        "transition-all duration-1000",
                                        pathname === tab.path ? "text-white" : "text-gray-700"
                                    )}
                                >
                                    {tab.name}
                                </div>
                            )}
                        </button>
                    ))}
                    <br />
                    <br />
                    {/* profile icon */}
                    <button
                        onClick={handleLogout}
                        className={cn(
                            `text-lg flex w-full items-center rounded-md py-2 my-2 gap-2`,
                            isMouseOver ? "justify-start ps-2" : "justify-center"
                        )}
                    >
                        <FaRegUserCircle className="text-2xl text-gray-600" />
                        <div
                            className={cn(
                                `text-xs flex-col justify-start items-start`,
                                isMouseOver ? "scale-100 " : "hidden scale-0 "
                            )}
                        >
                            <p className="text-sm font-bold text-start">
                                {user?.username || 'Profile Name'}
                            </p>
                            <p className="text-xs">
                                Log out
                            </p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
