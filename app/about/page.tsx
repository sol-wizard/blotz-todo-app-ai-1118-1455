import Link from "next/link";

// The folder app/about/ becomes the URL /about
export default function AboutPage() {
  return (
    <main className="mx-auto mt-16 max-w-md px-4">
      <h1 className="mb-4 text-3xl font-bold">About</h1>
      <p className="mb-6">
        A simple to-do app built with Next.js, React, TypeScript and Tailwind
        for the Blotz Frontend course.
      </p>
      <Link href="/" className="text-indigo-600 hover:underline">
        ← Back to my to-dos
      </Link>
    </main>
  );
}
