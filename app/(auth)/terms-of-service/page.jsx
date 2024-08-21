"use client"

import { useState, useEffect } from 'react'

const TermsOfServicePage = () => {
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/static/terms-of-service`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch terms of service')
                }
                return res.json()
            })
            .then(data => {
                setContent(data.content)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setError('Failed to load terms of service. Please try again later.')
                setLoading(false)
            })
    }, [])

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
                <p>Loading...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
                <p className="text-red-500">{error}</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
            <div dangerouslySetInnerHTML={{ __html: content }} className="prose max-w-none" />
        </div>
    )
}

export default TermsOfServicePage