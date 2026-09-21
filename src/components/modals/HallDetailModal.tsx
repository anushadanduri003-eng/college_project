import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Building2, 
  Users, 
  MapPin, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  UserCheck, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface HallDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  hallId: string | null;
}

export const HallDetailModal: React.FC<HallDetailModalProps> = ({ isOpen, onClose, hallId }) => {
  const { halls, coordinators, bookings, openBookingModal, currentUser, openLoginRequired } = useApp();

  if (!isOpen || !hallId) return null;

  const hall = halls.find(h => h.id === hallId);
  if (!hall) return null;

  const coordinator = coordinators.find(c => c.block === hall.block);
  
  // Bookings for this hall
  const hallBookings = bookings.filter(b => b.block === hall.block && b.status === 'APPROVED');

  const handleBookClick = () => {
    onClose();
    if (!currentUser) {
      openLoginRequired(`Login required to reserve ${hall.hall_name}.`, () => {
        openBookingModal({ block: hall.block });
      });
    } else {
      openBookingModal({ block: hall.block });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full p-6 border border-slate-200 animate-in fade-in duration-150 max-h-[92vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white text-slate-700 shadow-md transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Large Hall Image */}
        <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden shadow-inner bg-slate-100">
          <img
            src={hall.image}
            alt={hall.hall_name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
            <div className="text-white">
              <span className="px-2.5 py-1 bg-blue-600 font-bold text-xs rounded uppercase tracking-wider">
                {hall.block}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1.5">
                {hall.hall_name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 flex items-center space-x-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{hall.location}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <div>
                <span className="text-xs text-slate-500 font-medium">Seating Capacity</span>
                <div className="text-lg font-bold text-slate-900 mt-0.5">
                  {hall.capacity} <span className="text-xs font-normal text-slate-500">Seats</span>
                </div>
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium">Campus Location</span>
                <div className="text-sm font-bold text-slate-900 mt-0.5 truncate">
                  {hall.block}
                </div>
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium">Current Status</span>
                <div className="mt-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                    ● {hall.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Facilities Included */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-blue-700" />
                <span>Equipped Audiovisual & Comfort Facilities</span>
              </h4>
              <div className="grid grid-cols-2 gap-2.5">
                {hall.facilities.map((fac, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center space-x-2 p-2.5 rounded-lg bg-blue-50/50 border border-blue-100 text-xs text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" />
                    <span>{fac}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Approved Upcoming Schedule */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-blue-700" />
                <span>Confirmed Upcoming Hall Bookings</span>
              </h4>

              {hallBookings.length === 0 ? (
                <p className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-lg border border-slate-200">
                  No bookings scheduled. Slots are completely open for reservation.
                </p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {hallBookings.map(b => (
                    <div 
                      key={b.id}
                      className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-slate-900">{b.event_name}</div>
                        <div className="text-slate-500 text-[11px] mt-0.5">
                          {b.department} • Organizer: {b.organizer_name}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-semibold text-blue-800">{b.date}</span>
                        <div className="text-[11px] text-slate-600">{b.start_time} - {b.end_time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar / Coordinator Card */}
          <div className="space-y-4">
            {/* Coordinator Info */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Assigned Hall Incharge
              </span>
              <div className="mt-3 flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center text-sm">
                  {coordinator?.name.charAt(0) || 'C'}
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 text-sm">{coordinator?.name}</h5>
                  <p className="text-xs text-blue-700 font-semibold">{coordinator?.designation}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-200 space-y-1.5 text-xs text-slate-600">
                <div>
                  <span className="text-slate-400">Dept:</span> {coordinator?.department}
                </div>
                <div>
                  <span className="text-slate-400">Email:</span> {coordinator?.email}
                </div>
                <div>
                  <span className="text-slate-400">Contact:</span> {coordinator?.phone}
                </div>
              </div>
            </div>

            {/* Quick Reservation CTA */}
            <div className="p-4 bg-blue-900 text-white rounded-xl shadow-md space-y-3">
              <h5 className="font-bold text-base leading-snug">
                Reserve {hall.block}
              </h5>
              <p className="text-xs text-blue-200 leading-relaxed">
                Submit an event booking request with required dais facilities, guest counts, and schedule details.
              </p>
              <button
                id="btn-modal-request-slot"
                onClick={handleBookClick}
                className="w-full py-2.5 px-4 bg-white text-blue-900 hover:bg-blue-50 font-bold text-xs rounded-lg shadow-sm transition-colors flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Request Slot for this Hall</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
