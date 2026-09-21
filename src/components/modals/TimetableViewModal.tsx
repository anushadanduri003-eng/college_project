import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Printer, 
  Calendar, 
  Clock, 
  MapPin, 
  UserCheck, 
  CheckCircle2, 
  Coffee, 
  BedDouble, 
  Car,
  FileSpreadsheet
} from 'lucide-react';

export const TimetableViewModal: React.FC = () => {
  const { isTimetableModalOpen, closeTimetableModal, selectedExaminerId, externalFaculty, config } = useApp();

  if (!isTimetableModalOpen || !selectedExaminerId) return null;

  const faculty = externalFaculty.find(f => f.id === selectedExaminerId);
  if (!faculty) return null;

  // Generate dynamic schedule rows from faculty's visit, travel, food, and accommodation details
  const scheduleRows = [
    {
      time: faculty.arrival_time || '08:30 AM',
      activity: 'Arrival & Reception at Campus',
      location: faculty.travel.pickup_required ? faculty.travel.pickup_location : 'Main Campus Entrance Gate',
      arrangement: faculty.travel.pickup_required ? `Official Pickup (${faculty.travel.travel_mode})` : 'Self Arrival',
      icon: 'pickup'
    },
    ...(faculty.food.breakfast ? [{
      time: '09:00 AM',
      activity: 'Morning Refreshment & Breakfast',
      location: 'Executive Dining / Guest Canteen',
      arrangement: `Breakfast (${faculty.food.breakfast_qty} pax) + Filter Coffee`,
      icon: 'food'
    }] : []),
    {
      time: '10:00 AM',
      activity: `Lab Examination (Morning Session) - ${faculty.subject_lab}`,
      location: `${faculty.department} Department Lab (Block-3 / Block-4)`,
      arrangement: 'Evaluation Stations Ready, Question Papers & Rubrics Dispatched',
      icon: 'lab'
    },
    ...(faculty.food.lunch ? [{
      time: '01:00 PM',
      activity: 'Institutional Lunch with HOD & Faculty',
      location: 'College VIP Dining Hall (Academic Block)',
      arrangement: `Special Lunch (${faculty.food.lunch_qty} pax) - ${faculty.food.dietary_notes || 'Vegetarian meals'}`,
      icon: 'food'
    }] : []),
    {
      time: '02:00 PM',
      activity: 'Lab Examination (Afternoon Session) & Project Viva Voce',
      location: `${faculty.department} Specialized Lab`,
      arrangement: 'Student Batch Viva Voce & Practical Record Verification',
      icon: 'lab'
    },
    ...(faculty.food.tea || faculty.food.snacks ? [{
      time: '04:30 PM',
      activity: 'Evening Tea, Snacks & Marks Finalization',
      location: 'HOD Chamber / Seminar Hall Lounge',
      arrangement: `Tea & Evening Snacks (${faculty.food.snacks_qty || 2} pax) with Remuneration Voucher Signoff`,
      icon: 'tea'
    }] : []),
    {
      time: faculty.departure_time || '05:00 PM',
      activity: 'Departure from NEC Campus',
      location: 'College Portico / Pickup Point',
      arrangement: faculty.travel.pickup_required ? `College Transport Drop to ${faculty.travel.pickup_location}` : 'Self Departure',
      icon: 'drop'
    }
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full p-6 sm:p-8 border border-slate-200 animate-in fade-in duration-150 max-h-[92vh] overflow-y-auto print:max-w-none print:shadow-none print:border-none print:p-0"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Actions (Hidden in Print) */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 print:hidden">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded bg-blue-100 text-blue-800 font-bold text-xs uppercase">
              Official Itinerary
            </span>
            <span className="text-xs text-slate-500">Document Ref: NEC/EXAM/{faculty.id}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Itinerary</span>
            </button>
            <button
              onClick={closeTimetableModal}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Official Printable Header */}
        <div className="mt-4 text-center border-b-2 border-slate-900 pb-4">
          <h2 className="text-xl font-extrabold text-slate-900 uppercase tracking-tight">
            {config.collegeName}
          </h2>
          <p className="text-xs font-bold text-blue-800 uppercase tracking-widest mt-0.5">
            Department of {faculty.department} | Examination Cell
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Autonomous Institution | Affiliated to JNTUK | Approved by AICTE, New Delhi
          </p>
          <div className="mt-2 inline-block px-3 py-1 bg-slate-100 rounded text-xs font-bold text-slate-800 uppercase">
            External Faculty Visit Schedule & Hospitality Timetable
          </div>
        </div>

        {/* Faculty Summary Card */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold">External Examiner</span>
            <div className="font-bold text-slate-900 text-sm mt-0.5">{faculty.name}</div>
            <div className="text-slate-600 text-[11px]">{faculty.designation}</div>
            <div className="text-slate-500 text-[11px] font-medium">{faculty.institution}</div>
          </div>

          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold">Visit Date & Assignment</span>
            <div className="font-bold text-blue-900 mt-0.5">{faculty.visit_date}</div>
            <div className="text-slate-700 text-[11px] font-medium">{faculty.purpose}</div>
            <div className="text-slate-500 text-[11px] font-mono mt-0.5">Ph: {faculty.phone}</div>
          </div>

          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold">Hostel & Accommodation</span>
            {faculty.accommodation.required ? (
              <div>
                <div className="font-bold text-green-800 mt-0.5">
                  Allocated: {faculty.accommodation.suggested_hostel}
                </div>
                <div className="text-[11px] text-slate-600">
                  {faculty.accommodation.rooms} Room(s), {faculty.accommodation.persons} Person(s)
                </div>
                <div className="text-[10px] text-slate-500">
                  Check-in: {faculty.accommodation.check_in}
                </div>
              </div>
            ) : (
              <div className="text-slate-500 mt-0.5 font-medium">No accommodation requested.</div>
            )}
          </div>
        </div>

        {/* Dynamic Timetable Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-blue-900 text-white uppercase text-[11px] tracking-wider">
              <tr>
                <th className="py-3 px-4 font-bold w-28">Time</th>
                <th className="py-3 px-4 font-bold">Activity</th>
                <th className="py-3 px-4 font-bold">Campus Location</th>
                <th className="py-3 px-4 font-bold">Coordination Arrangement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {scheduleRows.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                  <td className="py-3 px-4 font-bold text-blue-900 whitespace-nowrap">
                    {row.time}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    {row.activity}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    <span className="inline-flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{row.location}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-700">
                    <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-800 rounded font-medium text-[11px] border border-blue-100">
                      {row.arrangement}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Official Signatures & Verification (Print friendly) */}
        <div className="mt-10 pt-8 border-t border-slate-200 grid grid-cols-3 gap-4 text-center text-xs">
          <div>
            <div className="h-10"></div>
            <div className="border-t border-slate-400 pt-1 font-bold text-slate-800">
              Faculty Coordinator
            </div>
            <div className="text-[10px] text-slate-500">Internal Lab Incharge</div>
          </div>
          <div>
            <div className="h-10"></div>
            <div className="border-t border-slate-400 pt-1 font-bold text-slate-800">
              Head of the Department
            </div>
            <div className="text-[10px] text-slate-500">{faculty.department}</div>
          </div>
          <div>
            <div className="h-10"></div>
            <div className="border-t border-slate-400 pt-1 font-bold text-slate-800">
              Principal / Dean
            </div>
            <div className="text-[10px] text-slate-500">Narasaraopeta Engineering College</div>
          </div>
        </div>
      </div>
    </div>
  );
};
