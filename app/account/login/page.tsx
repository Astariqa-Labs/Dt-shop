'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-950 flex flex-col justify-between font-sans">
      
      {/* Header */}
      <header className="flex items-center justify-between px-10 py-7 border-b border-neutral-200 bg-white">
        <Link href="/" className="flex items-center space-x-3">
          <span className="font-sans text-xl font-bold tracking-[0.2em] uppercase">Deuteronomy</span>
          <span className="bg-neutral-900 text-white text-[10px] uppercase font-semibold tracking-widest px-2 py-0.5 rounded-full">Shop</span>
        </Link>
        <Link href="/" className="text-sm font-medium text-neutral-600 hover:text-neutral-950">
          Back to Store
        </Link>
      </header>

      {/* Login Box */}
      <main className="max-w-md w-full mx-auto px-6 py-12 space-y-8">
        <div className="space-y-2 text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-semibold">Customer Portal</span>
          <h1 className="text-3xl font-light tracking-tight text-neutral-900">Sign In to Your Account</h1>
          <p className="text-sm text-neutral-600 font-light">Track your Clarks orders and view past purchases easily.</p>
        </div>

        {!submitted ? (
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-neutral-800 mb-1.5">Email or Phone Number</label>
              <input
                type="text"
                placeholder="name@example.com or 0712345678"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:border-neutral-900 text-sm text-neutral-900 transition-all placeholder:text-neutral-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-medium py-4 rounded-xl shadow-md transition-all text-sm"
            >
              Continue with Verification Code
            </button>
          </form>
        ) : (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
            <h3 className="text-sm font-semibold text-emerald-900">Verification Link Sent</h3>
            <p className="text-xs text-emerald-700 font-light">We have sent a secure sign-in link to <span className="font-medium">{identifier}</span>.</p>
          </div>
        )}

        <div className="text-center text-xs text-neutral-500">
          Need assistance? <span className="underline cursor-pointer hover:text-neutral-900">Contact Support</span>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="py-6 text-center text-xs text-neutral-400 border-t border-neutral-100">
        &copy; {new Date().getFullYear()} Deuteronomy Shop. All rights reserved.
      </footer>

    </div>
  );
}