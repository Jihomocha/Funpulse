import Image from 'next/image'

export default function Home() {
  return (
    <main className="bg-gray-100 min-h-screen">

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-sm font-semibold tracking-widest text-red-700 uppercase">
            Private Tours · Korea
          </p>
          <h1 className="mt-4 text-6xl font-bold text-gray-900 leading-tight">
            Korea,<br />Your Way.
          </h1>
          <p className="mt-6 text-xl text-gray-600 leading-relaxed">
            Handcrafted private tours across Seoul, Gyeongju, and Busan.
            Designed exclusively for groups who want to experience Korea
            beyond the guidebook.
          </p>
          <div className="mt-10 flex gap-4">
            <a href="/tours" className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-700">
              View Tours
            </a>
            <a href="/contact" className="border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-900 hover:text-white">
              Get a Quote
            </a>
          </div>
          <p className="mt-8 text-sm text-gray-500">
            Minimum 6 guests · Private groups only · Custom itineraries
          </p>
        </div>
        <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="/images/hero.jpeg"
            alt="Korea Tour"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Photo Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-3 gap-4">
          <div className="relative h-64 rounded-xl overflow-hidden">
            <Image src="/images/tour1.jpeg" alt="Gyeongju Tour" fill className="object-cover hover:scale-105 transition-transform duration-300" />
          </div>
          <div className="relative h-64 rounded-xl overflow-hidden">
            <Image src="/images/tour2.jpeg" alt="Busan Tour" fill className="object-cover hover:scale-105 transition-transform duration-300" />
          </div>
          <div className="relative h-64 rounded-xl overflow-hidden">
            <Image src="/images/tour3.jpeg" alt="Korea Experience" fill className="object-cover hover:scale-105 transition-transform duration-300" />
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900">Why travel with us?</h2>
          <div className="mt-12 grid grid-cols-3 gap-8">
            <div>
              <p className="text-3xl">🗺️</p>
              <h3 className="mt-4 text-xl font-bold text-gray-900">Local Expertise</h3>
              <p className="mt-2 text-gray-600">Born and raised in Korea, we know every hidden gem and local secret.</p>
            </div>
            <div>
              <p className="text-3xl">👨‍👩‍👧‍👦</p>
              <h3 className="mt-4 text-xl font-bold text-gray-900">Private Groups Only</h3>
              <p className="mt-2 text-gray-600">No strangers, no rush. Your group, your pace, your Korea.</p>
            </div>
            <div>
              <p className="text-3xl">✨</p>
              <h3 className="mt-4 text-xl font-bold text-gray-900">Fully Customized</h3>
              <p className="mt-2 text-gray-600">Every itinerary is built around what your group actually wants to do.</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}