"use client";

import Link from "next/link";
import { Twitter, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="border-t mt-20"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        borderColor: "var(--primary)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Brand */}
        <div>
          <Link
            href="/"
            className="text-2xl font-bold"
            style={{ color: "var(--primary)" }}
          >
            MyBlog
          </Link>
          <p className="mt-3 text-sm">
            Sharing insights, tutorials, and stories from the tech world.
          </p>
        </div>

        {/* Socials */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Connect with us</h4>
          <div className="flex gap-4 justify-center md:justify-start">
            <Link
              href="https://twitter.com/"
              target="_blank"
              className="p-2 rounded-full transition"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--background)",
              }}
            >
              <Twitter size={18} />
            </Link>
            <Link
              href="https://github.com/"
              target="_blank"
              className="p-2 rounded-full transition"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--background)",
              }}
            >
              <Github size={18} />
            </Link>
            <Link
              href="https://linkedin.com/"
              target="_blank"
              className="p-2 rounded-full transition"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--background)",
              }}
            >
              <Linkedin size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t py-4" style={{ borderColor: "var(--primary)" }}>
        <p className="text-center text-sm">
          © {new Date().getFullYear()} MyBlog. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
