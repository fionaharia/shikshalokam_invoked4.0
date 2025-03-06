import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Sidebar from "../components/Sidebar";
import KeyMetrics from "../components/KeyMetrics";
import GraphCards from "../components/GraphCards";
import AttendanceTable from "../components/AttendanceTable";
import DailySummary from "../components/DailySummary";
import UpcomingEvents from "../components/UpcomingEvents";
import ExamsAndResults from "../components/ExamsAndResults";
import UpcomingHolidays from "../components/UpcomingHolidays";
import Assignments from "../components/Assignments";
import Scholarships from "../components/Scholarships";
import TeacherRemarks from "../components/TeacherRemarks";
import Chatbot from "../components/Chatbot";

export default function Dashboard() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState("home");

  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return (
          <>
            <KeyMetrics />
            <GraphCards />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              <AttendanceTable />
              <DailySummary />
              <UpcomingEvents />
              <ExamsAndResults />
              <UpcomingHolidays />
              <Assignments />
              <Scholarships />
              <TeacherRemarks />
            </div>
          </>
        );
      case "attendance":
        return <AttendanceTable className="w-full" />;
      case "summary":
        return <DailySummary className="w-full" />;
      case "events":
        return (
          <div className="space-y-6">
            <UpcomingEvents className="w-full" />
            <UpcomingHolidays className="w-full" />
          </div>
        );
      case "exams":
        return (
          <div className="space-y-6">
            <ExamsAndResults className="w-full" />
            <Assignments className="w-full" />
          </div>
        );
      case "chatbot":
        return <Chatbot />;
      default:
        return null;
    }
  };

  // Map activeSection to a key from your translation file (assuming keys are defined under "sidebar")
  const sectionKey = activeSection === "summary" ? "dailySummary" : activeSection;

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-purple-800 text-white">
      <Sidebar onNavigate={setActiveSection} activeSection={activeSection} />
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-5xl font-bold mb-8">
          {t("sidebar." + sectionKey)}
        </h1>
        {renderContent()}
      </div>
    </div>
  );
}
