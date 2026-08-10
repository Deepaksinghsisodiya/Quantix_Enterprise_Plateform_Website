import { NextResponse } from "next/server";

const testimonials = [
  {
    id: "t1",
    quote:
      "Quantix transformed how we manage our stores. Inventory sync helps our team keep stock visibility clear across locations.",
    author: "Sarah Mitchell",
    role: "Owner",
    companyName: "Bella Boutique",
    industry: "Retail",
    initials: "SM",
    avatarColor: "bg-purple-600",
  },
  {
    id: "t2",
    quote:
      "Table management and KDS workflows made our dining room and kitchen communication much smoother during busy service.",
    author: "James Chen",
    role: "General Manager",
    companyName: "The Harbor Kitchen",
    industry: "Restaurant",
    initials: "JC",
    avatarColor: "bg-blue-600",
  },
  {
    id: "t3",
    quote:
      "The multi-location dashboard gives regional managers one place to review branches, stock movement, and daily operations.",
    author: "Priya Sharma",
    role: "Founder",
    companyName: "FreshMart Chain",
    industry: "Retail",
    initials: "PS",
    avatarColor: "bg-emerald-600",
  },
  {
    id: "t4",
    quote:
      "Online ordering, reporting, and floor operations are easier for our managers to follow in one connected platform.",
    author: "Marcus Webb",
    role: "Director",
    companyName: "Urban Eats Group",
    industry: "Restaurant",
    initials: "MW",
    avatarColor: "bg-amber-600",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: testimonials,
  });
}
