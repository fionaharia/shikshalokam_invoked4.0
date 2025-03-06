import React from 'react';
import { UserCheck, UserX } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function AttendanceTable() {
  const { t } = useTranslation();
  const attendanceData = [
    { name: "John Doe", rollNo: "101", date: "2025-02-20", status: "Present" },
    { name: "Jane Doe", rollNo: "102", date: "2025-02-20", status: "Absent" },
  ];

  return (
    <div className="bg-purple-100 backdrop-blur-xl border border-white/90 shadow-xl rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">{t("attendance.title")}</h2>
        <div className="flex items-center space-x-4 text-sm">
          <span className="flex items-center text-green-600">
            <UserCheck className="w-4 h-4 mr-1" /> {t("attendance.present")}
          </span>
          <span className="flex items-center text-red-600">
            <UserX className="w-4 h-4 mr-1" /> {t("attendance.absent")}
          </span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-purple-100 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
                {t("attendance.table.name")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
                {t("attendance.table.rollNo")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
                {t("attendance.table.date")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
                {t("attendance.table.status")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {attendanceData.map((student, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.rollNo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      student.status === "Present"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
