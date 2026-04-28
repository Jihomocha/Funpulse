'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { use } from 'react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function EditTourPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [form, setForm] = useState({
    title: '',
    duration: '',
    description: '',
    badge_color: 'blue',
    price: '',
    highlights: '',
    inclusions: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchTour = async () => {
      const { data } = await supabase
        .from('tours')
        .select('*')
        .eq('id', id)
        .single()
      if (data) setForm({
        title: data.title ?? '',
        duration: data.duration ?? '',
        description: data.description ?? '',
        badge_color: data.badge_color ?? 'blue',
        price: data.price ?? '',
        highlights: data.highlights ?? '',
        inclusions: data.inclusions ?? '',
      })
    }
    fetchTour()
  }, [id])

  const handleSubmit = async () => {
    setLoading(true)
    const { error } = await supabase
      .from('tours')
      .update(form)
      .eq('id', id)
    setLoading(false)
    if (!error) router.push('/admin')
    else alert('Error: ' + error.message)
  }

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Edit Tour</h1>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tour Name</label>
            <input
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
            <input
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
              value={form.duration}
              onChange={e => setForm({ ...form, duration: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
              rows={3}
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="e.g. From $299 per person"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Highlights</label>
            <input
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="e.g. Seoul, Gyeongju, Busan"
              value={form.highlights}
              onChange={e => setForm({ ...form, highlights: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Inclusions</label>
            <textarea
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
              rows={2}
              placeholder="e.g. Private guide, Hotel transfers, Breakfast"
              value={form.inclusions}
              onChange={e => setForm({ ...form, inclusions: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Badge Color</label>
            <select
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
              value={form.badge_color}
              onChange={e => setForm({ ...form, badge_color: e.target.value })}
            >
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="purple">Purple</option>
              <option value="orange">Orange</option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-700 disabled:opacity-50 font-medium transition"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </main>
  )
}
