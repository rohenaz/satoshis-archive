"use client";

import { useState, useEffect } from "react";
import { ApiKeyStorage } from "@/lib/annas-client";

export function ApiKeySetup() {
  const [apiKey, setApiKey] = useState("");
  const [hasKey, setHasKey] = useState(false);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const existingKey = ApiKeyStorage.load();
    if (existingKey) {
      setHasKey(true);
      setApiKey(existingKey);
    } else {
      setShowInput(true);
    }
  }, []);

  const handleSave = () => {
    if (apiKey.trim()) {
      ApiKeyStorage.save(apiKey.trim());
      setHasKey(true);
      setShowInput(false);
    }
  };

  const handleClear = () => {
    ApiKeyStorage.clear();
    setApiKey("");
    setHasKey(false);
    setShowInput(true);
  };

  if (hasKey && !showInput) {
    return (
      <div className="p-4 bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-800 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-800 dark:text-green-200 font-semibold">
              ✓ API Key Configured
            </p>
            <p className="text-sm text-green-700 dark:text-green-300">
              Key: {apiKey.slice(0, 8)}...{apiKey.slice(-4)}
            </p>
          </div>
          <button
            onClick={handleClear}
            className="px-4 py-2 text-sm border border-green-600 text-green-600 rounded hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
          >
            Change Key
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-6 border rounded-lg bg-yellow-50 dark:bg-yellow-900/10 border-yellow-300 dark:border-yellow-800">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">API Key Required</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          To use Satoshi's Archive, you need your own Anna's Archive API key.
          This ensures you're directly responsible for your API usage and
          content access.
        </p>
      </div>

      <div className="p-4 bg-blue-100 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-800 rounded">
        <p className="text-sm text-blue-800 dark:text-blue-200 font-semibold mb-2">
          How to get an API key:
        </p>
        <ol className="text-sm text-blue-700 dark:text-blue-300 list-decimal list-inside space-y-1">
          <li>
            Visit{" "}
            <a
              href="https://annas-archive.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-600"
            >
              Anna's Archive
            </a>
          </li>
          <li>Make a donation to support their mission</li>
          <li>Receive your API key via email</li>
          <li>Enter it below (stored locally in your browser only)</li>
        </ol>
      </div>

      <div className="space-y-3">
        <label className="block">
          <span className="text-sm font-medium">Your API Key</span>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Anna's Archive API key..."
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-900"
          />
        </label>
        <button
          onClick={handleSave}
          disabled={!apiKey.trim()}
          className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Save API Key
        </button>
      </div>

      <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs text-gray-600 dark:text-gray-400">
        <p className="font-semibold mb-1">Privacy & Security:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Your API key is stored locally in your browser only</li>
          <li>The platform owner never sees or stores your key</li>
          <li>All API requests go directly from your browser to Anna's Archive</li>
          <li>You can clear your key anytime</li>
        </ul>
      </div>

      <div className="p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded text-xs text-red-800 dark:text-red-200">
        <p className="font-semibold mb-1">⚠️ Legal Responsibility:</p>
        <p>
          By using your API key, you accept full responsibility for compliance
          with copyright laws and Anna's Archive's terms of service. The
          platform owner is not responsible for your use of this tool.
        </p>
      </div>
    </div>
  );
}
