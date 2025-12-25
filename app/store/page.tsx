"use client";

import { useState, useEffect } from "react";
import { useYoursWallet } from "yours-wallet-provider/dist/hook/useYoursWallet";
import { YoursWalletService } from "@/lib/yours-wallet";
import type { Addresses, Balance } from "yours-wallet-provider/dist/types/providerTypes";

export default function StorePage() {
  const wallet = useYoursWallet();
  const [addresses, setAddresses] = useState<Addresses | null>(null);
  const [balance, setBalance] = useState<Balance | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // CRITICAL: Event listeners for wallet state changes
  useEffect(() => {
    if (!wallet) return;

    const handleSwitchAccount = () => {
      console.log("Account switched - refreshing wallet data");
      // Re-fetch wallet data when user switches accounts
      checkConnection();
    };

    const handleSignedOut = () => {
      console.log("Wallet signed out");
      setIsConnected(false);
      setAddresses(null);
      setBalance(null);
      setError(null);
    };

    // Register event listeners
    wallet.on("switchAccount", handleSwitchAccount);
    wallet.on("signedOut", handleSignedOut);

    // Cleanup to prevent memory leaks
    return () => {
      wallet.removeListener("switchAccount", handleSwitchAccount);
      wallet.removeListener("signedOut", handleSignedOut);
    };
  }, [wallet]);

  useEffect(() => {
    if (wallet?.isReady) {
      checkConnection();
    }
  }, [wallet?.isReady]);

  const checkConnection = async () => {
    if (!wallet) return;

    try {
      const connected = await wallet.isConnected();
      setIsConnected(connected);

      if (connected) {
        const [addrs, bal] = await Promise.all([
          YoursWalletService.getAddresses(wallet),
          YoursWalletService.getBalance(wallet),
        ]);
        setAddresses(addrs);
        setBalance(bal);
      }
    } catch (err) {
      console.error("Failed to check connection:", err);
    }
  };

  const handleConnect = async () => {
    if (!wallet) {
      setError("Wallet provider not ready");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const address = await YoursWalletService.connect(wallet);
      if (address) {
        setIsConnected(true);
        await checkConnection();
      } else {
        setError("Failed to connect to Yours Wallet");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect wallet");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    if (!wallet) return;

    try {
      await YoursWalletService.disconnect(wallet);
      setIsConnected(false);
      setAddresses(null);
      setBalance(null);
    } catch (err) {
      console.error("Failed to disconnect:", err);
    }
  };

  if (!wallet) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Store on Blockchain</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Loading Yours Wallet provider...
            </p>
          </div>
        </div>
      </div>
    );
  }

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
          <h2 className="text-2xl font-semibold">Connect Yours Wallet</h2>

          {!isConnected ? (
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                Connect your Yours Wallet to start storing documents on the blockchain.
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
                <p className="font-semibold">Don't have Yours Wallet?</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <a
                      href="https://yours.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 hover:underline"
                    >
                      Get Yours Wallet Extension
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-800 rounded-lg">
                <p className="text-green-800 dark:text-green-200 font-semibold">
                  Yours Wallet Connected!
                </p>
              </div>
              {addresses && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      BSV Address:
                    </span>
                    <code className="font-mono text-sm">{addresses.bsvAddress}</code>
                  </div>
                  {balance && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Balance:
                      </span>
                      <span className="font-semibold">
                        {balance.bsv.toFixed(8)} BSV ({balance.satoshis.toLocaleString()} sats)
                      </span>
                    </div>
                  )}
                </div>
              )}
              <button
                onClick={handleDisconnect}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Disconnect
              </button>
            </div>
          )}
        </div>

        {isConnected && (
          <div className="border rounded-lg p-8 space-y-6">
            <h2 className="text-2xl font-semibold">How It Works</h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-600 dark:text-gray-400">
              <li>Search for a document in the Archive</li>
              <li>Click "Store on Blockchain" for the document you want to preserve</li>
              <li>Review the transaction details and estimated fee</li>
              <li>Confirm the transaction in your Yours Wallet</li>
              <li>Document metadata is permanently written to the BSV blockchain via OP_RETURN</li>
              <li>Receive a transaction ID as proof of storage</li>
            </ol>

            <div className="p-4 bg-blue-100 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-800 rounded-lg">
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                <strong>Note:</strong> Only metadata (title, author, ID, etc.) is stored on-chain using OP_RETURN.
                The full document remains on Anna's Archive. This creates an immutable,
                timestamped record of the document's existence and metadata on the BSV blockchain.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
