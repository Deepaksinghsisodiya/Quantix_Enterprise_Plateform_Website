import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const backendUrl = (
      process.env.BACKEND_API_URL ||
      process.env.LIVE_BACKEND_API_URL ||
      "http://localhost:5104"
    ).replace(/\/$/, "");

    const search = request.nextUrl.search || "?siteVariant=Enterprise";

    try {
      const backendRes = await fetch(`${backendUrl}/api/v1/hero-slides${search}`, {
        cache: "no-store",
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(4000),
      });

      if (backendRes.ok) {
        const data = await backendRes.json();
        // Pass through exactly what the backend returned,
        // flagging that the backend is reachable so the frontend
        // can distinguish "all disabled" from "backend offline".
        const items: any[] = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.data?.items)
          ? data.data.items
          : [];

        return NextResponse.json({
          success: true,
          backendReachable: true,
          data: items,
        });
      }
    } catch (networkError) {
      console.warn("Backend hero-slides endpoint unreachable:", networkError);
    }

    // Backend offline – signal the frontend to fall back to static slides
    return NextResponse.json({
      success: true,
      backendReachable: false,
      data: [],
    });
  } catch (error) {
    console.error("Failed to load hero-slides:", error);
    return NextResponse.json({
      success: true,
      backendReachable: false,
      data: [],
    });
  }
}
