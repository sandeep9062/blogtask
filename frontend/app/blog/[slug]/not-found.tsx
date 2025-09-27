"use client"; // Add this directive at the very top

import Link from 'next/link';
import { ChevronRight } from 'lucide-react'; // A suitable icon for navigation
import { motion } from 'framer-motion';

// This component will be rendered when a route is not found.
// It should provide a clear message and guide the user back.
export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center bg-white dark:bg-darkbg1 text-center px-4 py-16 mt-20"
    >
      <h1 className="text-9xl font-extrabold text-gray-200 dark:text-gray-700 select-none">
        404
      </h1>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
        Page Not Found
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mb-8">
        Oops! The page you're looking for doesn't exist or has been moved.
        Please check the URL or navigate back to our homepage.
      </p>
      <Link href="/" className="inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold text-black bg-gold hover:bg-gold/90 transition-colors duration-300 shadow-md">
          Go to Homepage
          <ChevronRight className="ml-2 w-5 h-5" />
      </Link>
    </motion.div>
  );
}
