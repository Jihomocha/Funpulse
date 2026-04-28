import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function ToursPage() {
  const { data: tours, error } = await supabase
    .from('tours')
    .select('*')

  if (error) {
    return <p>Failed to load tours.</p>
  }

  return (
    <main className="bg-gray-50 min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900">Our Tours</h1>
        <p className="mt-4 text-lg text-gray-600">
          Handpicked experiences across Korea for Indian travelers.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-6">
          {tours?.map((tour) => (
            <div key={tour.title} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {tour.duration}
                  </span>
                  <h2 className="mt-3 text-2xl font-bold text-gray-900">
                    {tour.title}
                  </h2>
                  <p className="mt-2 text-gray-600">{tour.description}</p>
                </div>
                <p className="text-lg font-semibold text-gray-900">Price on request</p>
              </div>
              <a href="/contact" className="mt-6 block text-center bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-700">
                Get a Quote
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}