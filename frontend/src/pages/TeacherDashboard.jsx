import React, { useState } from 'react';
import { Users, MessageSquare, Calendar, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TeacherDashboard = () => {
  const { t } = useTranslation();
  // Sample student data
  const [students, setStudents] = useState([
    { id: 1, name: "Alex Johnson", grade: "10th", attendance: "present", lastAttendance: "2024-02-23", remarks: "" },
    { id: 2, name: "Sarah Williams", grade: "10th", attendance: "absent", lastAttendance: "2024-02-23", remarks: "" },
    { id: 3, name: "Michael Brown", grade: "10th", attendance: "present", lastAttendance: "2024-02-23", remarks: "" }
  ]);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [remarkText, setRemarkText] = useState("");

  const handleAttendanceChange = (studentId, status) => {
    setStudents(students.map(student =>
      student.id === studentId 
        ? { ...student, attendance: status, lastAttendance: new Date().toISOString().split('T')[0] }
        : student
    ));
  };

  const handleRemarkSubmit = (studentId) => {
    setStudents(students.map(student =>
      student.id === studentId 
        ? { ...student, remarks: remarkText }
        : student
    ));
    setRemarkText("");
    setSelectedStudent(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-purple-800">
      {/* Top Navigation */}
      <nav className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-300" />
              <span className="ml-2 text-xl font-semibold text-white">
                {t("teacherDashboard.nav.title")}
              </span>
            </div>
            <button className="flex items-center text-purple-300 hover:text-white transition-colors">
              <LogOut className="h-5 w-5 mr-2" />
              {t("teacherDashboard.nav.logout")}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
            <div className="flex items-center">
              <Users className="h-10 w-10 text-purple-300" />
              <div className="ml-4">
                <h3 className="text-white text-lg font-semibold">
                  {t("teacherDashboard.stats.totalStudents")}
                </h3>
                <p className="text-purple-200 text-2xl">{students.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
            <div className="flex items-center">
              <Calendar className="h-10 w-10 text-purple-300" />
              <div className="ml-4">
                <h3 className="text-white text-lg font-semibold">
                  {t("teacherDashboard.stats.presentToday")}
                </h3>
                <p className="text-purple-200 text-2xl">
                  {students.filter(s => s.attendance === 'present').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
            <div className="flex items-center">
              <MessageSquare className="h-10 w-10 text-purple-300" />
              <div className="ml-4">
                <h3 className="text-white text-lg font-semibold">
                  {t("teacherDashboard.stats.remarksGiven")}
                </h3>
                <p className="text-purple-200 text-2xl">
                  {students.filter(s => s.remarks).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Student List */}
        <div className="bg-white/10 backdrop-blur-lg rounded-lg border border-white/20">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              {t("teacherDashboard.studentList.title")}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-purple-200 border-b border-white/20">
                    <th className="text-left py-3 px-4">
                      {t("teacherDashboard.studentList.columns.name")}
                    </th>
                    <th className="text-left py-3 px-4">
                      {t("teacherDashboard.studentList.columns.grade")}
                    </th>
                    <th className="text-left py-3 px-4">
                      {t("teacherDashboard.studentList.columns.attendance")}
                    </th>
                    <th className="text-left py-3 px-4">
                      {t("teacherDashboard.studentList.columns.lastUpdated")}
                    </th>
                    <th className="text-left py-3 px-4">
                      {t("teacherDashboard.studentList.columns.actions")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(student => (
                    <tr key={student.id} className="border-b border-white/10">
                      <td className="py-3 px-4 text-white">{student.name}</td>
                      <td className="py-3 px-4 text-purple-200">{student.grade}</td>
                      <td className="py-3 px-4">
                        <select
                          value={student.attendance}
                          onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
                          className="bg-white/10 text-purple-200 rounded px-2 py-1 border border-white/20"
                        >
                          <option value="present">{t("attendance.present")}</option>
                          <option value="absent">{t("attendance.absent")}</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-purple-200">{student.lastAttendance}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => setSelectedStudent(student)}
                          className="text-purple-300 hover:text-white transition-colors"
                        >
                          {t("teacherDashboard.studentList.addRemark")}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Remarks Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-indigo-900 rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold text-white mb-4">
              {t("teacherDashboard.remarksModal.title")} {selectedStudent.name}
            </h3>
            <textarea
              value={remarkText}
              onChange={(e) => setRemarkText(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white mb-4"
              rows="4"
              placeholder={t("teacherDashboard.remarksModal.placeholder")}
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 text-purple-200 hover:text-white transition-colors"
              >
                {t("teacherDashboard.remarksModal.cancel")}
              </button>
              <button
                onClick={() => handleRemarkSubmit(selectedStudent.id)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
              >
                {t("teacherDashboard.remarksModal.submit")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
