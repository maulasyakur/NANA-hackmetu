"use client";

import { deleteDataFromTable } from "@/actions/tableEdit";
import axios from "axios";
import { useEffect, useState } from "react";

interface Hospital {
  id: number;
  nama_rs: string;
  kabupaten: string;
  provinsi: string;
}

interface Section {
  id: number;
  nama_poli: string;
  id_rs: number;
}

interface Doctor {
  id: number;
  nama_dokter: string;
  id_rs: number;
  id_poli: number;
}

const AdminPage = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [hospitalsRes, sectionsRes, doctorsRes] = await Promise.all([
        axios.get("/api/hospitals"),
        axios.get("/api/sections"),
        axios.get("/api/doctors"),
      ]);
      setHospitals(hospitalsRes.data);
      setSections(sectionsRes.data);
      setDoctors(doctorsRes.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleUpdate = async (table: string, id: number, field: string, value: string) => {
    try {
      await axios.put(`/api/${table}/${id}`, { [field]: value });
      fetchData();
    } catch (error) {
      console.error("Error updating record", error);
    }
  };

  const handleDelete = async (table: string, id: number) => {
    try {
        await deleteDataFromTable(table, id)
    //   await axios.delete(`/api/${table}/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting record", error);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen text-black">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage SQL Tables</h1>

      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Hospitals</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 text-left text-gray-700">Name</th>
              <th className="border p-3 text-left text-gray-700">Kabupaten</th>
              <th className="border p-3 text-left text-gray-700">Provinsi</th>
              <th className="border p-3 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hospitals.map((hospital) => (
              <tr key={hospital.id} className="hover:bg-gray-50 transition-colors">
                <td className="border p-3">
                  <input
                    type="text"
                    defaultValue={hospital.nama_rs}
                    onBlur={(e) => handleUpdate("hospitals", hospital.id, "nama_rs", e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="border p-3">
                  <input
                    type="text"
                    defaultValue={hospital.kabupaten}
                    onBlur={(e) => handleUpdate("hospitals", hospital.id, "kabupaten", e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="border p-3">
                  <input
                    type="text"
                    defaultValue={hospital.provinsi}
                    onBlur={(e) => handleUpdate("hospitals", hospital.id, "provinsi", e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="border p-3">
                  <button
                    onClick={() => handleDelete("hospitals", hospital.id)}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Doctors</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 text-left text-gray-700">Name</th>
              <th className="border p-3 text-left text-gray-700">Hospital</th>
              <th className="border p-3 text-left text-gray-700">Section</th>
              <th className="border p-3 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id} className="hover:bg-gray-50 transition-colors">
                <td className="border p-3">
                  <input
                    type="text"
                    defaultValue={doctor.nama_dokter}
                    onBlur={(e) => handleUpdate("doctors", doctor.id, "nama_dokter", e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="border p-3">
                  <select
                    defaultValue={doctor.id_rs}
                    onChange={(e) => handleUpdate("doctors", doctor.id, "id_rs", e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {hospitals.map((hospital) => (
                      <option key={hospital.id} value={hospital.id}>
                        {hospital.nama_rs}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border p-3">
                  <select
                    defaultValue={doctor.id_poli}
                    onChange={(e) => handleUpdate("doctors", doctor.id, "id_poli", e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {sections.map((section) => (
                      <option key={section.id} value={section.id}>
                        {section.nama_poli}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border p-3">
                  <button
                    onClick={() => handleDelete("doctors", doctor.id)}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;