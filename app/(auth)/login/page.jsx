"use client"

import React, { useState, useCallback } from 'react'
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/AuthContext"

// LoginPage component
const LoginPage = () => {
  // State for form inputs and error message
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  // Get auth context and router
  const auth = useAuth()
  const router = useRouter()

  // Handle form submission
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    setError("")

    if (!auth || !auth.login) {
      setError("Authentication service unavailable")
      return
    }

    const success = await auth.login(username, password)
    if (success) {
      router.push('/')
    } else {
      setError("Invalid credentials")
    }
  }, [auth, username, password, router])

  // If auth context is not available, show error
  if (!auth) {
    return <div className="text-center text-red-500">Error: Authentication service unavailable</div>
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="shadow-2xl w-full max-w-md flex-col justify-center items-center rounded-md py-9 px-4">
        <div className="flex justify-center items-center">
          <Image src="/mmd_logo.png" width={70} height={70} alt="Indramed logo" />
        </div>
        <div className="text-center text-xl font-bold text-mmsecondary">
          <h1>Indramed</h1>
          <h2>Inventory Management</h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <Input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-mmsecondary focus:border-mmsecondary focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-mmsecondary focus:border-mmsecondary focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-mmsecondary hover:bg-mmsecondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mmsecondary"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm">
            <Link href="/forgot-password" className="font-medium text-mmsecondary hover:text-mmsecondary-dark">
              Forgot your password?
            </Link>
          </div>
        </div>

        <div className="mt-6 flex justify-center items-center space-x-4 text-sm">
          <Link href="/privacy-policy" className="text-mmprimary hover:text-mmprimary-dark">
            Privacy Statement
          </Link>
          <span className="text-mmprimary">|</span>
          <Link href="/terms-of-service" className="text-mmprimary hover:text-mmprimary-dark">
            Terms of Service
          </Link>
          <span className="text-mmprimary">|</span>
          <Link href="/contact-support" className="text-mmprimary hover:text-mmprimary-dark">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage