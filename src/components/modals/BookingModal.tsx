import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { EventType } from '../../types';
import { 
  X, 
  Calendar, 
  Clock, 
  Building2, 
  Users, 
  FileText, 
  Send, 
  AlertCircle, 
  CheckSquare,
  Sparkles,
  Info
} from 'lucide-react';

export const BookingModal: React.FC = () => {
  const { 
    isBookingModalOpen, 
    closeBookingModal, 
    bookingModalPreFill, 
    currentUser, 
    coordinators, 
    halls, 
    createBookingRequest 
  } = useApp();

  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState<EventType>('Workshop');
  const [department, setDepartment] = useState(currentUser?.department || 'Computer Science & Engineering');
  const [organizerName, setOrganizerName] = useState(currentUser?.name || '');
  const [contactNumber, setContactNumber] = useState(currentUser?.phone || '');
  const [expectedParticipants, setExpectedParticipants] = useState<number>(150);
  const [numberOfGuests, setNumberOfGuests] = useState<number>(3);

  const [selectedBlock, setSelectedBlock] = useState<'Block-2' | 'Block-3' | 'Block-4'>('Block-2');
  const [date, setDate] = useState(() => {
    // Default to upcoming date like 2026-09-25 or tomorrow
    return '2026-09-25';
  });
  const [startTime, setStartTime] = useState('09:00 AM');
  const [endTime, setEndTime] = useState('11:00 AM');

  const [requirements, setRequirements] = useState<string[]>([
    'Projector',
    'Microphone',
    'Speakers',
    'AC'
  ]);
  const [remarks, setRemarks] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Apply pre-fills if passed (e.g. from Available Slots calendar or Hall detail)
  useEffect(() => {
    if (bookingModalPreFill) {
      if (bookingModalPreFill.block) setSelectedBlock(bookingModalPreFill.block);
      if (bookingModalPreFill.date) setDate(bookingModalPreFill.date);
      if (bookingModalPreFill.slot) {
        const parts = bookingModalPreFill.slot.split('–').map(s => s.trim());
        if (parts.length === 2) {
          setStartTime(parts[0]);
          setEndTime(parts[1]);
        }
      }
    }
  }, [bookingModalPreFill]);

  // Update defaults when user changes
  useEffect(() => {
    if (currentUser) {
      setOrganizerName(currentUser.name);
      setContactNumber(currentUser.phone);
      if (currentUser.department) setDepartment(currentUser.department);
    }
  }, [currentUser]);

  if (!isBookingModalOpen) return null;

  const currentCoordinator = coordinators.find(c => c.block === selectedBlock);
  const currentHall = halls.find(h => h.block === selectedBlock);

  const requirementOptions = [
    'Projector',
    'Microphone',
    'Speakers',
    'Chairs',
    'Tables',
    'Internet',
    'AC',
    'Podium',
    'Live Webcast Support',
    'VIP Reception Stage'
  ];

  const timeSlots = [
    { start: '09:00 AM', end: '11:00 AM' },
    { start: '11:00 AM', end: '01:00 PM' },
    { start: '02:00 PM', end: '04:00 PM' },
    { start: '04:00 PM', end: '06:00 PM' },
    { start: '09:00 AM', end: '01:00 PM' },
    { start: '02:00 PM', end: '06:00 PM' },
    { start: '09:00 AM', end: '05:00 PM' }
  ];

  const handleTimeSlotSelect = (st: string, et: string) => {
    setStartTime(st);
    setEndTime(et);
  };

  const toggleRequirement = (req: string) => {
    if (requirements.includes(req)) {
      setRequirements(requirements.filter(r => r !== req));
    } else {
      setRequirements([...requirements, req]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!eventName.trim()) {
      setErrorMsg('Event Name is required.');
      return;
    }
    if (!organizerName.trim() || !contactNumber.trim()) {
      setErrorMsg('Organizer details and contact number are required.');
      return;
    }
    if (!date) {
      setErrorMsg('Please pick a booking date.');
      return;
    }

    const hall = halls.find(h => h.block === selectedBlock);

    const success = createBookingRequest({
      hall_id: hall?.id || `hall-${selectedBlock.toLowerCase()}`,
      hall_name: hall?.hall_name || `${selectedBlock} Seminar Hall`,
      block: selectedBlock,
      event_name: eventName.trim(),
      event_type: eventType,
      department,
      organizer_name: organizerName.trim(),
      contact_number: contactNumber.trim(),
      expected_participants: Number(expectedParticipants) || 100,
      number_of_guests: Number(numberOfGuests) || 0,
      date,
      start_time: startTime,
      end_time: endTime,
      requirements,
      remarks: remarks.trim()
    });

    if (!success) {
      setErrorMsg('Could not process booking. Please verify the date and slot are not conflicting.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 border border-slate-200 animate-in fade-in duration-150 max-h-[92vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Seminar Hall Booking & Slot Request
              </h3>
              <p className="text-xs text-slate-500">
                Request goes to the assigned Hall Coordinator for review and approval
              </p>
            </div>
          </div>
          <button
            onClick={closeBookingModal}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-5 text-xs">
          {/* SECTION 1: HALL DETAILS & TIMINGS */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                <Building2 className="w-4 h-4 text-blue-700" />
                <span>1. Select Seminar Hall & Date</span>
              </span>
              {currentCoordinator && (
                <span className="text-[11px] font-semibold text-blue-800 bg-blue-100/80 px-2 py-0.5 rounded">
                  Approval Incharge: {currentCoordinator.name}
                </span>
              )}
            </div>

            {/* Block Selector */}
            <div className="grid grid-cols-3 gap-2.5">
              {(['Block-2', 'Block-3', 'Block-4'] as const).map(block => {
                const hall = halls.find(h => h.block === block);
                const coord = coordinators.find(c => c.block === block);
                const isSelected = selectedBlock === block;

                return (
                  <button
                    key={block}
                    type="button"
                    onClick={() => setSelectedBlock(block)}
                    className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/90 ring-2 ring-blue-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold text-slate-900 text-xs">{block}</div>
                    <div className="text-[11px] text-slate-500 truncate">Cap: {hall?.capacity} Seats</div>
                    <div className="text-[10px] text-blue-700 font-semibold mt-0.5 truncate">
                      Coord: {coord?.name}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Date and Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Select Date *
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-medium text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Start Time *
                </label>
                <select
                  value={startTime}
                  onChange={e => setStartTime(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-medium text-slate-800"
                >
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="01:00 PM">01:00 PM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  End Time *
                </label>
                <select
                  value={endTime}
                  onChange={e => setEndTime(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-medium text-slate-800"
                >
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="01:00 PM">01:00 PM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                  <option value="06:00 PM">06:00 PM</option>
                </select>
              </div>
            </div>

            {/* Quick Slot Presets */}
            <div className="pt-1">
              <span className="text-[11px] text-slate-500 font-medium mr-2">Standard Academic Slots:</span>
              <div className="inline-flex flex-wrap gap-1 mt-1">
                {[
                  { label: 'Morning (09:00 - 11:00 AM)', s: '09:00 AM', e: '11:00 AM' },
                  { label: 'Mid-day (11:00 AM - 01:00 PM)', s: '11:00 AM', e: '01:00 PM' },
                  { label: 'Afternoon (02:00 - 04:00 PM)', s: '02:00 PM', e: '04:00 PM' },
                  { label: 'Full Day (09:00 AM - 05:00 PM)', s: '09:00 AM', e: '05:00 PM' },
                ].map(preset => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => handleTimeSlotSelect(preset.s, preset.e)}
                    className="px-2 py-0.5 rounded bg-white border border-slate-300 hover:border-blue-500 text-[10px] text-slate-700"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 2: EVENT DETAILS */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <span className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
              <FileText className="w-4 h-4 text-blue-700" />
              <span>2. Event Details & Department</span>
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Event Name */}
              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">
                  Event Name / Title *
                </label>
                <input
                  type="text"
                  value={eventName}
                  onChange={e => setEventName(e.target.value)}
                  placeholder="e.g. National Seminar on Next-Gen Artificial Intelligence & Robotics"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900"
                  required
                />
              </div>

              {/* Event Type */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Event Type *
                </label>
                <select
                  value={eventType}
                  onChange={e => setEventType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                >
                  <option value="Technical Symposium">Technical Symposium</option>
                  <option value="National Seminar">National Seminar</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Faculty Development Program">Faculty Development Program (FDP)</option>
                  <option value="Guest Lecture">Guest Lecture</option>
                  <option value="Cultural Event">Cultural Event</option>
                  <option value="Placement Drive">Placement Drive</option>
                  <option value="Conference">Conference</option>
                  <option value="Alumni Meet">Alumni Meet</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Department */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Department *
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={e => setDepartment(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                  required
                />
              </div>

              {/* Organizer Name */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Organizer Name *
                </label>
                <input
                  type="text"
                  value={organizerName}
                  onChange={e => setOrganizerName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                  required
                />
              </div>

              {/* Contact Number */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Contact Number *
                </label>
                <input
                  type="text"
                  value={contactNumber}
                  onChange={e => setContactNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                  required
                />
              </div>

              {/* Expected Participants */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Expected Participants (Students & Faculty) *
                </label>
                <input
                  type="number"
                  min="10"
                  max="1000"
                  value={expectedParticipants}
                  onChange={e => setExpectedParticipants(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                  required
                />
              </div>

              {/* Number of Guests */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Number of External / VIP Guests
                </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={numberOfGuests}
                  onChange={e => setNumberOfGuests(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: ADDITIONAL REQUIREMENTS */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <span className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
              <CheckSquare className="w-4 h-4 text-blue-700" />
              <span>3. Additional Requirements & Facilities</span>
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {requirementOptions.map(req => {
                const checked = requirements.includes(req);
                return (
                  <label
                    key={req}
                    className={`flex items-center space-x-2 p-2 rounded-lg border transition-colors cursor-pointer ${
                      checked
                        ? 'bg-blue-50 border-blue-400 text-blue-900 font-semibold'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleRequirement(req)}
                      className="rounded border-slate-300 text-blue-700 focus:ring-blue-500"
                    />
                    <span className="text-[11px]">{req}</span>
                  </label>
                );
              })}
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Description / Remarks / Special Setup Instructions
              </label>
              <textarea
                rows={2}
                value={remarks}
                onChange={e => setRemarks(e.target.value)}
                placeholder="Mention guest details, dais layout needs, stage banners, or inter-department collaboration notes..."
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900"
              />
            </div>
          </div>

          {/* Workflow routing notice */}
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 flex items-start space-x-2">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Coordination Workflow: </span>
              Submitting this request will automatically route it to{' '}
              <span className="font-bold underline">{currentCoordinator?.name}</span> ({selectedBlock} Coordinator).
              Upon approval, the slot status is updated to BOOKED and an institutional notification will be dispatched.
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex items-center justify-end space-x-3 border-t border-slate-200">
            <button
              type="button"
              onClick={closeBookingModal}
              className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              id="btn-send-booking-request"
              type="submit"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send Booking Request</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
