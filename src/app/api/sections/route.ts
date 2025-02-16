import pool from "@/lib/pool";
import { NextResponse } from "next/server";

// GET request handler
export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM tb_poli");
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// POST request handler
export async function POST(request: Request) {
  try {
    const { name, hospitalId } = await request.json();
    await pool.query("INSERT INTO tb_poli (nama_poli, id_rs) VALUES ($1, $2)", [name, hospitalId]);
    return NextResponse.json({ message: "Section added" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// PUT request handler
export async function PUT(request: Request) {
  try {
    const { id, name, hospitalId } = await request.json();
    await pool.query("UPDATE tb_poli SET nama_poli = $1, id_rs = $2 WHERE id = $3", [name, hospitalId, id]);
    return NextResponse.json({ message: "Section updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE request handler
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await pool.query("DELETE FROM tb_poli WHERE id = $1", [id]);
    return NextResponse.json({ message: "Section deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}