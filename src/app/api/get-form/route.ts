import { NextResponse } from "next/server";
import config from "@/mocks/default.json";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return NextResponse.json(config);
}
