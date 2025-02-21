"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const router = useRouter();

  useEffect(() => {
    console.error("Error caught:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold text-red-600">Oops! Something went wrong</h1>
      <p className="text-lg mt-2">We encountered an unexpected error.</p>
      <p className="mt-4 text-sm text-gray-500">
        {error?.message || "An unknown error occurred."}
      </p>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Try Again
        </button>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
