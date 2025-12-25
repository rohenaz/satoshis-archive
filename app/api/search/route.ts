import { NextRequest, NextResponse } from "next/server";
import { getAnnasAPI } from "@/lib/annas-api";
import type { AnnasSearchParams } from "@/types/annas";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json(
        { error: "Query parameter 'q' is required" },
        { status: 400 }
      );
    }

    const params: AnnasSearchParams = {
      query,
      page: parseInt(searchParams.get("page") || "1"),
      limit: parseInt(searchParams.get("limit") || "20"),
      sort: (searchParams.get("sort") as any) || "relevance",
      ext: searchParams.get("ext") || undefined,
      lang: searchParams.get("lang") || undefined,
    };

    const api = getAnnasAPI();
    const results = await api.search(params);

    return NextResponse.json(results);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to search Anna's Archive" },
      { status: 500 }
    );
  }
}
