"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Lock, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { PublicLayout } from "@/components/organisms/PublicLayout/PublicLayout";
import Navbar from "@/components/organisms/Navbar/Navbar";
import Footer from "@/components/organisms/Footer/Footer";

export default function SignInPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <PublicLayout>
      <Navbar />
      
      <main className="min-h-[75vh] pt-32 pb-24 bg-slate-950 flex flex-col justify-center relative overflow-hidden font-sans">
        {/* Background gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-8 ml-2 sm:ml-0"
          >
            <ArrowLeft className="h-4.5 w-4.5" />
            Back to homepage
          </Link>

          {/* Logo and title */}
          <div className="flex items-center justify-center gap-2.5 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5.5 w-5.5"
              >
                <path
                  d="M12 2L3.5 7L12 12L20.5 7L12 2Z"
                  fill="url(#signin-logo-grad-1)"
                />
                <path
                  d="M3.5 7V17L12 22V12L3.5 7Z"
                  fill="url(#signin-logo-grad-2)"
                />
                <path
                  d="M12 12V22L20.5 17V7L12 12Z"
                  fill="url(#signin-logo-grad-3)"
                />
                <defs>
                  <linearGradient id="signin-logo-grad-1" x1="12" y1="2" x2="12" y2="12" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#93C5FD" />
                    <stop offset="1" stopColor="#60A5FA" />
                  </linearGradient>
                  <linearGradient id="signin-logo-grad-2" x1="3.5" y1="7" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3B82F6" />
                    <stop offset="1" stopColor="#1E3A8A" />
                  </linearGradient>
                  <linearGradient id="signin-logo-grad-3" x1="12" y1="12" x2="20.5" y2="17" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2563EB" />
                    <stop offset="1" stopColor="#1D4ED8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="text-xl font-display font-bold tracking-tight text-white">Quantix</span>
          </div>
          <h2 className="text-center text-2xl font-display font-black tracking-tight text-white uppercase">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-xs text-slate-400 font-semibold">
            Or{" "}
            <Link href="/sign-up" className="font-bold text-blue-500 hover:text-blue-400">
              start your 3-day free trial
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-slate-900/40 border border-slate-800/80 backdrop-blur-md py-8 px-6 sm:px-10 shadow-2xl rounded-2xl"
          >
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-1.5">
                  Work Email Address
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Mail className="h-4.5 w-4.5" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="name@company.com"
                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-950/60 border border-slate-800 text-sm rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-semibold"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="block text-[10px] font-bold tracking-wider uppercase text-slate-400">
                    Password
                  </label>
                  <div className="text-xs">
                    <a href="#" className="font-bold text-blue-500 hover:text-blue-400">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Lock className="h-4.5 w-4.5" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    required
                    placeholder="••••••••"
                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-950/60 border border-slate-800 text-sm rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-semibold"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-xs font-semibold text-slate-400 cursor-pointer">
                    Remember my session
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer transition-all duration-200"
                >
                  Sign In to Dashboard →
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>

      <Footer />
    </PublicLayout>
  );
}
