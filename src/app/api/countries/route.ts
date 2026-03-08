import { NextResponse } from "next/server";
import countries from "@/mocks/countries.json";
export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return NextResponse.json(countries);
}
