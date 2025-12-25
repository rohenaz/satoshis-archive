import type { AnnasSearchParams, AnnasSearchResponse, AnnasDocument } from "@/types/annas";

const ANNAS_API_BASE = "https://annas-archive.org/api";

export class AnnasArchiveAPI {
  private apiKey: string;

  constructor(apiKey: string) {
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
      throw new Error(`Anna's Archive API error: ${response.statusText}`);
    }

    return response.json();
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

// Singleton instance for server-side use
let apiInstance: AnnasArchiveAPI | null = null;

export function getAnnasAPI(): AnnasArchiveAPI {
  if (!apiInstance) {
    const apiKey = process.env.ANNAS_SECRET_KEY;
    if (!apiKey) {
      throw new Error("ANNAS_SECRET_KEY environment variable is not set");
    }
    apiInstance = new AnnasArchiveAPI(apiKey);
  }
  return apiInstance;
}
