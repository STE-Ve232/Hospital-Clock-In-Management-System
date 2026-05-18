export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border bg-white/60 p-8 text-center shadow-sm backdrop-blur">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
          <span className="text-xl">⏱️</span>
        </div>

        <h1 className="text-2xl font-semibold">Hospital Clock-In</h1>
        <p className="mt-2 text-sm opacity-70">Secure biometric & HR attendance platform</p>

        <div className="mt-6">
          <a
            href="/login"
            className="inline-flex w-full items-center justify-center rounded-xl bg-black px-4 py-3 text-white shadow-sm transition hover:bg-gray-900"
          >
            Go to Login
          </a>
          <p className="mt-3 text-xs opacity-60">Staff authentication required before accessing the dashboard.</p>
        </div>
      </div>
    </main>
  );
}


