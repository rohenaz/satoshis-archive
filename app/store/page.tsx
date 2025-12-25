"use client";

import { useState, useEffect } from "react";
import { WalletConnector } from "@/lib/bsv";
import type { WalletInfo } from "@/lib/bsv";

export default function StorePage() {
  const [wallet, setWallet] = useState<WalletInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if wallet is already connected
    WalletConnector.connect().then(setWallet);
  }, []);

  const handleConnect = async () => {
    setLoading(true);
    setError(null);

    try {
      const walletInfo = await WalletConnector.connect();
      if (walletInfo) {
        setWallet(walletInfo);
      } else {
        setError("No BSV wallet detected. Please install Yours Wallet.");
      }
    } catch (err) {
      setError("Failed to connect wallet. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Store on Blockchain</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Permanently write documents to the Bitcoin SV blockchain
          </p>
        </div>

        <div className="border rounded-lg p-8 space-y-6">
          <h2 className="text-2xl font-semibold">Connect Wallet</h2>

          {!wallet ? (
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                Connect your BSV wallet to start storing documents on the blockchain.
              </p>
              <button
                onClick={handleConnect}
                disabled={loading}
                className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Connecting..." : "Connect Yours Wallet"}
              </button>
              {error && (
                <div className="p-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg">
                  <p className="text-red-800 dark:text-red-200">{error}</p>
                </div>
              )}
              <div className="space-y-2 text-sm text-gray-500">
                <p className="font-semibold">Don't have a BSV wallet?</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <a
                      href="https://yours.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 hover:underline"
                    >
                      Get Yours Wallet
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://handcash.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 hover:underline"
                    >
                      Get HandCash
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-800 rounded-lg">
                <p className="text-green-800 dark:text-green-200 font-semibold">
                  Wallet Connected!
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Address:
                  </span>
                  <code className="font-mono text-sm">{wallet.address}</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Balance:
                  </span>
                  <span className="font-semibold">
                    {(wallet.balance / 100000000).toFixed(8)} BSV
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {wallet && (
          <div className="border rounded-lg p-8 space-y-6">
            <h2 className="text-2xl font-semibold">How It Works</h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-600 dark:text-gray-400">
              <li>Search for a document in the Archive</li>
              <li>Click "Store on Blockchain" for the document you want to preserve</li>
              <li>Review the transaction details and fee</li>
              <li>Confirm the transaction in your wallet</li>
              <li>Document metadata is permanently written to the BSV blockchain</li>
              <li>Receive a transaction ID as proof of storage</li>
            </ol>

            <div className="p-4 bg-blue-100 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-800 rounded-lg">
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                <strong>Note:</strong> Only metadata (title, author, ID, etc.) is stored on-chain.
                The full document remains on Anna's Archive. This creates an immutable,
                timestamped record of the document's existence and metadata.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
