import { NextResponse } from 'next/server';

export async function GET() {
  const demoMedia = {
    videoThumbnail: "/images/demo-thumb.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    screenshots: [
      { id: "1", src: "/images/ss1.jpg", title: "Dashboard Overview" },
      { id: "2", src: "/images/ss2.jpg", title: "Table Management" },
      { id: "3", src: "/images/ss3.jpg", title: "Inventory Control" },
    ],
  };

  return NextResponse.json(demoMedia);
}
