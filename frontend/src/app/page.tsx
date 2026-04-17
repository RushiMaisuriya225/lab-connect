import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
      <div className="text-center px-4">
        <h1 className="text-5xl font-bold mb-6 tracking-tight">
          College Lab Attendance & Equipment System
        </h1>
        <p className="text-xl mb-12 max-w-2xl mx-auto text-purple-200">
          A centralized, modern platform to manage lab attendance, monitor real-time occupancy, and track equipment availability effortlessly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="px-8 py-4 bg-white text-indigo-900 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
          >
            Login to Dashboard
          </Link>
          <Link
            href="/register"
            className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold text-lg border border-indigo-400 hover:bg-indigo-500 transition-colors duration-300 shadow-lg"
          >
            Create an Account
          </Link>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
      <div className="absolute top-1/3 right-10 w-40 h-40 bg-indigo-500 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
    </div>
  );
}
