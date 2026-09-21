import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  UserCheck, 
  Car, 
  Coffee, 
  BedDouble, 
  Send, 
  CheckCircle2, 
  Building,
  Calendar,
  Clock,
  MapPin,
  AlertCircle
} from 'lucide-react';

export const ExternalFacultyModal: React.FC = () => {
  const { isExaminerModalOpen, closeExaminerModal, addExternalFacultyArrangement } = useApp();

  // Faculty Details
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('Professor & External Examiner');
  const [institution, setInstitution] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // Visit Details
  const [purpose, setPurpose] = useState('B.Tech IV Year External Lab Examination & Project Viva');
  const [subjectLab, setSubjectLab] = useState('Data Structures & Algorithms Lab / Web Technologies');
  const [visitDate, setVisitDate] = useState('2026-09-26');
  const [arrivalTime, setArrivalTime] = useState('08:30 AM');
  const [departureTime, setDepartureTime] = useState('05:00 PM');

  // Travel Details
  const [travelRequired, setTravelRequired] = useState(true);
  const [travelMode, setTravelMode] = useState<'Flight' | 'Train' | 'Bus' | 'College Vehicle' | 'Personal Vehicle'>('Train');
  const [travellingCharges, setTravellingCharges] = useState(1500);
  const [pickupRequired, setPickupRequired] = useState(true);
  const [pickupLocation, setPickupLocation] = useState('Guntur Junction Railway Station (Platform 1)');

  // Food Arrangements
  const [tea, setTea] = useState(true);
  const [teaQty, setTeaQty] = useState(2);
  const [snacks, setSnacks] = useState(true);
  const [snacksQty, setSnacksQty] = useState(2);
  const [breakfast, setBreakfast] = useState(true);
  const [breakfastQty, setBreakfastQty] = useState(1);
  const [lunch, setLunch] = useState(true);
  const [lunchQty, setLunchQty] = useState(1);
  const [dinner, setDinner] = useState(false);
  const [dinnerQty, setDinnerQty] = useState(0);
  const [dietaryNotes, setDietaryNotes] = useState('Vegetarian lunch at College Executive Guest Canteen');

  // Accommodation
  const [accommodationRequired, setAccommodationRequired] = useState(true);
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [rooms, setRooms] = useState(1);
  const [persons, setPersons] = useState(1);
  const [checkIn, setCheckIn] = useState('2026-09-25 07:00 PM');
  const [checkOut, setCheckOut] = useState('2026-09-26 06:00 PM');
  const [specialRequirements, setSpecialRequirements] = useState('Air conditioned guest suite with Wi-Fi');

  const [errorMsg, setErrorMsg] = useState('');

  // Automatic Hostel suggestion rule from Requirement 12:
  // Male → Boys Hostel
  // Female → Girls Hostel
  const suggestedHostel: 'Boys Hostel' | 'Girls Hostel' = gender === 'Male' ? 'Boys Hostel' : 'Girls Hostel';

  if (!isExaminerModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !institution.trim() || !phone.trim()) {
      setErrorMsg('Faculty Name, Home Institution, and Contact Number are required.');
      return;
    }

    addExternalFacultyArrangement({
      name: name.trim(),
      designation: designation.trim(),
      institution: institution.trim(),
      department,
      phone: phone.trim(),
      email: email.trim(),
      purpose,
      subject_lab: subjectLab.trim(),
      visit_date: visitDate,
      arrival_time: arrivalTime,
      departure_time: departureTime,
      travel: {
        travel_required: travelRequired,
        travel_mode: travelMode,
        travelling_charges: Number(travellingCharges) || 0,
        pickup_required: pickupRequired,
        pickup_location: pickupLocation.trim()
      },
      food: {
        tea,
        tea_qty: teaQty,
        snacks,
        snacks_qty: snacksQty,
        breakfast,
        breakfast_qty: breakfastQty,
        lunch,
        lunch_qty: lunchQty,
        dinner,
        dinner_qty: dinnerQty,
        dietary_notes: dietaryNotes.trim()
      },
      accommodation: {
        required: accommodationRequired,
        gender,
        suggested_hostel: suggestedHostel,
        rooms: Number(rooms) || 1,
        persons: Number(persons) || 1,
        check_in: checkIn,
        check_out: checkOut,
        special_requirements: specialRequirements.trim()
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full p-6 border border-slate-200 animate-in fade-in duration-150 max-h-[92vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-800">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                External Faculty / Examiner Arrangement Form
              </h3>
              <p className="text-xs text-slate-500">
                Logistics coordination for external university evaluators, lab examiners, and guest speakers
              </p>
            </div>
          </div>
          <button
            onClick={closeExaminerModal}
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

        <form onSubmit={handleSubmit} className="mt-4 space-y-5 text-xs">
          {/* 1. FACULTY DETAILS */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <span className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
              <Building className="w-4 h-4 text-blue-700" />
              <span>1. External Faculty Information</span>
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Faculty Name (with Title) *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Dr. C. Subba Rao"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Designation *
                </label>
                <input
                  type="text"
                  value={designation}
                  onChange={e => setDesignation(e.target.value)}
                  placeholder="e.g. Professor & Head"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  College / Institution *
                </label>
                <input
                  type="text"
                  value={institution}
                  onChange={e => setInstitution(e.target.value)}
                  placeholder="e.g. University College of Engineering, JNTU Kakinada"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Host Department at NEC *
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={e => setDepartment(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+91 98480 00000"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="examiner@university.edu"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* 2. VISIT DETAILS */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <span className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
              <Calendar className="w-4 h-4 text-blue-700" />
              <span>2. Purpose & Examination Schedule</span>
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Purpose of Visit *
                </label>
                <input
                  type="text"
                  value={purpose}
                  onChange={e => setPurpose(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Subject / Lab Details *
                </label>
                <input
                  type="text"
                  value={subjectLab}
                  onChange={e => setSubjectLab(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Visit Date *
                </label>
                <input
                  type="date"
                  value={visitDate}
                  onChange={e => setVisitDate(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Arrival Time
                  </label>
                  <input
                    type="text"
                    value={arrivalTime}
                    onChange={e => setArrivalTime(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Departure Time
                  </label>
                  <input
                    type="text"
                    value={departureTime}
                    onChange={e => setDepartureTime(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3. TRAVEL DETAILS */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <span className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
              <Car className="w-4 h-4 text-blue-700" />
              <span>3. Travel & Transportation Details</span>
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Travelling Required?
                </label>
                <div className="flex space-x-3 mt-1.5">
                  <label className="flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="radio"
                      checked={travelRequired}
                      onChange={() => setTravelRequired(true)}
                      className="text-blue-700"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="radio"
                      checked={!travelRequired}
                      onChange={() => setTravelRequired(false)}
                      className="text-blue-700"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Travel Mode
                </label>
                <select
                  value={travelMode}
                  onChange={e => setTravelMode(e.target.value as any)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                >
                  <option value="Train">Train</option>
                  <option value="Flight">Flight</option>
                  <option value="Bus">Bus</option>
                  <option value="College Vehicle">College Official Vehicle</option>
                  <option value="Personal Vehicle">Personal Vehicle</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Travelling Charges (₹)
                </label>
                <input
                  type="number"
                  value={travellingCharges}
                  onChange={e => setTravellingCharges(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Campus Pickup Required?
                </label>
                <div className="flex space-x-3 mt-1.5">
                  <label className="flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="radio"
                      checked={pickupRequired}
                      onChange={() => setPickupRequired(true)}
                      className="text-blue-700"
                    />
                    <span>Yes, arrange driver</span>
                  </label>
                  <label className="flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="radio"
                      checked={!pickupRequired}
                      onChange={() => setPickupRequired(false)}
                      className="text-blue-700"
                    />
                    <span>No, self arrival</span>
                  </label>
                </div>
              </div>

              {pickupRequired && (
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Pickup Location & Landmark
                  </label>
                  <input
                    type="text"
                    value={pickupLocation}
                    onChange={e => setPickupLocation(e.target.value)}
                    placeholder="e.g. Narasaraopet Bus Complex or Guntur Rly Stn"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>

          {/* 4. FOOD ARRANGEMENTS */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <span className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
              <Coffee className="w-4 h-4 text-blue-700" />
              <span>4. Hospitality & Food Arrangements</span>
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {/* Tea */}
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <label className="flex items-center space-x-1.5 cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={tea}
                    onChange={e => setTea(e.target.checked)}
                    className="rounded text-blue-700"
                  />
                  <span>Tea / Coffee</span>
                </label>
                {tea && (
                  <div className="mt-1 flex items-center space-x-1 text-[11px]">
                    <span className="text-slate-500">Qty:</span>
                    <input
                      type="number"
                      min="1"
                      value={teaQty}
                      onChange={e => setTeaQty(Number(e.target.value))}
                      className="w-12 px-1 py-0.5 border border-slate-300 rounded text-center"
                    />
                  </div>
                )}
              </div>

              {/* Snacks */}
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <label className="flex items-center space-x-1.5 cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={snacks}
                    onChange={e => setSnacks(e.target.checked)}
                    className="rounded text-blue-700"
                  />
                  <span>Snacks</span>
                </label>
                {snacks && (
                  <div className="mt-1 flex items-center space-x-1 text-[11px]">
                    <span className="text-slate-500">Qty:</span>
                    <input
                      type="number"
                      min="1"
                      value={snacksQty}
                      onChange={e => setSnacksQty(Number(e.target.value))}
                      className="w-12 px-1 py-0.5 border border-slate-300 rounded text-center"
                    />
                  </div>
                )}
              </div>

              {/* Breakfast */}
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <label className="flex items-center space-x-1.5 cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={breakfast}
                    onChange={e => setBreakfast(e.target.checked)}
                    className="rounded text-blue-700"
                  />
                  <span>Breakfast</span>
                </label>
                {breakfast && (
                  <div className="mt-1 flex items-center space-x-1 text-[11px]">
                    <span className="text-slate-500">Qty:</span>
                    <input
                      type="number"
                      min="1"
                      value={breakfastQty}
                      onChange={e => setBreakfastQty(Number(e.target.value))}
                      className="w-12 px-1 py-0.5 border border-slate-300 rounded text-center"
                    />
                  </div>
                )}
              </div>

              {/* Lunch */}
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <label className="flex items-center space-x-1.5 cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={lunch}
                    onChange={e => setLunch(e.target.checked)}
                    className="rounded text-blue-700"
                  />
                  <span>Lunch</span>
                </label>
                {lunch && (
                  <div className="mt-1 flex items-center space-x-1 text-[11px]">
                    <span className="text-slate-500">Qty:</span>
                    <input
                      type="number"
                      min="1"
                      value={lunchQty}
                      onChange={e => setLunchQty(Number(e.target.value))}
                      className="w-12 px-1 py-0.5 border border-slate-300 rounded text-center"
                    />
                  </div>
                )}
              </div>

              {/* Dinner */}
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <label className="flex items-center space-x-1.5 cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={dinner}
                    onChange={e => setDinner(e.target.checked)}
                    className="rounded text-blue-700"
                  />
                  <span>Dinner</span>
                </label>
                {dinner && (
                  <div className="mt-1 flex items-center space-x-1 text-[11px]">
                    <span className="text-slate-500">Qty:</span>
                    <input
                      type="number"
                      min="1"
                      value={dinnerQty}
                      onChange={e => setDinnerQty(Number(e.target.value))}
                      className="w-12 px-1 py-0.5 border border-slate-300 rounded text-center"
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Dietary Preference / Special Notes
              </label>
              <input
                type="text"
                value={dietaryNotes}
                onChange={e => setDietaryNotes(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          {/* 5. ACCOMMODATION (Requirement 12 Gender-based Auto Allocation) */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                <BedDouble className="w-4 h-4 text-blue-700" />
                <span>5. Campus Hostel Accommodation</span>
              </span>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-slate-700">Accommodation Required?</span>
                <input
                  type="checkbox"
                  checked={accommodationRequired}
                  onChange={e => setAccommodationRequired(e.target.checked)}
                  className="rounded text-blue-700"
                />
              </div>
            </div>

            {accommodationRequired && (
              <div className="space-y-3 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Gender Selector */}
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Faculty Gender *
                    </label>
                    <div className="flex space-x-3 mt-1.5">
                      <label className="flex items-center space-x-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value="Male"
                          checked={gender === 'Male'}
                          onChange={() => setGender('Male')}
                          className="text-blue-700"
                        />
                        <span>Male</span>
                      </label>
                      <label className="flex items-center space-x-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value="Female"
                          checked={gender === 'Female'}
                          onChange={() => setGender('Female')}
                          className="text-blue-700"
                        />
                        <span>Female</span>
                      </label>
                    </div>
                  </div>

                  {/* Automatic Hostel Suggestion Badge */}
                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-700 mb-1">
                      Automatic System Allocation Suggestion:
                    </label>
                    <div className="p-2 rounded-lg bg-blue-100/70 border border-blue-200 text-xs font-bold text-blue-900 flex items-center space-x-2">
                      <Building className="w-4 h-4 text-blue-700" />
                      <span>
                        {gender === 'Male' ? 'Male Faculty → BOYS HOSTEL (Executive Guest Suite)' : 'Female Faculty → GIRLS HOSTEL (VIP Guest Suite)'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Rooms
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={rooms}
                      onChange={e => setRooms(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Persons
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={persons}
                      onChange={e => setPersons(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Check-in Date & Time
                    </label>
                    <input
                      type="text"
                      value={checkIn}
                      onChange={e => setCheckIn(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Check-out Date & Time
                    </label>
                    <input
                      type="text"
                      value={checkOut}
                      onChange={e => setCheckOut(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Special Suite Requirements
                  </label>
                  <input
                    type="text"
                    value={specialRequirements}
                    onChange={e => setSpecialRequirements(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="pt-2 flex items-center justify-end space-x-3 border-t border-slate-200">
            <button
              type="button"
              onClick={closeExaminerModal}
              className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              id="btn-submit-arrangement-request"
              type="submit"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Submit Arrangement Request</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
