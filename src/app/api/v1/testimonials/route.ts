import { NextResponse } from "next/server";

export async function GET() {
  try {
    const backendUrl = (process.env.BACKEND_API_URL || process.env.LIVE_BACKEND_API_URL || "http://localhost:5104").replace(/\/$/, "");
    
    // First attempt: /api/v1/testimonials
    let res = await fetch(`${backendUrl}/api/v1/testimonials`, {
      cache: "no-store",
      headers: { "Accept": "application/json" },
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }

    // Fallback: /api/v1/marketing/testimonials
    const marketingRes = await fetch(`${backendUrl}/api/v1/marketing/testimonials`, {
      cache: "no-store",
      headers: { "Accept": "application/json" },
    });

    if (marketingRes.ok) {
      const marketingData = await marketingRes.json();
      return NextResponse.json(marketingData);
    }

    return NextResponse.json({ success: false, data: [] }, { status: res.status || 500 });
  } catch (error) {
    console.error("Failed to fetch live testimonials from backend:", error);
    return NextResponse.json({ success: false, data: [] }, { status: 500 });
  }
}
