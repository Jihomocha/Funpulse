'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Tour = {
  id: number
  title: string
  duration: string
  description: string
  badge_color: string
  order: number
  price: string
  highlights: string
  inclusions: string
}

const badgeColors: Record<string, string> = {
  blue: 'text-blue-600 bg-blue-50',
  green: 'text-green-600 bg-green-50',
  purple: 'text-purple-600 bg-purple-50',
  orange: 'text-orange-600 bg-orange-50',
}

function TourPreview({ tour }: { tour: Tour }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        <span className={`text-xs font-medium px-3 py-1 rounded-full ${badgeColors[tour.badge_color] || badgeColors.blue}`}>
          {tour.duration}
        </span>
        <h2 className="mt-3 text-xl font-bold text-gray-900">{tour.title || 'Tour Name'}</h2>
        <p className="mt-1 text-gray-500 text-sm">{tour.description || 'Tour description'}</p>
      </div>
      <div className="border-t border-gray-100 px-6 py-4 space-y-3">
        {tour.price && (
          <div className="flex items-start gap-2">
            <span className="text-lg">💰</span>
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Price</p>
              <p className="text-sm text-gray-700">{tour.price}</p>
            </div>
          </div>
        )}
        {tour.highlights && (
          <div className="flex items-start gap-2">
            <span className="text-lg">📍</span>
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Highlights</p>
              <p className="text-sm text-gray-700">{tour.highlights}</p>
            </div>
          </div>
        )}
        {tour.inclusions && (
          <div className="flex items-start gap-2">
            <span className="text-lg">✅</span>
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Inclusions</p>
              <p className="text-sm text-gray-700">{tour.inclusions}</p>
            </div>
          </div>
        )}
      </div>
      <div className="px-6 pb-6">
        <div className="w-full text-center bg-gray-900 text-white py-2 rounded-lg text-sm">
          Get a Quote
        </div>
      </div>
    </div>
  )
}

function SortableRow({ tour, onDelete }: { tour: Tour; onDelete: (id: number) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: tour.id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? 'none' : transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : 'auto',
  }

  return (
    <div ref={setNodeRef} style={style} className="bg-white border border-gray-200 rounded-2xl p-5 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-4">
        <button
          {...attributes}
          {...listeners}
          className="text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing text-xl select-none"
        >
          ⠿
        </button>
        <div>
          <h2 className="font-bold text-lg text-gray-900">{tour.title}</h2>
          <p className="text-gray-500 text-sm">{tour.duration}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <Link href={`/admin/tours/${tour.id}/edit`}
          className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
          Edit
        </Link>
        <button onClick={() => onDelete(tour.id)}
          className="px-4 py-2 text-sm font-medium text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition">
          Delete
        </button>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [tours, setTours] = useState<Tour[]>([])
  const [preview, setPreview] = useState<Tour | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 3 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    const fetchTours = async () => {
      const { data } = await supabase
        .from('tours')
        .select('*')
        .order('order', { ascending: true })
      if (data) setTours(data)
    }
    fetchTours()
  }, [])

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = tours.findIndex(t => t.id === active.id)
    const newIndex = tours.findIndex(t => t.id === over.id)
    const newTours = arrayMove(tours, oldIndex, newIndex)

    setTours(newTours)

    // Save order to DB
    await Promise.all(
      newTours.map((tour, index) =>
        supabase.from('tours').update({ order: index }).eq('id', tour.id)
      )
    )
  }

  const deleteTour = async (id: number) => {
    if (!confirm('Are you sure you want to delete this tour?')) return
    await supabase.from('tours').delete().eq('id', id)
    setTours(tours.filter(t => t.id !== id))
    if (preview?.id === id) setPreview(null)
  }

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Tour Management</h1>
            <p className="text-gray-500 mt-1">{tours.length} tours available</p>
          </div>
          <Link href="/admin/tours/new"
            className="bg-gray-900 text-white px-5 py-3 rounded-xl hover:bg-gray-700 font-medium transition">
            + Add New Tour
          </Link>
        </div>

        <div className="flex gap-8">
          <div className="flex-1 space-y-4">
            <p className="text-sm text-gray-400">Click ⠿ to reorder · Click a tour to preview</p>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={tours.map(t => t.id)} strategy={verticalListSortingStrategy}>
                {tours.map(tour => (
                  <div key={tour.id} onClick={() => setPreview(tour)}>
                    <SortableRow tour={tour} onDelete={deleteTour} />
                  </div>
                ))}
              </SortableContext>
            </DndContext>
          </div>

          <div className="w-80">
            <p className="text-sm text-gray-400 mb-4">Live Preview</p>
            {preview ? (
              <TourPreview tour={preview} />
            ) : (
              <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center text-gray-400">
                <p className="text-4xl mb-3">👆</p>
                <p className="text-sm">Click a tour to preview</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
