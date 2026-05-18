'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try { 
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();

      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api';
      await axios.post(`${apiBase}/auth/login`, { token }, { timeout: 10000 });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err?.message ?? 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-xl border p-6">
        <h2 className="text-lg font-semibold">Login</h2>
        <p className="mt-1 text-sm opacity-70">Biometric & HR attendance platform</p>

        <div className="mt-4 space-y-3">
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
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </button>

          <div className="text-center text-sm mt-4">
            <p className="text-sm opacity-70">Don't have an account?</p>
            <Link href="/signup" className="w-full rounded-lg bg-gray-200 text-gray-800 px-4 py-2 shadow-sm transition hover:bg-gray-300 mt-2 block">
              Sign up
            </Link>
          </div>
        </div>
      </form>
    </main>
  );
}
