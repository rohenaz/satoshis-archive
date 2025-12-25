import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <main className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
            Satoshi's Archive
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Browse Anna's Archive and permanently store documents on the BSV blockchain
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/search"
            className="p-8 border rounded-lg hover:border-orange-500 transition-colors group"
          >
            <h2 className="text-2xl font-semibold mb-2 group-hover:text-orange-500">
              Search Archive →
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Browse Creative Commons and public domain content from Anna's Archive
            </p>
          </Link>

          <Link
            href="/store"
            className="p-8 border rounded-lg hover:border-orange-500 transition-colors group"
          >
            <h2 className="text-2xl font-semibold mb-2 group-hover:text-orange-500">
              Store on Chain →
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Permanently write documents to the Bitcoin SV blockchain
            </p>
          </Link>
        </div>

        <div className="space-y-4 pt-8">
          <h3 className="text-2xl font-semibold">Features</h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>✨ Search Anna's Archive for public domain content</li>
            <li>🔗 BSV wallet integration (Yours Wallet, HandCash)</li>
            <li>⛓️ Permanent, immutable blockchain storage</li>
            <li>🔒 Censorship-resistant document preservation</li>
          </ul>
        </div>

        <div className="pt-8 text-center text-sm text-gray-500">
          <p>
            Built with Next.js, Tailwind CSS, and the BSV blockchain.
            <br />
            Only supports Creative Commons and public domain content.
          </p>
        </div>
      </main>
    </div>
  );
}
