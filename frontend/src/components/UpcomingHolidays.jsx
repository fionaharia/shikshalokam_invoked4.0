import React from 'react';
import { Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function UpcomingHolidays() {
  const { t } = useTranslation();
  const holidays = [
    {
      id: 1,
      name: "Spring Break",
      startDate: "2025-03-15",
      endDate: "2025-03-20",
      description: "Enjoy your spring break!",
    },
    {
      id: 2,
      name: "Summer Vacation",
      startDate: "2025-06-01",
      endDate: "2025-06-15",
      description: "Time for a well-deserved break.",
    },
  ];

  return (
    <div className="bg-white/90 backdrop-blur-xl border border-white/90 shadow-xl rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {t("upcomingHolidays.title")}
        </h2>
        <Calendar className="w-5 h-5 text-purple-500" />
      </div>
      <ul className="space-y-4">
        {holidays.map((holiday) => (
          <li key={holiday.id} className="p-4 bg-gray-50 rounded-xl">
            <h3 className="font-bold text-gray-900">{holiday.name}</h3>
            <p className="text-sm text-gray-500">
              {holiday.startDate} {t("upcomingHolidays.to")} {holiday.endDate}
            </p>
            <p className="text-sm text-gray-600">{holiday.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
