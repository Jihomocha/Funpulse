export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <span className="text-xl font-bold text-gray-900">
          Korea Tours - Fun Pulse
        </span>
        <div className="flex gap-6">
          <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
          <a href="/tours" className="text-gray-600 hover:text-gray-900">Tours</a>
          <a href="/contact" className="text-gray-600 hover:text-gray-900">Contact</a>
        </div>
      </div>
    </nav>
  )
}