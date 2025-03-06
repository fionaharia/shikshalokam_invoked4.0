import React from 'react';
import { Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function UpcomingHolidays() {
  const { t } = useTranslation();
  const holidays = [
    {
      id: 1,
      nameKey: "springBreak", // Note the capital 'S' to match your JSON
      startDate: "2025-03-15",
      endDate: "2025-03-20",
      descriptionKey: "springBreakDescription" // This uses camelCase as in your JSON
    },
    {
      id: 2,
      nameKey: "summerVacation",
      startDate: "2025-06-01",
      endDate: "2025-06-15",
      descriptionKey: "summerVacationDescription"
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
            <h3 className="font-bold text-gray-900">
              {t(`upcomingHolidays.${holiday.nameKey}`)}
            </h3>
            <p className="text-sm text-gray-500">
              {holiday.startDate} {t("upcomingHolidays.to")} {holiday.endDate}
            </p>
            <p className="text-sm text-gray-600">
              {t(`upcomingHolidays.${holiday.descriptionKey}`)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}