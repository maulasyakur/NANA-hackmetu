"use server"

import pool from "@/lib/pool";

export async function deleteDataFromTable(table:string, id: number){
    console.log(table, id)
    try{
        if (table === "hospitals"){
            await pool.query("DELETE FROM tb_rs WHERE id=$1", [id]);
        } else if (table === "doctors"){
            await pool.query("DELETE FROM tb_dokter WHERE id=$1", [id]);
        } else if (table === "sections"){
            await pool.query("DELETE FROM tb_poli WHERE id=$1", [id]);
        }
    } catch (err) {
        console.error(err)
    }

}