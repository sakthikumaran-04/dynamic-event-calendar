import React, { useState, useEffect } from 'react';
import CalendarGrid from './components/CalendarGrid';
import EventModal from './components/EventModal';
import { Upload } from 'lucide-react'; // Import the upload icon for the button
const App: React.FC = () => {
  const [events, setEvents] = useState<Record<string, any[]>>(() => {
    const savedEvents = localStorage.getItem('events');
    return savedEvents ? JSON.parse(savedEvents) : {};
  });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<any | null>(null);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handleSaveEvent = (event: any) => {
    if (!selectedDate) return;

    const newEvent = {
      ...event,
      id: event.id || new Date().toISOString(),
    };

    setEvents((prev) => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] || []), newEvent],
    }));
    setIsModalOpen(false);
  };

  const handleEditEvent = (event: any) => {
    if (!selectedDate) return;
    setCurrentEvent(event);
    setIsModalOpen(true);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const jsonData = JSON.parse(reader.result as string);
        if (Array.isArray(jsonData)) {
          const importedEvents: Record<string, any[]> = {};
          jsonData.forEach((event: any) => {
            const eventDate = event.date;
            if (eventDate) {
              if (!importedEvents[eventDate]) {
                importedEvents[eventDate] = [];
              }
              importedEvents[eventDate].push(event);
            }
          });
          setEvents((prev) => ({ ...prev, ...importedEvents }));
        }
      } catch (error) {
        alert('Failed to import the data. Please make sure the JSON format is correct.');
      }
    };
    reader.readAsText(file);
  };

  const handleDeleteEvent = (eventId: string, eventDate: string) => {
    setEvents((prev) => {
      const updatedEvents = { ...prev };
      if (updatedEvents[eventDate]) {
        updatedEvents[eventDate] = updatedEvents[eventDate].filter(
          (event) => event.id !== eventId
        );
      }

      if (updatedEvents[eventDate]?.length === 0) {
        delete updatedEvents[eventDate];
      }

      return updatedEvents;
    });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between shadow-sm py-4">
        <h1 className="text-center text-2xl font-bold">Dynamic Event Calendar</h1>
        <div className="">
          {/* File Upload Button */}
          <input
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className='flex items-center justify-center gap-2 bg-blue-500 text-white p-2 rounded-md cursor-pointer' >
              <Upload className="w-5 h-5" />
              Import JSON File
          </label>
        </div>
      </div>
      {/* Calendar Grid Component */}
      <CalendarGrid
        events={events}
        selectedDate={selectedDate}
        onDateSelect={(date) => setSelectedDate(date)}
        onEditClick={() => setIsModalOpen(true)}
        onEditEvent={handleEditEvent}
        onDeleteEvent={handleDeleteEvent}
      />
      {/* Event Modal for Adding or Editing Event */}
      {isModalOpen && (
        <EventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveEvent}
          initialData={currentEvent || {}}
        />
      )}
    </div>
  );
};

export default App;
