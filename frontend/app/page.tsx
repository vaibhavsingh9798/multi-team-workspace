import Image from "next/image";

export default function Home() {
  return (
   <>
   <main className="min-h-screen bg-black text-white px-6 py-16 flex flex-col items-center">
      {/* Hero Section */}
      <section className="text-center max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
          Multi-Team Workspace
        </h1>
        <p className="text-lg text-gray-400 mt-4">
          Manage teams. Organize workspaces. Collaborate seamlessly.
        </p>
        <button className="mt-8 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white transition">
          Get Started
        </button>
      </section>


    </main>
   </>
  );
}
