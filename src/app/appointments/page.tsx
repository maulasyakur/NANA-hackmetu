// pages/appointments.tsx
"use client"

import { getAppointment } from '@/lib/get_appointments';
import pool from '@/lib/pool';
import React, { useEffect, useState } from 'react';

interface Appointment {
  patientName: string;
  hospitalName: string;
  sectionName: string;
  date: string;
  time: string;
  queueNumber: string;
}

const AppointmentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage] = useState<number>(5); // Number of rows per page
  const [appointmentsData, setAppointmentsData] = useState<Appointment[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAppointment()

        const formattedAppointments = data.map((appointment, index) => ({
            patientName: appointment.nama_lengkap,
            hospitalName: appointment.nama_rs,
            sectionName: appointment.nama_poli,
            time: appointment.waktu_appointment.toISOString().split('T')[1].slice(0, 5),
            date: appointment.waktu_appointment.toISOString().split('T')[0],
            queueNumber: `${index + 1}` // You can modify the queue number logic if needed
        }));
        
        setAppointmentsData(formattedAppointments)
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    }
  
    fetchData();
  }, []); // Empty dependency array to run only on mount

  // Filter appointments based on search term and selected filter category
  const filteredAppointments = appointmentsData.filter((appointment) => {
    const lowerSearchTerm = searchTerm.toLowerCase();

    // If filter category is 'all', search across all fields
    if (filterCategory === 'all') {
      return (
        appointment.patientName.toLowerCase().includes(lowerSearchTerm) ||
        appointment.hospitalName.toLowerCase().includes(lowerSearchTerm) ||
        appointment.sectionName.toLowerCase().includes(lowerSearchTerm) ||
        appointment.date.toLowerCase().includes(lowerSearchTerm) ||
        appointment.time.toLowerCase().includes(lowerSearchTerm) ||
        appointment.queueNumber.toLowerCase().includes(lowerSearchTerm)
      );
    }

    // Filter based on selected filter category
    return appointment[filterCategory as keyof Appointment]
      .toString()
      .toLowerCase()
      .includes(lowerSearchTerm);
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredAppointments.length / rowsPerPage);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentAppointments = filteredAppointments.slice(indexOfFirstRow, indexOfLastRow);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">Patient Appointments</h1>
      
      {/* Search and Filter Controls */}
      <div className="mb-6 flex space-x-4 text-black">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 w-72 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Fields</option>
          <option value="patientName">Patient Name</option>
          <option value="hospitalName">Hospital Name</option>
          <option value="sectionName">Section Name</option>
          <option value="date">Date</option>
          <option value="time">Time</option>
          <option value="queueNumber">Queue Number</option>
        </select>
      </div>

      {/* Table */}
      <table className="w-full max-w-6xl border-collapse shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-600 text-white text-left">
            <th className="px-6 py-3 text-sm font-medium">Patient Name</th>
            <th className="px-6 py-3 text-sm font-medium">Hospital Name</th>
            <th className="px-6 py-3 text-sm font-medium">Section Name</th>
            <th className="px-6 py-3 text-sm font-medium">Date of Appointment</th>
            <th className="px-6 py-3 text-sm font-medium">Time of Appointment</th>
            <th className="px-6 py-3 text-sm font-medium">Queue Number</th>
          </tr>
        </thead>
        <tbody>
          {currentAppointments.map((appointment, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              } border-t border-b border-gray-200`}
            >
              <td className="px-6 py-4 text-sm text-gray-700">{appointment.patientName}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{appointment.hospitalName}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{appointment.sectionName}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{appointment.date}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{appointment.time}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{appointment.queueNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-6 flex items-center space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
        >
          Previous
        </button>

        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AppointmentsPage;
