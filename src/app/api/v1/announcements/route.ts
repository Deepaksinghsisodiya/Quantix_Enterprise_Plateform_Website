import { NextResponse } from "next/server";
import { FALLBACK_ANNOUNCEMENTS } from "@/features/Announcements/constants/fallbackAnnouncements";

export async function GET() {
  try {
    const backendUrl = (
      process.env.BACKEND_API_URL ||
      process.env.LIVE_BACKEND_API_URL ||
      "http://localhost:5104"
    ).replace(/\/$/, "");

    try {
      const backendRes = await fetch(`${backendUrl}/api/v1/announcements`, {
        cache: "no-store",
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(3000),
      });

      if (backendRes.ok) {
        const data = await backendRes.json();
        const items = Array.isArray(data) ? data : data?.data;
        if (Array.isArray(items) && items.length > 0) {
          return NextResponse.json(data);
        }
      }
    } catch (networkError) {
      console.warn("Backend announcements endpoint unreachable, using fallback announcements:", networkError);
    }

    // Return high-quality fallback announcements if backend is offline/empty
    return NextResponse.json({
      success: true,
      message: "Fallback announcements loaded successfully",
      data: FALLBACK_ANNOUNCEMENTS,
    });
  } catch (error) {
    console.error("Failed to load announcements:", error);
    return NextResponse.json({
      success: true,
      data: FALLBACK_ANNOUNCEMENTS,
    });
  }
}
