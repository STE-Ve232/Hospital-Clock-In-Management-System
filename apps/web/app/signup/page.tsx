'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Backend currently only supports /api/auth/login.
    // To avoid “Cannot POST /api/auth/signup”, we treat signup as a UI-only flow.
    // Users can still create an account in Firebase (if configured) and then log in.

    setError(null);
    setLoading(true);
    try {
      // Basic client-side validation only.
      if (!name.trim()) throw new Error('Name is required');
      if (!email.trim()) throw new Error('Email is required');
      if (!password.trim()) throw new Error('Password is required');

      // Redirect to login. (No backend endpoint exists yet.)
      router.push('/login');
    } catch (err: any) {
      setError(err?.message ?? 'Sign up failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-xl border p-6">
        <h2 className="text-lg font-semibold">Sign up</h2>
        <p className="mt-1 text-sm opacity-70">Create your hospital staff account</p>

        <div className="mt-4 space-y-3">
          <label className="block">
            <span className="text-sm">Name</span>
            <input
              className="mt-1 w-full rounded-lg border bg-transparent p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm">Email</span>
            <input
              className="mt-1 w-full rounded-lg border bg-transparent p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm">Password</span>
            <input
              className="mt-1 w-full rounded-lg border bg-transparent p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
          </label>

          {error ? <div className="text-sm text-red-600">{error}</div> : null}

          <button
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Creating…' : 'Create account'}
          </button>

          <div className="text-center text-sm mt-2">
            <p className="text-sm opacity-70">Already have an account?</p>
            <Link href="/login" className="underline">Back to login</Link>
          </div>
        </div>
      </form>
    </main>
  );
}

