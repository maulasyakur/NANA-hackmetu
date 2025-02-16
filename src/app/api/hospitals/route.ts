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
    await pool.query("INSERT INTO tb_rs (nama_rs, kabupaten, provinsi) VALUES ($1, $2, $3)", [name, kabupaten, provinsi]);
    return NextResponse.json({ message: "Hospital added" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...updates } = await request.json(); // Extract `id` and the rest as `updates`

    // Dynamically build the SQL query based on the fields provided
    const fields = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    const values = Object.values(updates);
    values.push(id); // Add `id` as the last parameter

    await pool.query(
      `UPDATE tb_rs SET ${fields} WHERE id = $${values.length}`,
      values
    );

    return NextResponse.json({ message: "Hospital updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE request handler
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await pool.query("DELETE FROM tb_rs WHERE id = $1", [id]);
    return NextResponse.json({ message: "Hospital deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}