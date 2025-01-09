import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

interface Event {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  description?: string;
}

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Event) => void;
  initialData?: Partial<Event>;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, onSave, initialData = {} }) => {
  const [name, setName] = useState(initialData.name || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [startTime, setStartTime] = useState(initialData.startTime || '');
  const [endTime, setEndTime] = useState(initialData.endTime || '');

  const handleSave = () => {
    if (!name || !startTime || !endTime) return alert('All fields except description are required.');

    const newEvent: Event = {
      id: Date.now(),
      name,
      description,
      startTime,
      endTime,
    };

    onSave(newEvent);
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content className="fixed bg-white p-6 rounded shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96">
          <Dialog.Title className="text-xl font-bold mb-4">{initialData.id ? 'Edit Event' : 'Add Event'}</Dialog.Title>
          <div className="mb-2">
            <label className="block">Event Name</label>
            <input
              type="text"
              className="input w-full border p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="block">Start Time</label>
            <input
              type="time"
              className="input w-full border p-2 rounded"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="block">End Time</label>
            <input
              type="time"
              className="input w-full border p-2 rounded"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="block">Description</label>
            <textarea
              className="input w-full border p-2 rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button className="btn mr-2 border rounded px-4 py-2" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary bg-blue-500 text-white rounded px-4 py-2" onClick={handleSave}>
              Save
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EventModal;
