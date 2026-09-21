import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Calendar, 
  Clock, 
  Building2, 
  Users, 
  Sparkles, 
  HeartHandshake, 
  Megaphone, 
  Upload, 
  Image as ImageIcon,
  CheckCircle2,
  FileText,
  UserCheck
} from 'lucide-react';
import { EventItem, EventType } from '../../types';

export const UploadEventModal: React.FC = () => {
  const {
    isUploadEventModalOpen,
    closeUploadEventModal,
    addEvent,
    halls,
    currentUser,
    showToast
  } = useApp();

  const [eventName, setEventName] = useState('Annual Blood Donation Camp 2026');
  const [block, setBlock] = useState<'Block-2' | 'Block-3' | 'Block-4'>('Block-4');
  const [department, setDepartment] = useState('NSS Unit & Youth Red Cross');
  const [category, setCategory] = useState<EventType>('Blood Donation Camp / Social Drive');
  const [date, setDate] = useState('2026-09-22');
  const [startTime, setStartTime] = useState('09:00 AM');
  const [endTime, setEndTime] = useState('03:30 PM');
  const [organizer, setOrganizer] = useState(currentUser?.name || 'Prof. P. Ramesh (NSS Coordinator)');
  const [contactNumber, setContactNumber] = useState(currentUser?.phone || '+91 98480 55667');
  const [audience, setAudience] = useState<number>(180);
  const [description, setDescription] = useState(
    'Mega Blood Donation Camp will be held in Block-4 Ground Floor Seminar Hall. Organized with the Red Cross Society. All students, faculty, and staff are invited to donate blood and save lives.'
  );
  const [posterUrl, setPosterUrl] = useState(
    'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80'
  );

  if (!isUploadEventModalOpen) return null;

  const selectedHall = halls.find(h => h.block === block);

  const handleQuickTemplate = (type: 'blood' | 'workshop' | 'placement') => {
    if (type === 'blood') {
      setEventName('Mega Blood Donation Camp 2026');
      setBlock('Block-4');
      setCategory('Blood Donation Camp / Social Drive');
      setDepartment('NSS Unit & Youth Red Cross');
      setDescription('Mega Blood Donation Camp will be held in Block-4 Ground Floor Seminar Hall. Donors will receive certificates, donor cards, health checkup, and refreshments.');
      setPosterUrl('https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80');
      setAudience(180);
    } else if (type === 'workshop') {
      setEventName('AI & Cloud Computing Hands-on Workshop');
      setBlock('Block-3');
      setCategory('Workshop');
      setDepartment('Computer Science & Engineering');
      setDescription('Comprehensive hands-on workshop on generative AI architectures and cloud microservices in Block-3 Ground Floor Seminar Hall.');
      setPosterUrl('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80');
      setAudience(180);
    } else {
      setEventName('Annual Placement & Corporate Leadership Summit');
      setBlock('Block-2');
      setCategory('Placement Drive');
      setDepartment('Training & Placement Cell');
      setDescription('Interactive orientation with hiring managers and corporate leaders from multinational tech firms.');
      setPosterUrl('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80');
      setAudience(180);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPosterUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!eventName.trim()) {
      showToast('Please enter an event title.', 'error');
      return;
    }

    if (!date) {
      showToast('Please select the event date.', 'error');
      return;
    }

    const hall = halls.find(h => h.block === block);
    const hallId = hall?.id || `hall-${block.toLowerCase().replace('-', '')}`;
    const hallName = hall?.hall_name || `${block} Seminar Hall`;

    const newEventData = {
      event_name: eventName.trim(),
      department,
      date,
      start_time: startTime,
      end_time: endTime,
      hall_id: hallId,
      hall_name: hallName,
      block,
      organizer: organizer.trim(),
      description: description.trim(),
      category,
      audience: Number(audience) || 180,
      image: posterUrl
    };

    addEvent(newEventData);
    closeUploadEventModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/50 border border-blue-400/40 flex items-center justify-center shadow-xs">
              <Megaphone className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-tight text-white flex items-center gap-2">
                <span>Upload &amp; Announce College Event</span>
                <span className="text-[10px] uppercase font-black bg-amber-400 text-slate-950 px-2 py-0.5 rounded shadow-xs">
                  Official Portal
                </span>
              </h3>
              <p className="text-xs text-blue-200">
                Publish events like Blood Donation Camps, Technical Symposiums, or Workshops
              </p>
            </div>
          </div>
          <button
            onClick={closeUploadEventModal}
            className="p-1.5 rounded-full hover:bg-white/10 text-blue-200 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Fill Buttons */}
        <div className="bg-blue-50/70 px-6 py-2.5 border-b border-blue-100 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold text-blue-900 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Quick Templates:
          </span>
          <button
            type="button"
            onClick={() => handleQuickTemplate('blood')}
            className="px-2.5 py-1 bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold rounded text-[11px] transition-colors cursor-pointer border border-rose-200 flex items-center gap-1"
          >
            <HeartHandshake className="w-3 h-3 text-rose-600" />
            <span>Blood Camp (Block-4)</span>
          </button>
          <button
            type="button"
            onClick={() => handleQuickTemplate('workshop')}
            className="px-2.5 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold rounded text-[11px] transition-colors cursor-pointer border border-blue-200"
          >
            AI Workshop (Block-3)
          </button>
          <button
            type="button"
            onClick={() => handleQuickTemplate('placement')}
            className="px-2.5 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold rounded text-[11px] transition-colors cursor-pointer border border-amber-200"
          >
            Placement Drive (Block-2)
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Event Name */}
          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1">
              Event Title / Program Name *
            </label>
            <input
              type="text"
              required
              value={eventName}
              onChange={e => setEventName(e.target.value)}
              placeholder="e.g. Mega Blood Donation Camp 2026"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none font-medium"
            />
          </div>

          {/* Block / Venue Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                Venue / Seminar Hall Block *
              </label>
              <select
                value={block}
                onChange={e => setBlock(e.target.value as any)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white font-semibold text-blue-950"
              >
                <option value="Block-4">Block-4 Seminar Hall (Ground Floor • 180 Seats)</option>
                <option value="Block-3">Block-3 Seminar Hall (Ground Floor • 180 Seats)</option>
                <option value="Block-2">Block-2 Seminar Hall (Ground Floor • 180 Seats)</option>
              </select>
              <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                <Building2 className="w-3 h-3 text-blue-600" />
                All 3 Seminar Halls are on the <strong>Ground Floor</strong> (Capacity: 180).
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                Event Category *
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
              >
                <option value="Blood Donation Camp / Social Drive">Blood Donation Camp / Social Drive</option>
                <option value="Technical Symposium">Technical Symposium</option>
                <option value="Workshop">Workshop</option>
                <option value="National Seminar">National Seminar</option>
                <option value="Faculty Development Program">Faculty Development Program</option>
                <option value="Guest Lecture">Guest Lecture</option>
                <option value="Placement Drive">Placement Drive</option>
                <option value="Cultural Event">Cultural Event</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Department & Organizer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                Organizing Department / Club *
              </label>
              <input
                type="text"
                required
                value={department}
                onChange={e => setDepartment(e.target.value)}
                placeholder="e.g. NSS Unit & Youth Red Cross"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                Faculty / Student Incharge *
              </label>
              <input
                type="text"
                required
                value={organizer}
                onChange={e => setOrganizer(e.target.value)}
                placeholder="e.g. Prof. P. Ramesh"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                Event Date *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                Start Time *
              </label>
              <input
                type="text"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                placeholder="09:00 AM"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                End Time *
              </label>
              <input
                type="text"
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                placeholder="04:00 PM"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Audience & Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                Expected Participants / Donors
              </label>
              <input
                type="number"
                min={10}
                max={180}
                value={audience}
                onChange={e => setAudience(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
              <span className="text-[10px] text-slate-400">Ground floor hall seating capacity: 180</span>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                Coordinator Phone Number
              </label>
              <input
                type="text"
                value={contactNumber}
                onChange={e => setContactNumber(e.target.value)}
                placeholder="+91 98480 55667"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1">
              Event Description &amp; Instructions *
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Provide details about the event, chief guest, donor rewards, and instructions..."
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          {/* Poster Image */}
          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1.5 flex items-center justify-between">
              <span>Event Banner / Poster Photo (Optional)</span>
              <span className="text-[10px] text-slate-400">File upload or URL link</span>
            </label>
            <div className="flex items-center gap-3">
              {posterUrl && (
                <img
                  src={posterUrl}
                  alt="Poster Preview"
                  className="w-16 h-12 object-cover rounded-lg border border-slate-200 shrink-0"
                />
              )}
              <div className="flex-1 space-y-1.5">
                <input
                  type="url"
                  value={posterUrl}
                  onChange={e => setPosterUrl(e.target.value)}
                  placeholder="https://example.com/poster.jpg"
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
                <label className="inline-flex items-center space-x-1 text-[11px] text-blue-700 hover:text-blue-900 font-bold cursor-pointer">
                  <Upload className="w-3 h-3" />
                  <span>Choose local file from device</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Notice */}
          <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-200 text-[11px] text-blue-950 flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <span>
              Once uploaded, this event will be published across the NEC Portal, broadcasted to campus coordinators, and displayed on the college public calendar.
            </span>
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={closeUploadEventModal}
              className="px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition-colors flex items-center space-x-1.5 cursor-pointer"
            >
              <Megaphone className="w-4 h-4" />
              <span>Publish Event Announcement</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
