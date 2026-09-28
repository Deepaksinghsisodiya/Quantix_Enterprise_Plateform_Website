import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const backendUrl = (
      process.env.BACKEND_API_URL ||
      process.env.LIVE_BACKEND_API_URL ||
      "http://localhost:5104"
    ).replace(/\/$/, "");

    // Preserve query string (e.g. ?siteVariant=Enterprise)
    const search = request.nextUrl.search || "?siteVariant=Enterprise";

    try {
      const backendRes = await fetch(`${backendUrl}/api/v1/announcements${search}`, {
        cache: "no-store",
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(4000),
      });

      if (backendRes.ok) {
        const data = await backendRes.json();
        return NextResponse.json(data);
      }
    } catch (networkError) {
      console.warn("Backend announcements endpoint unreachable:", networkError);
    }

    // When backend is offline or empty, return clean empty data so sections collapse cleanly when hidden by Admin
    return NextResponse.json({
      success: true,
      data: [],
    });
  } catch (error) {
    console.error("Failed to load announcements:", error);
    return NextResponse.json({
      success: true,
      data: [],
    });
  }
}
