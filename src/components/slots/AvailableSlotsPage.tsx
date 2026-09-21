import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Building2, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Filter, 
  ArrowRight,
  Info,
  CalendarCheck,
  ArrowLeft,
  X
} from 'lucide-react';

export const AvailableSlotsPage: React.FC = () => {
  const { 
    halls, 
    coordinators, 
    bookings, 
    openBookingModal, 
    currentUser, 
    openLoginRequired,
    goBack,
    closePage 
  } = useApp();

  // Dynamic date state - defaulted to 2026-09-25 or current date
  const [selectedDate, setSelectedDate] = useState('2026-09-25');
  const [selectedBlockFilter, setSelectedBlockFilter] = useState<'ALL' | 'Block-2' | 'Block-3' | 'Block-4'>('ALL');

  // Standard College Time Slots
  const timeSlots = [
    { label: 'Morning Session 1', slot: '09:00 AM – 11:00 AM', start: '09:00 AM', end: '11:00 AM' },
    { label: 'Morning Session 2', slot: '11:00 AM – 01:00 PM', start: '11:00 AM', end: '01:00 PM' },
    { label: 'Afternoon Session 1', slot: '02:00 PM – 04:00 PM', start: '02:00 PM', end: '04:00 PM' },
    { label: 'Evening Session 2', slot: '04:00 PM – 06:00 PM', start: '04:00 PM', end: '06:00 PM' }
  ];

  // Quick date jump helpers
  const quickDates = [
    { label: 'Today (20 Sep)', date: '2026-09-20' },
    { label: '22 Sep 2026', date: '2026-09-22' },
    { label: '23 Sep 2026', date: '2026-09-23' },
    { label: '24 Sep 2026', date: '2026-09-24' },
    { label: '25 Sep 2026', date: '2026-09-25' },
    { label: '26 Sep 2026', date: '2026-09-26' }
  ];

  const getSlotStatus = (block: 'Block-2' | 'Block-3' | 'Block-4', slotStart: string) => {
    // Check if there is an approved booking for this block & date
    const approved = bookings.find(b => 
      b.block === block && 
      b.date === selectedDate && 
      b.start_time === slotStart && 
      b.status === 'APPROVED'
    );

    if (approved) {
      return {
        status: 'BOOKED' as const,
        booking: approved,
        badgeColor: 'bg-red-600 text-white',
        border: 'border-red-200 bg-red-50/40',
        text: 'Booked'
      };
    }

    // Check if there is a pending request
    const pending = bookings.find(b => 
      b.block === block && 
      b.date === selectedDate && 
      b.start_time === slotStart && 
      b.status === 'PENDING'
    );

    if (pending) {
      return {
        status: 'PENDING' as const,
        booking: pending,
        badgeColor: 'bg-amber-500 text-white',
        border: 'border-amber-200 bg-amber-50/40',
        text: 'Pending Approval'
      };
    }

    return {
      status: 'AVAILABLE' as const,
      booking: null,
      badgeColor: 'bg-emerald-600 text-white',
      border: 'border-emerald-200 bg-emerald-50/40',
      text: 'Available'
    };
  };

  const handleBookSlot = (block: 'Block-2' | 'Block-3' | 'Block-4', slotString: string) => {
    if (!currentUser) {
      openLoginRequired(`Login required to book ${block} for ${slotString}.`, () => {
        openBookingModal({
          block,
          date: selectedDate,
          slot: slotString
        });
      });
    } else {
      openBookingModal({
        block,
        date: selectedDate,
        slot: slotString
      });
    }
  };

  const displayedHalls = selectedBlockFilter === 'ALL' 
    ? halls 
    : halls.filter(h => h.block === selectedBlockFilter);

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <button
                  id="btn-slots-back"
                  onClick={goBack}
                  className="inline-flex items-center space-x-1 px-2.5 py-1 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-800 rounded-md text-xs font-bold border border-slate-300 transition-colors cursor-pointer shadow-2xs"
                  title="Go Back"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-blue-700" />
                  <span>Back</span>
                </button>
                <button
                  id="btn-slots-close"
                  onClick={closePage}
                  className="inline-flex items-center space-x-1 px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-700 rounded-md text-xs font-bold border border-red-200 transition-colors cursor-pointer shadow-2xs"
                  title="Close Page (Wrong symbol ✕)"
                  aria-label="Close page"
                >
                  <span>Close</span>
                  <X className="w-3.5 h-3.5 text-red-700 stroke-[3]" />
                </button>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-widest pl-1">
                  Real-Time Schedule Matrix
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Seminar Hall Available Slots
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Select any date to inspect available time intervals across Block-2, Block-3, and Block-4
              </p>
            </div>

            {/* Legend Badges */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span>Green = Available</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>Orange = Pending Request</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-900 border border-rose-300">
                <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                <span>Red = Booked</span>
              </span>
            </div>
          </div>

          {/* Interactive Date & Filter Controls */}
          <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Date Input */}
            <div className="md:col-span-4">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Select Calendar Date:
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={e => setSelectedDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:bg-white"
                />
              </div>
            </div>

            {/* Block Filter Buttons */}
            <div className="md:col-span-5">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Filter by Seminar Hall:
              </label>
              <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-1">
                {(['ALL', 'Block-2', 'Block-3', 'Block-4'] as const).map(b => (
                  <button
                    key={b}
                    onClick={() => setSelectedBlockFilter(b)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                      selectedBlockFilter === b
                        ? 'bg-white text-blue-900 shadow-xs border border-slate-200'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick date jump pills */}
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Quick Jump:
              </label>
              <div className="flex flex-wrap gap-1">
                {quickDates.slice(0, 4).map(qd => (
                  <button
                    key={qd.date}
                    onClick={() => setSelectedDate(qd.date)}
                    className={`px-2 py-1 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                      selectedDate === qd.date
                        ? 'bg-blue-700 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {qd.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Selected Date Notification banner */}
        <div className="p-4 bg-blue-50/80 rounded-xl border border-blue-200 flex items-center justify-between text-xs text-blue-950">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="w-4 h-4 text-blue-700" />
            <span>
              Showing slot availability for date: <strong className="text-blue-900 text-sm">{selectedDate}</strong>
            </span>
          </div>
          <span className="text-[11px] text-blue-700 font-semibold hidden sm:inline">
            Click "Book Slot" to request any available timing
          </span>
        </div>

        {/* Dynamic Grid: One card per Seminar Hall displaying its standard daily slots */}
        <div className="space-y-6">
          {displayedHalls.map(hall => {
            const coordinator = coordinators.find(c => c.block === hall.block);

            return (
              <div
                key={hall.id}
                className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden"
              >
                {/* Hall Header Bar */}
                <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded bg-blue-600 font-extrabold text-xs uppercase tracking-wider">
                        {hall.block}
                      </span>
                      <h3 className="font-extrabold text-lg text-white">
                        {hall.hall_name}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Capacity: {hall.capacity} Seats • Location: {hall.location}
                    </p>
                  </div>

                  <div className="text-xs bg-slate-800/90 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center space-x-2">
                    <span className="text-slate-400">Coordinator:</span>
                    <span className="font-bold text-amber-400">{coordinator?.name}</span>
                  </div>
                </div>

                {/* Slots Grid */}
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {timeSlots.map(ts => {
                    const slotInfo = getSlotStatus(hall.block, ts.start);

                    return (
                      <div
                        key={ts.slot}
                        className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${slotInfo.border}`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                              {ts.label}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full font-black text-[10px] uppercase tracking-wider ${slotInfo.badgeColor}`}>
                              {slotInfo.text}
                            </span>
                          </div>

                          <div className="font-extrabold text-sm text-slate-900 flex items-center space-x-1.5">
                            <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span>{ts.slot}</span>
                          </div>

                          {/* Event info if booked or pending */}
                          {slotInfo.booking && (
                            <div className="mt-2 pt-2 border-t border-slate-200/80 text-xs">
                              <p className="font-semibold text-slate-900 line-clamp-1">
                                {slotInfo.booking.event_name}
                              </p>
                              <p className="text-[11px] text-slate-500 truncate mt-0.5">
                                {slotInfo.booking.department}
                              </p>
                              <p className="text-[10px] text-slate-400 truncate">
                                By: {slotInfo.booking.organizer_name}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Action CTA */}
                        <div className="mt-4 pt-3 border-t border-slate-200/60">
                          {slotInfo.status === 'AVAILABLE' ? (
                            <button
                              onClick={() => handleBookSlot(hall.block, ts.slot)}
                              className="w-full py-2 px-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-lg shadow-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                            >
                              <CalendarCheck className="w-3.5 h-3.5" />
                              <span>Book This Slot</span>
                            </button>
                          ) : slotInfo.status === 'PENDING' ? (
                            <div className="text-center py-1.5 text-xs text-amber-800 font-medium bg-amber-100/60 rounded">
                              Under Review
                            </div>
                          ) : (
                            <div className="text-center py-1.5 text-xs text-rose-800 font-medium bg-rose-100/60 rounded">
                              Reserved by Dept
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
