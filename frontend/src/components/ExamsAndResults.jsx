import React from 'react';
import { Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ExamsAndResults() {
  const { t } = useTranslation();
  const exams = [
    {
      id: 1,
      studentName: t("examsAndResults.students.johnDoe"),
      studentId: "101",
      subject: t("subjects.math"),
      examType: t("examsAndResults.examTypes.midTerm"),
      examDate: "2025-02-15",
      maxMarks: 100,
      obtainedMarks: 85,
      grade: "A",
    },
    {
      id: 2,
      studentName: t("examsAndResults.students.janeSmith"),
      studentId: "102",
      subject: t("subjects.science"),
      examType: t("examsAndResults.examTypes.final"),
      examDate: "2025-03-10",
      maxMarks: 100,
      obtainedMarks: 78,
      grade: "B+",
    },
  ];
  
  return (
    <div className="bg-white/90 backdrop-blur-xl border border-white/90 shadow-xl rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {t("examsAndResults.title")}
        </h2>
        <Award className="w-5 h-5 text-purple-500" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-purple-100 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
                {t("examsAndResults.table.student")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
                {t("examsAndResults.table.subject")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
                {t("examsAndResults.table.examType")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
                {t("examsAndResults.table.marks")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
                {t("examsAndResults.table.grade")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {exams.map((exam) => (
              <tr key={exam.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {exam.studentName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {t("examsAndResults.idLabel")} {exam.studentId}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {exam.subject}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{exam.examType}</div>
                  <div className="text-sm text-gray-500">{exam.examDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {exam.obtainedMarks}/{exam.maxMarks}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                    {exam.grade}
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