export default function ProfileCard() {
  return (
    // changed bg-gray-600 to white for a cleaner "card" look
    // added 'max-w-sm' so it doesn't stretch across the whole screen
    <main className="bg-white shadow-xl p-6 rounded-2xl max-w-sm mx-auto border border-gray-100">
      
      {/* Reduced text size, added dark gray color for readability */}
      <h1 className="font-bold text-2xl text-gray-800 mb-4">
        TailwindCSS v4
      </h1>

      <button className="
        bg-blue-500 
        hover:bg-blue-700 
        text-white 
        font-semibold 
        px-6 py-2 
        rounded-lg 
        transition-colors duration-200
        shadow-md
      ">
        Click Me
      </button>
    </main>
  );
}