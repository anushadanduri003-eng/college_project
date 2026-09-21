import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  MapPin, 
  Sparkles, 
  Award, 
  ShieldCheck, 
  UserCheck, 
  CalendarCheck,
  ChevronRight,
  ExternalLink,
  Lock,
  Layers,
  Camera,
  Megaphone
} from 'lucide-react';
import { HallDetailModal } from '../modals/HallDetailModal';

export const HomePage: React.FC = () => {
  const { 
    halls, 
    coordinators, 
    events, 
    bookings, 
    currentUser, 
    openLoginRequired, 
    openAuthModal, 
    openBookingModal, 
    setActiveTab,
    openChangeImageModal,
    openUploadEventModal
  } = useApp();

  const [detailModalHallId, setDetailModalHallId] = useState<string | null>(null);

  // Today's date from context metadata: 2026-09-20
  const todayDateStr = '2026-09-20';

  // Check today's status for each block
  const getBlockTodayStatus = (block: 'Block-2' | 'Block-3' | 'Block-4') => {
    const todayBooking = bookings.find(b => 
      b.block === block && 
      b.date === todayDateStr && 
      b.status === 'APPROVED'
    );
    if (todayBooking) {
      return {
        status: 'BOOKED' as const,
        event: todayBooking.event_name,
        time: `${todayBooking.start_time} - ${todayBooking.end_time}`,
        dept: todayBooking.department
      };
    }
    return {
      status: 'AVAILABLE' as const,
      event: 'No active event scheduled today',
      time: 'Open for all sessions',
      dept: 'General Allocation'
    };
  };

  const handleHallCardClick = (hallId: string) => {
    if (!currentUser) {
      openLoginRequired('Please login or create an account to view hall specifications and book slots.', () => {
        setDetailModalHallId(hallId);
      });
    } else {
      setDetailModalHallId(hallId);
    }
  };

  const handleHeroBookClick = () => {
    if (!currentUser) {
      openLoginRequired('Login required to reserve a seminar hall slot.', () => {
        openBookingModal();
      });
    } else {
      openBookingModal();
    }
  };

  const upcomingEvents = events.filter(e => e.status !== 'Completed').slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ================= HERO SECTION (#2) ================= */}
      <section className="relative bg-gradient-to-b from-blue-950 via-blue-900 to-slate-900 text-white overflow-hidden py-16 sm:py-24 border-b border-blue-800">
        {/* Abstract Academic Background Illustration (No fake logo) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="academic-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#academic-grid)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Academic badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-800/80 border border-blue-500/40 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-6">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Narasaraopeta Engineering College • Central Facility Portal</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Seminar Hall &amp; Event Coordination Portal
            </h1>

            <p className="mt-5 text-base sm:text-xl text-blue-100 font-normal leading-relaxed">
              Plan events, request seminar halls, manage slots and coordinate external faculty arrangements — all in one place.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                id="hero-btn-view-halls"
                onClick={() => {
                  const el = document.getElementById('section-seminar-halls');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-lg bg-white text-blue-950 font-bold text-sm shadow-md hover:bg-blue-50 transition-colors flex items-center space-x-2 cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-blue-700" />
                <span>View Seminar Halls</span>
              </button>

              <button
                id="hero-btn-book-slot"
                onClick={handleHeroBookClick}
                className="px-6 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md transition-colors flex items-center space-x-2 cursor-pointer border border-blue-400/40"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>{currentUser ? 'Book a Slot Now' : 'Login to Book a Slot'}</span>
              </button>

              <button
                onClick={() => setActiveTab('slots')}
                className="px-5 py-3.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-blue-100 font-semibold text-sm transition-colors flex items-center space-x-2 border border-slate-700 cursor-pointer"
              >
                <Clock className="w-4 h-4 text-blue-300" />
                <span>Slot Availability Calendar</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 20: TODAY'S SEMINAR HALL STATUS ================= */}
      <section className="relative -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
                <span>Today's Seminar Hall Status</span>
              </h2>
              <p className="text-xs text-slate-500">
                Live occupancy overview for today ({todayDateStr}) across Block-2, Block-3, and Block-4
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="inline-flex items-center space-x-1 font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                <span>AVAILABLE</span>
              </span>
              <span className="inline-flex items-center space-x-1 font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                <span>BOOKED</span>
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {(['Block-2', 'Block-3', 'Block-4'] as const).map(block => {
              const statusData = getBlockTodayStatus(block);
              const coord = coordinators.find(c => c.block === block);
              const isAvailable = statusData.status === 'AVAILABLE';

              return (
                <div
                  key={block}
                  className={`p-4 rounded-xl border transition-all ${
                    isAvailable 
                      ? 'bg-emerald-50/50 border-emerald-200/80 hover:bg-emerald-50' 
                      : 'bg-rose-50/50 border-rose-200/80 hover:bg-rose-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-extrabold text-slate-900 text-sm tracking-tight">
                      {block} Seminar Hall
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full font-black text-[11px] uppercase tracking-wider ${
                      isAvailable ? 'bg-green-600 text-white shadow-xs' : 'bg-red-600 text-white shadow-xs'
                    }`}>
                      {statusData.status}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1">
                    <p className="font-semibold text-slate-900 line-clamp-1">
                      {statusData.event}
                    </p>
                    <div className="text-[11px] text-slate-500 flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{statusData.time}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Incharge:</span>
                      <span className="font-bold text-blue-900">{coord?.name}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= SECTION 3: SEMINAR HALLS SECTION (#3) ================= */}
      <section id="section-seminar-halls" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-1">
              Campus Infrastructure
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Institutional Seminar Halls
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Three designated multi-purpose seminar halls equipped for symposia, hackathons, and guest lectures
            </p>
          </div>
          <button
            onClick={() => setActiveTab('slots')}
            className="mt-4 md:mt-0 text-xs sm:text-sm font-semibold text-blue-700 hover:text-blue-900 flex items-center space-x-1.5 cursor-pointer"
          >
            <span>View All Date Availability</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Seminar Hall Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {halls.map(hall => {
            const coordinator = coordinators.find(c => c.block === hall.block);

            return (
              <div
                key={hall.id}
                className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Image Container */}
                <div className="relative h-48 w-full bg-slate-200 overflow-hidden group">
                  <img
                    src={hall.image}
                    alt={hall.hall_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-blue-900/90 text-white font-extrabold text-xs px-2.5 py-1 rounded shadow-xs uppercase tracking-wider">
                    {hall.block}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/95 text-slate-800 font-bold text-xs px-2.5 py-1 rounded shadow-xs flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span>{hall.status}</span>
                  </div>

                  {/* Change Hall Photo Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openChangeImageModal(hall);
                    }}
                    className="absolute bottom-2.5 right-2.5 bg-slate-900/80 hover:bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-xs flex items-center space-x-1 backdrop-blur-xs transition-colors cursor-pointer border border-white/20"
                    title={`Personally upload or change image for ${hall.hall_name}`}
                  >
                    <Camera className="w-3 h-3 text-blue-300" />
                    <span>Change Photo</span>
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                      {hall.hall_name}
                    </h3>

                    {/* Coordinator Display */}
                    <div className="mt-2 p-2 rounded-lg bg-blue-50/60 border border-blue-100 flex items-center space-x-2 text-xs">
                      <UserCheck className="w-4 h-4 text-blue-700 shrink-0" />
                      <div>
                        <span className="text-slate-500 text-[10px] uppercase font-bold block">
                          Coordinator
                        </span>
                        <span className="font-bold text-blue-950">
                          {coordinator?.name}
                        </span>
                      </div>
                    </div>

                    {/* Specs Grid */}
                    <div className="mt-3 space-y-2 text-xs text-slate-600">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>
                          Capacity: <strong className="text-slate-900">{hall.capacity}</strong> Seats
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="line-clamp-1">{hall.location}</span>
                      </div>
                    </div>

                    {/* Key Facilities Badges */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {hall.facilities.slice(0, 3).map((f, i) => (
                        <span 
                          key={i}
                          className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-medium rounded"
                        >
                          {f}
                        </span>
                      ))}
                      {hall.facilities.length > 3 && (
                        <span className="px-1.5 py-0.5 text-slate-400 text-[10px] font-medium">
                          +{hall.facilities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      id={`btn-view-details-${hall.block.toLowerCase()}`}
                      onClick={() => handleHallCardClick(hall.id)}
                      className="flex-1 py-2 px-3 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer text-center"
                    >
                      View Details
                    </button>
                    <button
                      id={`btn-book-hall-${hall.block.toLowerCase()}`}
                      onClick={() => {
                        if (!currentUser) {
                          openLoginRequired(`Login required to book ${hall.hall_name}.`, () => {
                            openBookingModal({ block: hall.block });
                          });
                        } else {
                          openBookingModal({ block: hall.block });
                        }
                      }}
                      className="py-2 px-3 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-xs transition-colors cursor-pointer"
                    >
                      Book Slot
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= SECTION 20: UPCOMING EVENTS & AVAILABLE SLOTS ================= */}
      <section className="bg-white border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Upcoming Events */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    Upcoming College Events
                  </h3>
                  <p className="text-xs text-slate-500">
                    Scheduled symposiums, blood camps, drives & workshops across campus blocks
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openUploadEventModal()}
                    className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold shadow-xs flex items-center space-x-1.5 cursor-pointer transition-colors"
                    title="Upload or announce an event (e.g. Blood Camp in Block-4)"
                  >
                    <Megaphone className="w-3.5 h-3.5 text-amber-300" />
                    <span>Upload Event</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('events')}
                    className="text-xs font-bold text-blue-700 hover:underline cursor-pointer"
                  >
                    View All →
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {upcomingEvents.map(evt => (
                  <div
                    key={evt.id}
                    className="p-4 bg-slate-50 hover:bg-blue-50/40 rounded-xl border border-slate-200 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 uppercase">
                          {evt.category}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                          {evt.block}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">{evt.event_name}</h4>
                      <p className="text-xs text-slate-500">
                        {evt.department} • Organizer: {evt.organizer}
                      </p>
                    </div>

                    <div className="text-left sm:text-right shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                      <div className="text-xs font-bold text-slate-900 flex items-center sm:justify-end space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-blue-700" />
                        <span>{evt.date}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center sm:justify-end space-x-1 mt-0.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{evt.start_time} - {evt.end_time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 1 Col: Quick Available Slots Preview & External Faculty Banner */}
            <div className="space-y-6">
              {/* Next Available Slots Widget */}
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm">
                    Next Available Slots
                  </h4>
                  <span className="text-[10px] text-green-700 bg-green-100 px-2 py-0.5 rounded-full font-bold">
                    Open for Booking
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">Block-3 Seminar Hall</div>
                      <div className="text-[11px] text-slate-500">22 Sep 2026 • 02:00 PM – 04:00 PM</div>
                    </div>
                    <button
                      onClick={() => openBookingModal({ block: 'Block-3', date: '2026-09-22', slot: '02:00 PM – 04:00 PM' })}
                      className="px-2.5 py-1 bg-blue-700 hover:bg-blue-800 text-white rounded font-semibold text-[11px] cursor-pointer"
                    >
                      Book
                    </button>
                  </div>

                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">Block-4 Seminar Hall</div>
                      <div className="text-[11px] text-slate-500">24 Sep 2026 • 09:00 AM – 11:00 AM</div>
                    </div>
                    <button
                      onClick={() => openBookingModal({ block: 'Block-4', date: '2026-09-24', slot: '09:00 AM – 11:00 AM' })}
                      className="px-2.5 py-1 bg-blue-700 hover:bg-blue-800 text-white rounded font-semibold text-[11px] cursor-pointer"
                    >
                      Book
                    </button>
                  </div>

                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">Block-2 Seminar Hall</div>
                      <div className="text-[11px] text-slate-500">25 Sep 2026 • 11:00 AM – 01:00 PM</div>
                    </div>
                    <button
                      onClick={() => openBookingModal({ block: 'Block-2', date: '2026-09-25', slot: '11:00 AM – 01:00 PM' })}
                      className="px-2.5 py-1 bg-blue-700 hover:bg-blue-800 text-white rounded font-semibold text-[11px] cursor-pointer"
                    >
                      Book
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('slots')}
                  className="w-full py-2 bg-slate-200/80 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-lg text-center cursor-pointer transition-colors"
                >
                  Explore Full Interactive Calendar
                </button>
              </div>

              {/* External Lab Examiner Module Promotion */}
              <div className="p-5 bg-gradient-to-br from-blue-900 to-slate-900 text-white rounded-xl shadow-sm space-y-3">
                <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider">
                  Specialized Academic Module
                </span>
                <h4 className="font-bold text-base leading-snug">
                  External Lab Examiner &amp; Faculty Arrangements
                </h4>
                <p className="text-xs text-blue-100 leading-relaxed">
                  Automate guest faculty itineraries, campus pickups, canteen hospitality, and hostel suite bookings.
                </p>
                <button
                  id="btn-home-examiner-module"
                  onClick={() => {
                    if (!currentUser) {
                      openLoginRequired('Please sign in to access examiner coordination.', () => {
                        setActiveTab('examiner');
                      });
                    } else {
                      setActiveTab('examiner');
                    }
                  }}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors"
                >
                  <span>Open Examiner Console</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hall Detail Modal */}
      <HallDetailModal
        isOpen={Boolean(detailModalHallId)}
        onClose={() => setDetailModalHallId(null)}
        hallId={detailModalHallId}
      />
    </div>
  );
};
