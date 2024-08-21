
"use client"

import { useState, useEffect } from 'react'

const PrivacyPolicyPage = () => {
  const [content, setContent] = useState('')

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/static/privacy-policy`)
      .then(res => res.json())
      .then(data => setContent(data.content))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

export default PrivacyPolicyPage