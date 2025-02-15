import { NextResponse } from "next/server";
import pool from "@/lib/lib";

export async function GET(req: Request) {
  try {
    // Extract the search params
    const { searchParams } = new URL(req.url);
    const belediye = searchParams.get("belediye");

    if (!belediye) {
      return NextResponse.json({ error: "belediye is required" }, { status: 400 });
    }

    // Query database for hospitals in the given province
    const result = await pool.query(
      `SELECT * FROM tb_rs WHERE belediye = $1;`,
      [belediye]
    );

    return NextResponse.json({ data: result.rows }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
