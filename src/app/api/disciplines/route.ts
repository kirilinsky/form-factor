import { NextResponse } from "next/server";
import * as data from "@/mocks/disciplines.json";
export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return NextResponse.json(data);
}
