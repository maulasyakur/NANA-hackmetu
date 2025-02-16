"use server"

import pool from "./pool";

export async function getAppointment(){
    const result = await pool.query( `
        SELECT 
            pa.nama_lengkap,
            rs.nama_rs,
            po.nama_poli,
            pa.waktu_appointment,
            pa.id
        FROM tb_pasien pa
        JOIN tb_rs rs ON pa.id_rs = rs.id
        JOIN tb_poli po ON pa.id_poli = po.id;
      `);

    return result.rows
}