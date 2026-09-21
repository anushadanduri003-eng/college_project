import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar, 
  Clock, 
  Building2, 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Tag, 
  MapPin, 
  Phone, 
  Sparkles,
  CalendarDays,
  UserCheck,
  Megaphone,
  HeartHandshake,
  Image as ImageIcon,
  ArrowLeft,
  X
} from 'lucide-react';
import { EventItem } from '../../types';

export const EventManagementPage: React.FC = () => {
  const { 
    events, 
    openBookingModal, 
    currentUser, 
    openLoginRequired, 
    openUploadEventModal,
    goBack,
    closePage 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'Upcoming' | "Today" | 'Completed'>('Upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBlock, setSelectedBlock] = useState<string>('ALL');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('ALL');

  // Filter list
  const filteredEvents = events.filter(evt => {
    // Tab match
    const matchesTab = evt.status === activeTab;
    // Block match
    const matchesBlock = selectedBlock === 'ALL' || evt.block === selectedBlock;
    // Dept match
    const matchesDept = selectedDepartment === 'ALL' || evt.department === selectedDepartment;
    // Search match
    const matchesSearch = searchQuery === '' ||
      evt.event_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.department.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesBlock && matchesDept && matchesSearch;
  });

  const departments = [
    'Computer Science & Engineering',
    'Electronics & Communication Engineering',
    'Mechanical Engineering',
    'Electrical & Electronics Engineering',
    'Civil Engineering',
    'Information Technology',
    'AI & Data Science',
    'MBA',
    'NSS Unit & Red Cross Society'
  ];

  const handleAddEvent = () => {
    if (!currentUser) {
      openLoginRequired('Please sign in to schedule an institutional event.', () => {
        openBookingModal();
      });
    } else {
      openBookingModal();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <button
                id="btn-events-back"
                onClick={goBack}
                className="inline-flex items-center space-x-1 px-2.5 py-1 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-800 rounded-md text-xs font-bold border border-slate-300 transition-colors cursor-pointer shadow-2xs"
                title="Go Back"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-blue-700" />
                <span>Back</span>
              </button>
              <button
                id="btn-events-close"
                onClick={closePage}
                className="inline-flex items-center space-x-1 px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-700 rounded-md text-xs font-bold border border-red-200 transition-colors cursor-pointer shadow-2xs"
                title="Close Page (Wrong symbol ✕)"
                aria-label="Close page"
              >
                <span>Close</span>
                <X className="w-3.5 h-3.5 text-red-700 stroke-[3]" />
              </button>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest pl-1">
                Centralized Scheduling & Announcements
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              College Event Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Directory of technical symposiums, blood camps, drives, guest talks, and academic examinations
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
            {/* Upload Event Button */}
            <button
              onClick={() => openUploadEventModal()}
              className="inline-flex items-center space-x-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg shadow-xs transition-colors cursor-pointer"
              title="Upload event notice (e.g. Blood Donation Camp in Block-4)"
            >
              <Megaphone className="w-4 h-4 text-emerald-200" />
              <span>Upload / Announce Event</span>
            </button>

            {/* Schedule Slot */}
            <button
              onClick={handleAddEvent}
              className="inline-flex items-center space-x-2 px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Book Seminar Hall</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-white rounded-t-xl px-4 pt-3 space-x-2 shadow-xs">
          {[
            { id: 'Upcoming', label: 'Upcoming Events', count: events.filter(e => e.status === 'Upcoming').length },
            { id: 'Today', label: "Today's Events", count: events.filter(e => e.status === 'Today').length },
            { id: 'Completed', label: 'Completed Archive', count: events.filter(e => e.status === 'Completed').length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-blue-700 text-blue-700'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                activeTab === tab.id ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-b-xl border border-slate-200 p-4 -mt-6 shadow-xs space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {/* Search */}
            <div className="sm:col-span-2 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search event title, organizer or keywords..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
              />
            </div>

            {/* Hall Filter */}
            <div>
              <select
                value={selectedBlock}
                onChange={e => setSelectedBlock(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium"
              >
                <option value="ALL">All Seminar Halls</option>
                <option value="Block-2">Block-2 Seminar Hall</option>
                <option value="Block-3">Block-3 Seminar Hall</option>
                <option value="Block-4">Block-4 Seminar Hall</option>
              </select>
            </div>

            {/* Department Filter */}
            <div>
              <select
                value={selectedDepartment}
                onChange={e => setSelectedDepartment(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium truncate"
              >
                <option value="ALL">All Departments</option>
                {departments.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Events Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.length === 0 ? (
            <div className="col-span-full py-16 text-center bg-white rounded-xl border border-slate-200">
              <CalendarDays className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <h3 className="font-bold text-slate-700 text-sm">No Events Found</h3>
              <p className="text-xs text-slate-500 mt-1">
                There are no {activeTab.toLowerCase()} events matching the specified filters.
              </p>
            </div>
          ) : (
            filteredEvents.map(evt => (
              <div
                key={evt.id}
                className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                {/* Optional Event Banner Image */}
                {evt.image && (
                  <div className="relative h-36 w-full bg-slate-100 overflow-hidden">
                    <img 
                      src={evt.image} 
                      alt={evt.event_name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-3 right-3 text-white text-xs font-bold truncate">
                      {evt.event_name}
                    </div>
                  </div>
                )}

                <div className="p-5">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                      evt.category.includes('Blood') || evt.category.includes('Social')
                        ? 'bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {evt.category.includes('Blood') && <HeartHandshake className="w-3 h-3 text-rose-600" />}
                      {evt.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded font-bold text-xs bg-amber-100 text-amber-900 border border-amber-200">
                      {evt.block} Ground Floor
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 tracking-tight line-clamp-2">
                    {evt.event_name}
                  </h3>

                  <p className="text-xs font-semibold text-blue-700 mt-1">
                    {evt.department}
                  </p>

                  {/* Schedule info */}
                  <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                      <span className="font-bold text-slate-900">{evt.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{evt.start_time} - {evt.end_time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Venue: <strong className="text-slate-900">{evt.hall_name}</strong></span>
                    </div>
                    {evt.description && (
                      <p className="text-[11px] text-slate-500 italic pt-1">
                        "{evt.description}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer / Organizer */}
                <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold uppercase">Organizer</span>
                    <span className="font-bold text-slate-800">{evt.organizer}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-bold uppercase">Venue</span>
                    <span className="font-semibold text-blue-900">{evt.block}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
