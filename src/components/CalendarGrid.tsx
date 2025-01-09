import React, { useState, useEffect } from 'react';
import { getDaysInMonth, getFirstDayOfMonth } from '../utils/dateHelpers';
import { Button } from './ui/button';
import { Pencil } from 'lucide-react'; // Import pencil icon from lucide-react

interface Event {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  description: string;
}

interface CalendarGridProps {
  events: Record<string, Event[]>;
  selectedDate: string | null;
  onDateSelect: (date: string) => void;
  onEditClick: () => void;
  onEditEvent: (event: Event) => void;
  onDeleteEvent: (date: string, eventId: string) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  events,
  selectedDate,
  onDateSelect,
  onEditClick,
  onDeleteEvent,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const formatDate = (day: number) =>
    `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // Today's date as YYYY-MM-DD
    if (!selectedDate) {
      onDateSelect(today); // Set today's date by default
    }
  }, [selectedDate, onDateSelect]);

  const today = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format

  return (
    <div className="grid grid-cols-3 gap-4 pt-4">
      <div className="col-span-2">
        <div className="flex justify-between mb-4">
          <Button className="btn" onClick={handlePrevMonth}>
            Previous
          </Button>
          <h2 className="text-xl font-bold">
            {currentDate.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <Button className="btn" onClick={handleNextMonth}>
            Next
          </Button>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center font-semibold pb-2">
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2 border p-4">
          {Array.from({ length: firstDay }, (_, i) => (
            <div key={i} />
          ))}
          {Array.from({ length: daysInMonth }, (_, day) => {
            const date = formatDate(day + 1);
            const isToday = date === today; // Check if the date is today
            return (
              <button
                key={date}
                onClick={() => onDateSelect(date)}
                className={`p-2 border rounded hover:bg-blue-100 h-[60px] ${
                  selectedDate === date ? 'bg-blue-200 font-bold' : ''
                } ${isToday ? 'bg-green-300 font-bold' : ''}`} // Highlight today's date with a yellow background
              >
                <span>{day + 1}</span>
                {events[date]?.length > 0 && (
                  <span className="block text-xs text-red-500">{events[date].length} events</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
      <div className="col-span-1 border p-4 rounded">
        {selectedDate && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Events on {selectedDate}</h3>
              <button onClick={onEditClick} className="text-blue-500 hover:underline">
                <Pencil className="w-5 h-5 inline-block" />
              </button>
            </div>
            {events[selectedDate]?.length > 0 ? (
              <ul>
                {events[selectedDate].map((event) => (
                  <li key={event.id} className="p-2 border rounded mb-2 flex items-start justify-between px-4">
                    <div>
                      <span className="font-semibold">{event.name}</span>
                      <br />
                      <span className="text-sm">
                        {event.startTime} - {event.endTime}
                      </span>
                      <p className="text-sm text-gray-600">{event.description}</p>
                    </div>
                    <Button
                      onClick={() => onDeleteEvent( event.id,selectedDate)}
                      className="text-red-500 hover:underline mt-2 bg-white hover:bg-slate-50"
                    >
                      Delete
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No events for this day. Click the pencil icon to add one.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarGrid;
