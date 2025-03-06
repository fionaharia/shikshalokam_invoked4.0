import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function TeacherRemarks() {
  const { t } = useTranslation();
  const remarks = [
    {
      id: 1,
      studentId: "101",
      teacherId: "T1",
      teacherName: t("teacherRemarks.teachers.msJohnson"),
      date: "2025-02-20",
      description: t("teacherRemarks.comments.excellent"),
      subject: t("subjects.math")
    },
    {
      id: 2,
      studentId: "102",
      teacherId: "T2",
      teacherName: t("teacherRemarks.teachers.mrSmith"),
      date: "2025-02-21",
      description: t("teacherRemarks.comments.needsImprovement"),
      subject: t("subjects.physics")
    },
  ];
  
  return (
    <div className="bg-white/90 backdrop-blur-xl border border-white/90 shadow-xl rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {t("teacherRemarks.title")}
        </h2>
        <MessageCircle className="w-5 h-5 text-purple-500" />
      </div>
      <div className="space-y-4">
        {remarks.map((remark) => (
          <div key={remark.id} className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-medium">
                    {remark.teacherName.charAt(0)}
                  </span>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">
                    {remark.teacherName}
                  </h3>
                  <p className="text-xs text-gray-500">{remark.subject}</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">{remark.date}</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">{remark.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}