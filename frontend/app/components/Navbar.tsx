"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useGetUserInfoQuery, useLogoutMutation } from "@/services/userApi";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: userInfo, error, isLoading } = useGetUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    await logout(undefined);
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/auth");
  };

  return (
    <nav
      className="w-full shadow-md fixed top-0 left-0 z-50"
      style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold"
          style={{ color: "var(--primary)" }}
        >
          MyBlog
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="transition" style={{ color: "var(--foreground)" }}>Home</Link>
          <Link href="/#about" className="transition" style={{ color: "var(--foreground)" }}>About</Link>
          <Link href="/#blogs" className="transition" style={{ color: "var(--foreground)" }}>Blogs</Link>
    
          {/* <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg"
            style={{
              backgroundColor: "var(--background)",
              color: "var(--foreground)",
            }}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button> */}

          {/* Action Buttons */}
          {isLoggedIn ? (
            <>
              <span style={{ color: "var(--foreground)" }}>
                Welcome, {userInfo?.name}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg text-white transition"
                style={{ backgroundColor: "var(--primary)" }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/auth"
              className="px-4 py-2 rounded-lg transition"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--background)",
              }}
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden"
          style={{ color: "var(--foreground)" }}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden px-6 pb-6 space-y-4"
          style={{ backgroundColor: "var(--background)" }}
        >
          <Link href="/" className="block px-4 py-2 rounded-lg" style={{ color: "var(--foreground)" }} onClick={() => setMobileOpen(false)}>Home</Link>
          <Link href="/#about" className="block px-4 py-2 rounded-lg" style={{ color: "var(--foreground)" }} onClick={() => setMobileOpen(false)}>About</Link>
          <Link href="/#blogs" className="block px-4 py-2 rounded-lg" style={{ color: "var(--foreground)" }} onClick={() => setMobileOpen(false)}>Blogs</Link>
          <button
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
              setMobileOpen(false);
            }}
            className="w-full text-left px-4 py-2 rounded-lg"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--background)",
            }}
          >
            {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setMobileOpen(false);
              }}
              className="block w-full text-left px-4 py-2 rounded-lg text-white transition"
              style={{ backgroundColor: "var(--primary)" }}
            >
              Logout
            </button>
          ) : (
            <Link
              href="/auth"
              className="block px-4 py-2 rounded-lg"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--background)",
              }}
              onClick={() => setMobileOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
