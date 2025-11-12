import Navbar from "@/components/Navbar";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <main className="bg-pink-600 min-h-screen text-white flex flex-col">
      <Navbar />
      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center flex-grow text-center px-6 pt-20">
        <div className="space-y-6">
          <h1 className="text-[100px] md:text-[140px] font-bold leading-none text-white">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold">
            Oops! Page Not Found
          </h2>
          <p className="text-white max-w-md mx-auto text-sm md:text-base">
            It seems the page you&apos;re looking for doesn&apos;t exist or has
            been moved. Let&apos;s help you find your way back home.
          </p>

          <div className="mt-8">
            <Link
              href="/"
              className="inline-block bg-white text-pink-600 px-6 py-3 rounded-full border border-pink-600 font-medium hover:bg-white transition-colors duration-300"
            >
              Back to Homepage
            </Link>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="mt-2 mb-10 opacity-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-24 h-24 mx-auto text-white"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12H3m0 0l6 6m-6-6l6-6"
            />
          </svg>
        </div>
      </section>
    </main>
  );
};

export default NotFoundPage;
