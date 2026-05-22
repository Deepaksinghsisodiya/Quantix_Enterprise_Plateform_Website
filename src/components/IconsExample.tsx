import React from "react";
// General UI Icons from Lucide
import { Mail, Lock, User, Settings, CheckCircle2, ShieldAlert } from "lucide-react";
// Brand / Social Icons from React Icons
import { FaGithub, FaTwitter, FaLinkedin, FaGoogle } from "react-icons/fa";

export default function IconsExample() {
  return (
    <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl max-w-xl mx-auto my-12 font-jakarta text-white">
      <h3 className="text-xl font-bold tracking-tight mb-2 uppercase text-blue-500">
        Icon Integration Demo
      </h3>
      <p className="text-xs text-slate-400 font-semibold mb-6">
        Demonstrating Lucide React for UI elements and React Icons for brand identities under Plus Jakarta Sans.
      </p>

      {/* Lucide Icons Showcase (UI) */}
      <div className="mb-6">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
          1. Lucide React (UI Icons)
        </h4>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex items-center gap-2 p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
            <User className="h-5 w-5 text-emerald-500" />
            <span className="text-xs font-semibold">User</span>
          </div>
          <div className="flex items-center gap-2 p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
            <Mail className="h-5 w-5 text-blue-500" />
            <span className="text-xs font-semibold">Email</span>
          </div>
          <div className="flex items-center gap-2 p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
            <Lock className="h-5 w-5 text-amber-500" />
            <span className="text-xs font-semibold">Security</span>
          </div>
          <div className="flex items-center gap-2 p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
            <Settings className="h-5 w-5 text-purple-500" />
            <span className="text-xs font-semibold">Settings</span>
          </div>
          <div className="flex items-center gap-2 p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
            <CheckCircle2 className="h-5 w-5 text-teal-500" />
            <span className="text-xs font-semibold">Success</span>
          </div>
          <div className="flex items-center gap-2 p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
            <ShieldAlert className="h-5 w-5 text-rose-500" />
            <span className="text-xs font-semibold">Alert</span>
          </div>
        </div>
      </div>

      {/* React Icons Showcase (Brands) */}
      <div>
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
          2. React Icons (Brand & Social)
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-slate-950/60 hover:bg-slate-950 rounded-lg border border-slate-800/80 transition-colors"
          >
            <FaGithub className="h-5 w-5 text-white" />
            <span className="text-xs font-semibold">GitHub OAuth</span>
          </a>
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-slate-950/60 hover:bg-slate-950 rounded-lg border border-slate-800/80 transition-colors"
          >
            <FaGoogle className="h-5 w-5 text-rose-500" />
            <span className="text-xs font-semibold">Google Auth</span>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-slate-950/60 hover:bg-slate-950 rounded-lg border border-slate-800/80 transition-colors"
          >
            <FaLinkedin className="h-5 w-5 text-blue-500" />
            <span className="text-xs font-semibold">LinkedIn Profile</span>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-slate-950/60 hover:bg-slate-950 rounded-lg border border-slate-800/80 transition-colors"
          >
            <FaTwitter className="h-5 w-5 text-sky-400" />
            <span className="text-xs font-semibold">Twitter / X Feed</span>
          </a>
        </div>
      </div>
    </div>
  );
}
