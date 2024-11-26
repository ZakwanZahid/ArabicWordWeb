export default function Header() {
  return (
    <header className="flex justify-between items-center py-4 px-8 bg-white shadow-md">
      <div className="text-xl font-bold text-blue-600">Arabic Word Web</div>
      <nav className="flex space-x-6 text-gray-600">
        <a href="#features" className="hover:text-blue-600">Features</a>

        <a href="#pages" className="hover:text-blue-600">Blog</a>
        <a href="#support" className="hover:text-blue-600">About</a>
      </nav>
      <div>
        <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
          Sign In
        </button>
      </div>
    </header>
  );
}
