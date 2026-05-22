import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    user: {
      id: "mock-user-id",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "admin",
    },
  });
}
