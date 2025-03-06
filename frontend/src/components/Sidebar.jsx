import React from 'react';
import { FaUser, FaBook, FaCalendar, FaGraduationCap, FaHome, FaRobot } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

export default function Sidebar({ onNavigate, activeSection }) {
  const { t } = useTranslation();
  return (
    <div className="w-64 bg-gray-900 h-screen p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">{t("sidebar.dashboard")}</h2>
      <ul className="space-y-4">
        <li 
          className={`flex items-center space-x-2 hover:text-gray-300 cursor-pointer ${activeSection === 'home' ? 'text-purple-400' : ''}`}
          onClick={() => onNavigate('home')}
        >
          <FaHome /> <span>{t("sidebar.home")}</span>
        </li>
        <li 
          className={`flex items-center space-x-2 hover:text-gray-300 cursor-pointer ${activeSection === 'attendance' ? 'text-purple-400' : ''}`}
          onClick={() => onNavigate('attendance')}
        >
          <FaUser /> <span>{t("sidebar.attendance")}</span>
        </li>
        <li 
          className={`flex items-center space-x-2 hover:text-gray-300 cursor-pointer ${activeSection === 'summary' ? 'text-purple-400' : ''}`}
          onClick={() => onNavigate('summary')}
        >
          <FaBook /> <span>{t("sidebar.dailySummary")}</span>
        </li>
        <li 
          className={`flex items-center space-x-2 hover:text-gray-300 cursor-pointer ${activeSection === 'events' ? 'text-purple-400' : ''}`}
          onClick={() => onNavigate('events')}
        >
          <FaCalendar /> <span>{t("sidebar.events")}</span>
        </li>
        <li 
          className={`flex items-center space-x-2 hover:text-gray-300 cursor-pointer ${activeSection === 'exams' ? 'text-purple-400' : ''}`}
          onClick={() => onNavigate('exams')}
        >
          <FaGraduationCap /> <span>{t("sidebar.exams")}</span>
        </li>
        <li 
          className={`flex items-center space-x-2 hover:text-gray-300 cursor-pointer ${activeSection === 'chatbot' ? 'text-purple-400' : ''}`}
          onClick={() => onNavigate('chatbot')}
        >
          <FaRobot /> <span>{t("sidebar.chatbot")}</span>
        </li>
      </ul>
    </div>
  );
}
