"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User } from "lucide-react";
import Link from "next/link";
import { useLoginMutation, useSignupMutation } from "@/services/userApi";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [login, { isLoading: isLoggingIn, error: loginError }] =
    useLoginMutation();
  const [signup, { isLoading: isSigningUp, error: signupError }] =
    useSignupMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      if (isLogin) {
        const res = await login(data).unwrap();
        localStorage.setItem("token", res.token);
        router.push("/");
      } else {
        const res = await signup(data).unwrap();
        localStorage.setItem("token", res.token);
        router.push("/");
      }
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8"
      >
        {/* Toggle Tabs */}
        <div className="flex justify-center gap-6 mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`text-lg font-semibold ${
              isLogin ? "text-blue-600 dark:text-blue-400" : "text-gray-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`text-lg font-semibold ${
              !isLogin ? "text-blue-600 dark:text-blue-400" : "text-gray-500"
            }`}
          >
            Signup
          </button>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
          {isLogin ? "Welcome Back" : "Create an Account"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <div className="flex items-center gap-3 border rounded-lg px-3 py-2 dark:border-gray-700">
              <User size={18} className="text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-200"
              />
            </div>
          )}

          <div className="flex items-center gap-3 border rounded-lg px-3 py-2 dark:border-gray-700">
            <Mail size={18} className="text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-200"
              />
          </div>

          <div className="flex items-center gap-3 border rounded-lg px-3 py-2 dark:border-gray-700">
            <Lock size={18} className="text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-200"
              />
          </div>

          <button
            type="submit"
            disabled={isLoggingIn || isSigningUp}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition disabled:bg-blue-400"
          >
            {isLoggingIn || isSigningUp
              ? "Loading..."
              : isLogin
              ? "Login"
              : "Signup"}
          </button>
        </form>

        {/* Extra Links */}
        <div className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
          {isLogin ? (
            <p>
              Don’t have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-blue-600 dark:text-blue-400 font-medium"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-blue-600 dark:text-blue-400 font-medium"
              >
                Login
              </button>
            </p>
          )}
        </div>

        {/* Social Login (Optional) */}
        <div className="mt-6">
          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mb-3">
            or continue with
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-4 py-2 border rounded-lg dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
              Google
            </button>
            <button className="px-4 py-2 border rounded-lg dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
              GitHub
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
