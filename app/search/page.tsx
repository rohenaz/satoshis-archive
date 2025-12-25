"use client";

import { useState, useEffect } from "react";
import { AnnasArchiveClient, ApiKeyStorage } from "@/lib/annas-client";
import { ApiKeySetup } from "@/components/ApiKeySetup";
import type { AnnasDocument } from "@/types/annas";

export default function SearchPage() {
  const [hasApiKey, setHasApiKey] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AnnasDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setHasApiKey(ApiKeyStorage.exists());

    // Listen for API key changes
    const interval = setInterval(() => {
      setHasApiKey(ApiKeyStorage.exists());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const apiKey = ApiKeyStorage.load();
    if (!apiKey) {
      setError("API key not found. Please set up your API key first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const client = new AnnasArchiveClient(apiKey);
      const data = await client.search({ query: query.trim() });
      setResults(data.results || []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to search. Please try again."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Search Archive</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Search Anna's Archive for books, papers, and documents
          </p>
        </div>

        {!hasApiKey ? (
          <ApiKeySetup />
        ) : (
          <>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for books, papers, documents..."
                  className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-900"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? "Searching..." : "Search"}
                </button>
              </div>
            </form>

            {error && (
              <div className="p-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg">
                <p className="text-red-800 dark:text-red-200">{error}</p>
              </div>
            )}

            {results.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">
                  Results ({results.length})
                </h2>
                <div className="grid gap-4">
                  {results.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-6 border rounded-lg hover:border-orange-500 transition-colors"
                    >
                      <div className="flex gap-4">
                        {doc.coverUrl && (
                          <img
                            src={doc.coverUrl}
                            alt={doc.title}
                            className="w-24 h-32 object-cover rounded"
                          />
                        )}
                        <div className="flex-1 space-y-2">
                          <h3 className="text-xl font-semibold">{doc.title}</h3>
                          {doc.author && (
                            <p className="text-gray-600 dark:text-gray-400">
                              by {doc.author}
                            </p>
                          )}
                          {doc.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                              {doc.description}
                            </p>
                          )}
                          <div className="flex gap-4 text-sm text-gray-500">
                            {doc.year && <span>{doc.year}</span>}
                            {doc.language && <span>{doc.language}</span>}
                            {doc.extension && (
                              <span className="uppercase">{doc.extension}</span>
                            )}
                            {doc.filesize && (
                              <span>
                                {(doc.filesize / 1024 / 1024).toFixed(2)} MB
                              </span>
                            )}
                          </div>
                          <div className="flex gap-2 pt-2">
                            <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors">
                              Store on Blockchain
                            </button>
                            {doc.downloadUrl && (
                              <a
                                href={doc.downloadUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors"
                              >
                                Download
                              </a>
                            )}
                          </div>
                          <div className="pt-2 text-xs text-gray-500">
                            <p className="italic">
                              ⚠️ Verify you have legal rights to this content
                              before storing on blockchain
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!loading && results.length === 0 && query && (
              <div className="text-center py-12 text-gray-500">
                No results found. Try a different search term.
              </div>
            )}
          </>
        )}

        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-600 dark:text-gray-400">
          <p className="font-semibold mb-2">How this works:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>All searches run directly in your browser</li>
            <li>Your API key is used to access Anna's Archive API</li>
            <li>No data passes through our servers</li>
            <li>You are responsible for compliance with copyright law</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
