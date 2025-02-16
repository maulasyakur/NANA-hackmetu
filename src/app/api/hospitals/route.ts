import pool from "@/lib/pool";
import { NextResponse } from "next/server";

// GET request handler
export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM tb_rs");
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// POST request handler
export async function POST(request: Request) {
  try {
    const { name, kabupaten, provinsi } = await request.json();
    await pool.query("INSERT INTO hospitals (name, kabupaten, provinsi) VALUES ($1, $2, $3)", [name, kabupaten, provinsi]);
    return NextResponse.json({ message: "Hospital added" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// PUT request handler
export async function PUT(request: Request) {
  try {
    const { id, name, kabupaten, provinsi } = await request.json();
    await pool.query("UPDATE hospitals SET name = $1, kabupaten = $2, provinsi = $3 WHERE id = $4", [name, kabupaten, provinsi, id]);
    return NextResponse.json({ message: "Hospital updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE request handler
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await pool.query("DELETE FROM hospitals WHERE id = $1", [id]);
    return NextResponse.json({ message: "Hospital deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}