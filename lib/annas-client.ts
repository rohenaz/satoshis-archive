"use client";

import type { AnnasSearchParams, AnnasSearchResponse, AnnasDocument } from "@/types/annas";

const ANNAS_API_BASE = "https://annas-archive.org/api";

/**
 * Client-side Anna's Archive API client
 *
 * IMPORTANT: This runs entirely in the user's browser.
 * - User provides their own API key
 * - All requests go directly from browser to Anna's Archive
 * - Platform owner never sees or proxies the data
 * - User is responsible for obtaining API key and complying with copyright law
 */
export class AnnasArchiveClient {
  private apiKey: string;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error("API key is required. Please obtain one from Anna's Archive.");
    }
    this.apiKey = apiKey;
  }

  async search(params: AnnasSearchParams): Promise<AnnasSearchResponse> {
    const searchParams = new URLSearchParams({
      q: params.query,
      page: String(params.page || 1),
      limit: String(params.limit || 20),
      ...(params.sort && { sort: params.sort }),
      ...(params.ext && { ext: params.ext }),
      ...(params.lang && { lang: params.lang }),
    });

    try {
      const response = await fetch(
        `${ANNAS_API_BASE}/search?${searchParams}`,
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Invalid API key. Please check your Anna's Archive API key.");
        }
        throw new Error(`Anna's Archive API error: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to connect to Anna's Archive API");
    }
  }

  async getDocument(id: string): Promise<AnnasDocument> {
    const response = await fetch(`${ANNAS_API_BASE}/document/${id}`, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Anna's Archive API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getDownloadUrl(id: string): Promise<string> {
    const document = await this.getDocument(id);
    if (!document.downloadUrl) {
      throw new Error("Download URL not available for this document");
    }
    return document.downloadUrl;
  }
}

/**
 * Browser storage for API key
 * Key is stored locally and never sent to our servers
 */
export const ApiKeyStorage = {
  KEY: "annas_archive_api_key",

  save(apiKey: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(this.KEY, apiKey);
  },

  load(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(this.KEY);
  },

  clear(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(this.KEY);
  },

  exists(): boolean {
    return !!this.load();
  },
};
