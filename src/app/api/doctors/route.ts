import pool from "@/lib/pool";
import { NextResponse } from "next/server";

// GET request handler
export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM tb_dokter");
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// POST request handler
export async function POST(request: Request) {
  try {
    const { name, hospitalId, sectionId } = await request.json();
    await pool.query("INSERT INTO tb_dokter (name, hospital_id, section_id) VALUES ($1, $2, $3)", [name, hospitalId, sectionId]);
    return NextResponse.json({ message: "Doctor added" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// PUT request handler
export async function PUT(request: Request) {
  try {
    const { id, name, hospitalId, sectionId } = await request.json();
    await pool.query("UPDATE tb_dokter SET name = $1, id_rs = $2, id_poli = $3 WHERE id = $4", [name, hospitalId, sectionId, id]);
    return NextResponse.json({ message: "Doctor updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE request handler
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await pool.query("DELETE FROM tb_dokter WHERE id = $1", [id]);
    return NextResponse.json({ message: "Doctor deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}