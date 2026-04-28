export default function Home() {
  return (
    <main>
      <section className="bg-gray-900 text-white py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold leading-tight">
            Discover Korea with Travel Pulse
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-xl">
            Experience the best of Korea with our curated tours and unforgettable adventures.
          </p>
          <div className="mt-10 flex gap-4">
            <a href="/tours" className="bg-white text-gray-900 px-6 py-3 rounded-1g font-semibold hover:bg-gray-100">
              Explore Our Tours
            </a>
            <a href="/contact" className="border border-white text-white px-6 py-3 rounded-1g font-semibold hover:bg-white hover:text-gray-900">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}