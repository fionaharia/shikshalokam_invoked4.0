import React from 'react';
import { Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function UpcomingEvents() {
  const { t } = useTranslation();
  const events = [
    {
      id: 1,
      name: "Annual Day",
      date: "2025-03-01",
      description: "Celebration of achievements and performances.",
    },
    {
      id: 2,
      name: "Parent-Teacher Meeting",
      date: "2025-03-10",
      description: "Discuss student progress and concerns.",
    },
  ];

  return (
    <div className="bg-white/90 backdrop-blur-xl border border-white/90 shadow-xl rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {t("upcomingEvents.title")}
        </h2>
        <Calendar className="w-5 h-5 text-purple-500" />
      </div>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="p-4 bg-gray-50 rounded-xl">
            <h3 className="font-bold text-gray-900">{event.name}</h3>
            <p className="text-xs text-gray-500">
              {t("upcomingEvents.dateLabel")} {event.date}
            </p>
            <p className="text-sm text-gray-600 mt-1">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
