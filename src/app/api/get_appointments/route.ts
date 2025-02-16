import { NextResponse } from "next/server";
import pool from "@/lib/pool";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: "Hello World" })
  // const { patient_name, hospital_name, section_name } = req.query;

  // try {
  //   // Start building the query
  //   let query = 'SELECT * FROM tb_appointments';
  //   let queryParams: (string | number)[] = [];

  //   // Add filters if parameters are passed
  //   if (patient_name || hospital_name || section_name) {
  //   //   query += ' WHERE';
      
  //   //   if (patient_name) {
  //   //     query += ' patient_name = ?';
  //   //     queryParams.push(patient_name);
  //   //   }
      
  //   //   if (hospital_name) {
  //   //     if (queryParams.length > 0) query += ' AND';
  //   //     query += ' hospital_name = ?';
  //   //     queryParams.push(hospital_name);
  //   //   }
      
  //   //   if (section_name) {
  //   //     if (queryParams.length > 0) query += ' AND';
  //   //     query += ' section_name = ?';
  //   //     queryParams.push(section_name);
  //   //   }
  //   }

  //   // // Query the database with the constructed query and parameters
  //   // const results = await queryDatabase(query, queryParams);

  //   // // Return the results as a JSON response
  //   // res.status(200).json(results);
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).json({ error: 'Internal server error' });
  // }
}
