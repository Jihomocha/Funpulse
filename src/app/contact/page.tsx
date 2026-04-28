'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      guests: (form.elements.namedItem('guests') as HTMLInputElement).value,
      tour: (form.elements.namedItem('tour') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    setLoading(false)
    setSent(true)
  }

  if (sent) {
    return (
      <main className="bg-gray-50 min-h-screen py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900">Thank you!</h1>
          <p className="mt-4 text-lg text-gray-600">
            We have received your enquiry and will get back to you soon.
          </p>
          <a href="/" className="mt-8 inline-block bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-700">
            Back to Home
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-gray-50 min-h-screen py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
        <p className="mt-4 text-lg text-gray-600">
          Tell us about your group and we will craft the perfect Korea experience for you.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 bg-white rounded-xl p-8 shadow-sm">
          <div className="flex flex-col gap-6">

            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input name="name" type="text" required placeholder="Your name" className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input name="email" type="email" required placeholder="your@email.com" className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Number of Guests</label>
              <input name="guests" type="number" required placeholder="Minimum 6 guests" min="6" className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Tour Preference</label>
              <select name="tour" className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900">
                <option>5 Nights 6 Days — Classic Korea</option>
                <option>6 Nights 7 Days — Classic Korea Plus</option>
                <option>7 Nights 8 Days — Extended Korea</option>
                <option>8 Nights 9 Days — Grand Korea Tour</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea name="message" rows={4} placeholder="Tell us your travel dates, special requests, or any questions..." className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900" />
            </div>

            <button type="submit" disabled={loading} className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 disabled:opacity-50">
              {loading ? 'Sending...' : 'Send Enquiry'}
            </button>

          </div>
        </form>

        <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <p className="text-gray-700 font-medium">Prefer to chat directly?</p>
          <a href="https://wa.me/821012345678" className="mt-3 inline-block bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600">
            Chat on WhatsApp
          </a>
        </div>

      </div>
    </main>
  )
}