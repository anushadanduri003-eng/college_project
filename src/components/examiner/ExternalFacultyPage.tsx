import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  UserCheck, 
  Building, 
  Calendar, 
  Clock, 
  Car, 
  Coffee, 
  BedDouble, 
  Plus, 
  FileSpreadsheet, 
  Printer, 
  CheckCircle2, 
  Phone, 
  MapPin, 
  Mail,
  ShieldCheck,
  Search,
  Users
} from 'lucide-react';
import { HostelDetails } from '../../types';

export const ExternalFacultyPage: React.FC = () => {
  const { 
    externalFaculty, 
    hostels, 
    openExaminerModal, 
    openTimetableModal, 
    currentUser, 
    openLoginRequired 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaculty = externalFaculty.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.purpose.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateRequest = () => {
    if (!currentUser) {
      openLoginRequired('Please sign in to register external examiner arrangements.', () => {
        openExaminerModal();
      });
    } else {
      openExaminerModal();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-1">
              Academic Examination &amp; Guest Coordination
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              External Faculty &amp; Examiner Arrangements
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              End-to-end logistics coordination for university external examiners, lab evaluators, and visiting professors
            </p>
          </div>

          <button
            onClick={handleCreateRequest}
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-lg shadow-xs transition-colors cursor-pointer self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>New Examiner Arrangement Request</span>
          </button>
        </div>

        {/* ================= REQUIREMENT 14: HOSTEL ACCOMMODATION MODULE ================= */}
        <div>
          <div className="mb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <BedDouble className="w-5 h-5 text-blue-700" />
              <span>Campus Hostel Guest Accommodation Units</span>
            </h2>
            <p className="text-xs text-slate-500">
              Dedicated executive guest suites in Boys Hostel and Girls Hostel with automatic gender allocation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hostels.map(hostel => {
              const isBoys = hostel.gender === 'Male';
              const occupiedRooms = Math.max(0, hostel.total_rooms - hostel.available_rooms);

              return (
                <div
                  key={hostel.id}
                  className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm ${
                          isBoys ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
                        }`}>
                          <Building className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-base">{hostel.name}</h3>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            isBoys ? 'bg-blue-50 text-blue-700' : 'bg-pink-50 text-pink-700'
                          }`}>
                            {hostel.gender} Faculty Accommodation • {hostel.room_type}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-slate-400 block font-semibold uppercase">Vacant</span>
                        <span className="font-extrabold text-green-700 text-base">
                          {hostel.available_rooms} Rooms Free
                        </span>
                      </div>
                    </div>

                    {/* Room Stats */}
                    <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200 text-center text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Total Suites</span>
                        <div className="font-bold text-slate-800">{hostel.total_rooms}</div>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Occupied</span>
                        <div className="font-bold text-slate-800">{occupiedRooms}</div>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Available</span>
                        <div className="font-bold text-green-700">{hostel.available_rooms}</div>
                      </div>
                    </div>

                    {/* Warden Details */}
                    <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Hostel Warden:</span>
                        <span className="font-bold text-slate-800">{hostel.warden_name}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Warden Contact:</span>
                        <span className="font-mono text-blue-800 font-semibold">{hostel.warden_contact}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Hostel Location:</span>
                        <span className="text-slate-700">{hostel.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500 italic">
                      Food: Executive Guest Mess Included
                    </span>
                    <button
                      onClick={handleCreateRequest}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded text-xs transition-colors cursor-pointer"
                    >
                      Book Suite
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= REGISTERED EXAMINERS DIRECTORY (#12 & #13) ================= */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <UserCheck className="w-5 h-5 text-blue-700" />
                <span>Scheduled External Examiners ({filteredFaculty.length})</span>
              </h2>
              <p className="text-xs text-slate-500">
                Generate official dynamic timetables and review food, travel, and accommodation bookings
              </p>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search examiner by name, college..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg w-64"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredFaculty.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-xl border border-slate-200">
                <p className="text-xs text-slate-500">No external examiner records found.</p>
              </div>
            ) : (
              filteredFaculty.map(faculty => (
                <div
                  key={faculty.id}
                  className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-4 hover:shadow-md transition-shadow"
                >
                  {/* Top Bar */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-base font-extrabold text-slate-900">{faculty.name}</h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-900">
                          {faculty.designation}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {faculty.institution} • Host: <strong className="text-blue-900">{faculty.department}</strong>
                      </p>
                    </div>

                    {/* Action: Open Timetable */}
                    <div className="flex items-center space-x-2">
                      <button
                        id={`btn-timetable-${faculty.id}`}
                        onClick={() => openTimetableModal(faculty.id)}
                        className="inline-flex items-center space-x-1.5 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-lg shadow-xs transition-colors cursor-pointer"
                      >
                        <FileSpreadsheet className="w-3.5 h-3.5" />
                        <span>View Dynamic Timetable</span>
                      </button>
                    </div>
                  </div>

                  {/* 4-Box Overview: Visit, Travel, Food, Hostel */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    {/* 1. Visit Details */}
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                      <div className="font-bold text-slate-900 flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-blue-700" />
                        <span>Visit &amp; Evaluation</span>
                      </div>
                      <p className="font-semibold text-blue-950">{faculty.visit_date}</p>
                      <p className="text-[11px] text-slate-600">{faculty.purpose}</p>
                      <p className="text-[10px] text-slate-400">Lab: {faculty.subject_lab}</p>
                    </div>

                    {/* 2. Travel & Pickup */}
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                      <div className="font-bold text-slate-900 flex items-center space-x-1">
                        <Car className="w-3.5 h-3.5 text-blue-700" />
                        <span>Travel &amp; Pickup</span>
                      </div>
                      <p className="text-slate-800 font-semibold">Mode: {faculty.travel.travel_mode}</p>
                      <p className="text-[11px] text-slate-600">
                        {faculty.travel.pickup_required ? (
                          <span className="text-green-700 font-bold">✓ Pickup Arranged</span>
                        ) : (
                          <span className="text-slate-500">Self Transport</span>
                        )}
                      </p>
                      {faculty.travel.pickup_required && (
                        <p className="text-[10px] text-slate-500 truncate">
                          At: {faculty.travel.pickup_location}
                        </p>
                      )}
                    </div>

                    {/* 3. Food Arrangements */}
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                      <div className="font-bold text-slate-900 flex items-center space-x-1">
                        <Coffee className="w-3.5 h-3.5 text-blue-700" />
                        <span>Hospitality &amp; Canteen</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {faculty.food.breakfast && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-semibold">Breakfast</span>
                        )}
                        {faculty.food.lunch && (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 text-[10px] font-semibold">Lunch</span>
                        )}
                        {faculty.food.tea && (
                          <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-900 text-[10px] font-semibold">Tea &amp; Snacks</span>
                        )}
                        {faculty.food.dinner && (
                          <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-900 text-[10px] font-semibold">Dinner</span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1 truncate">
                        {faculty.food.dietary_notes}
                      </p>
                    </div>

                    {/* 4. Hostel Suite */}
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                      <div className="font-bold text-slate-900 flex items-center space-x-1">
                        <BedDouble className="w-3.5 h-3.5 text-blue-700" />
                        <span>Hostel Suite</span>
                      </div>
                      {faculty.accommodation.required ? (
                        <div>
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                            faculty.accommodation.suggested_hostel === 'Boys Hostel'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-pink-100 text-pink-800'
                          }`}>
                            {faculty.accommodation.suggested_hostel}
                          </span>
                          <p className="text-[11px] text-slate-600 mt-0.5">
                            {faculty.accommodation.rooms} Room ({faculty.accommodation.gender})
                          </p>
                          <p className="text-[10px] text-slate-500 truncate">
                            In: {faculty.accommodation.check_in}
                          </p>
                        </div>
                      ) : (
                        <p className="text-slate-400 text-xs italic">No accommodation required</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
