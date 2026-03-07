import { NextResponse } from "next/server";
import disciplines from "@/mocks/disciplines.json";
export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return NextResponse.json(disciplines);
}
