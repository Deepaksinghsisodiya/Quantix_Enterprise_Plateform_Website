"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Lock, Mail, User, Building, Landmark } from "lucide-react";
import { motion } from "framer-motion";
import { PublicLayout } from "@/components/organisms/PublicLayout/PublicLayout";
import Navbar from "@/components/organisms/Navbar/Navbar";
import Footer from "@/components/organisms/Footer/Footer";

export default function SignUpPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <PublicLayout>
      <Navbar />

      <main className="min-h-[75vh] pt-32 pb-24 bg-slate-950 flex flex-col justify-center relative overflow-hidden font-sans">
        {/* Background gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

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
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Qauntix</span>
          </div>
          <h2 className="text-center text-2xl font-black tracking-tight text-white uppercase">
            Start your 3-day free trial
          </h2>
          <p className="mt-2 text-center text-xs text-slate-400 font-semibold">
            No credit card required. Already have an account?{" "}
            <Link href="/sign-in" className="font-bold text-blue-500 hover:text-blue-400">
              Sign in
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
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-1.5">
                  Full Name
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <User className="h-4.5 w-4.5" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    placeholder="Jane Smith"
                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-950/60 border border-slate-800 text-sm rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-semibold"
                  />
                </div>
              </div>

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
                    placeholder="jane@company.com"
                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-950/60 border border-slate-800 text-sm rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-semibold"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-1.5">
                  Company Name
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Building className="h-4.5 w-4.5" />
                  </div>
                  <input
                    type="text"
                    name="company"
                    id="company"
                    required
                    placeholder="Acme Corp"
                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-950/60 border border-slate-800 text-sm rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-semibold"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="businessType" className="block text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-1.5">
                  Business Type
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Landmark className="h-4.5 w-4.5" />
                  </div>
                  <select
                    name="businessType"
                    id="businessType"
                    required
                    defaultValue=""
                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-950/60 border border-slate-800 text-sm rounded-lg text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-semibold cursor-pointer"
                  >
                    <option value="" disabled>Select industry...</option>
                    <option value="retail">Retail Store</option>
                    <option value="restaurant">Restaurant / Cafe</option>
                    <option value="grocery">Grocery / Supermarket</option>
                    <option value="other">Other Business</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-1.5">
                  Password
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Lock className="h-4.5 w-4.5" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    required
                    placeholder="Min. 8 characters"
                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-950/60 border border-slate-800 text-sm rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-semibold"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer transition-all duration-200"
                >
                  Create Free Account →
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
