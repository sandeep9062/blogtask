"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-28 md:py-20 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left"
        >
          <h1
            className="text-4xl md:text-5xl font-extrabold leading-tight"
            style={{ color: "var(--foreground)" }}
          >
            Welcome to{" "}
            <span style={{ color: "var(--primary)" }}>Your Blog</span>
          </h1>
          <p className="mt-6 text-lg" style={{ color: "var(--foreground)" }}>
            Discover insightful articles, tutorials, and stories written by
            passionate writers. Stay informed, inspired, and up to date.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              href="#blogs"
              className="px-6 py-3 rounded-2xl font-medium shadow-md transition"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--background)",
              }}
            >
              Explore Blogs
            </Link>
            <Link
              href="#about"
              className="px-6 py-3 rounded-2xl font-medium transition"
              style={{
                backgroundColor: "var(--background)",
                color: "var(--foreground)",
                border: "1px solid var(--primary)",
              }}
            >
              Learn More
            </Link>
          </div>
        </motion.div>

        {/* Right Image / Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center lg:justify-end"
        >
          <img
            src="/blog-hero.jpg"
            alt="Blog illustration"
            className="w-[85%] lg:w-[90%] max-w-lg drop-shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
