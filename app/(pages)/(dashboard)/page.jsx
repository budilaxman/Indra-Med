"use client";
import ProtectedRoute from "@/components/ui/ProtectedRoute"
import { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Statistics from "./_components/Statistics"
import Summary from "./_components/Summary"
import Tasks from "./_components/Tasks"
import { Stockvalue } from "./_components/StockValue"

const DashboardPage = () => {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      // fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/overview`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      const data = await response.json();
      setDashboardData(data);
    } catch (err) {
      setError('Failed to load dashboard data. Please try again later.');
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  // if (!user || !dashboardData) {
  //   return null;
  // }

  return (
    <div className="h-full w-full flex">
      <div className="px-4 w-full">
        <div className="flex justify-between items-center w-full border-b py-3">
          <h1 className="text-2xl text-mmprimary font-bold">Dashboard</h1>
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
          <div className="flex justify-between items-center space-x-4 px-2 py-1 rounded" >
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
              <p className="text-[10px] ">Last login: {new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
        <br />
        <div className="w-full h-[70vh] overflow-auto scrollbar px-2">
          <div className="">
            <h1 className="text-xl text-mmsecondary font-bold">
              Inventory Overview
            </h1>
          </div>
          <br />
          <div className="">
            <div className="grid grid-cols-4 gap-5">
              <div className="col-span-2 border rounded-md bg-[#DFD4DC]">
                {/* <Statistics data={dashboardData.pieChartData} /> */}
                <Statistics />
              </div>
              <div className="col-span-1 border rounded-md bg-[#F7CE98]">
                {/* <Summary data={dashboardData.inventorySummary} /> */}
                <Summary />
              </div>
              <div className="col-span-1 border rounded-md bg-[#FACDD2]">
                {/* <Tasks data={dashboardData.inventorySummary} /> */}
                <Tasks />
              </div>
            </div>
          </div>
          <div>
            <br />
            <br />
            <Tabs defaultValue="stockvalue" className="w-full">
              <TabsList className="grid w-3/4 grid-cols-4 bg-white shadow-none">
                <TabsTrigger value="stockvalue" className="text-start" >
                  <span className="text-mmprimary text-lg font-bold">
                    Stock Value
                  </span>
                </TabsTrigger>
                <TabsTrigger value="consumptions">
                  <span className="text-mmsecondary text-lg font-bold">
                    Consumptions Trends
                  </span>
                </TabsTrigger>
                <TabsTrigger value="purchase_orders" >
                  <span className="text-mmsecondary text-lg font-bold">
                    Purchase Orders
                  </span>
                </TabsTrigger>
                <TabsTrigger value="purchase_forecast">
                  <span className="text-mmsecondary text-lg font-bold">
                    Purchase Forecast
                  </span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="stockvalue" className="justify-start">
                <Stockvalue />
              </TabsContent>
              <TabsContent value="consumptions">
                <Stockvalue />
              </TabsContent>
              <TabsContent value="purchase_orders">
                <p>Purchase Orders</p>
              </TabsContent>
              <TabsContent value="purchase_forecast">
                <p>Purchase Forecast</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProtectedRoute(DashboardPage)