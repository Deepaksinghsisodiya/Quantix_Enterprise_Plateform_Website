import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({ success: true, email: body?.email });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
