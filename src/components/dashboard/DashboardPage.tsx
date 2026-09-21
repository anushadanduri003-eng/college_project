import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Calendar, 
  Users, 
  AlertCircle, 
  Printer, 
  Shield, 
  CheckSquare, 
  Filter, 
  SlidersHorizontal,
  FileSpreadsheet,
  Check,
  X,
  Search,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Settings,
  Bell,
  Camera,
  UserCheck,
  Megaphone,
  CheckCircle,
  AlertTriangle,
  ArrowLeft
} from 'lucide-react';
import { BookingStatus, Role } from '../../types';

export const DashboardPage: React.FC = () => {
  const { 
    currentUser, 
    bookings, 
    halls, 
    coordinators, 
    acceptBooking, 
    rejectBooking, 
    cancelBooking,
    updateHall,
    openBookingModal,
    openConfigModal,
    setActiveTab,
    goBack,
    closePage,
    openChangeImageModal,
    openUploadEventModal,
    alertBanner,
    dismissAlertBanner,
    loginAs,
    users
  } = useApp();

  // Filters for User & Admin tables
  const [filterBlock, setFilterBlock] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSlipBooking, setSelectedSlipBooking] = useState<any | null>(null);

  // Active subtab for Admin
  const [adminSubTab, setAdminSubTab] = useState<'requests' | 'halls' | 'coordinators'>('requests');

  // Decline Dialog State
  const [decliningBookingId, setDecliningBookingId] = useState<string | null>(null);
  const [declineReason, setDeclineReason] = useState('Slot unavailable due to departmental academic schedule or maintenance');

  // If no user is logged in
  if (!currentUser) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md border border-slate-200 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto">
            <Building2 className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Sign in to Access Dashboard</h2>
          <p className="text-xs text-slate-500">
            Access your personalized faculty booking history, coordinator approval console, or institutional administration.
          </p>
          <button
            onClick={() => setActiveTab('home')}
            className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg shadow-xs"
          >
            Go to Home &amp; Login
          </button>
        </div>
      </div>
    );
  }

  // ================= ROLE COMPUTATIONS =================
  const isCoordinator = currentUser.role === 'COORDINATOR';
  const isAdmin = currentUser.role === 'ADMIN';

  // For Coordinator: default to their assigned block
  const coordinatorAssignedBlock = currentUser.assignedBlock;

  // Bookings relevant to current user
  let userRelevantBookings = bookings;
  if (isCoordinator && coordinatorAssignedBlock) {
    userRelevantBookings = bookings.filter(b => b.block === coordinatorAssignedBlock);
  } else if (!isAdmin) {
    // Regular Faculty/Staff/Student: their own created bookings or matching email/phone
    userRelevantBookings = bookings.filter(b => b.requester_id === currentUser.id || b.contact_number === currentUser.phone);
  }

  // Filter logic
  const filteredBookings = userRelevantBookings.filter(b => {
    const matchesBlock = filterBlock === 'ALL' || b.block === filterBlock;
    const matchesStatus = filterStatus === 'ALL' || b.status === filterStatus;
    const matchesSearch = searchQuery === '' || 
      b.event_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.organizer_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBlock && matchesStatus && matchesSearch;
  });

  // Counters
  const pendingCount = userRelevantBookings.filter(b => b.status === 'PENDING').length;
  const approvedCount = userRelevantBookings.filter(b => b.status === 'APPROVED').length;
  const totalCount = userRelevantBookings.length;

  const handlePrintSlip = (b: any) => {
    setSelectedSlipBooking(b);
    setTimeout(() => {
      window.print();
    }, 200);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* REAL-TIME NOTIFICATION ALERT BANNER */}
        {alertBanner && (
          <div className={`p-4 rounded-xl border shadow-sm flex items-start justify-between gap-3 ${
            alertBanner.type === 'success'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-rose-50 border-rose-300 text-rose-950'
          }`}>
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg shrink-0 ${
                alertBanner.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
              }`}>
                {alertBanner.type === 'success' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <AlertTriangle className="w-5 h-5" />
                )}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-sm">{alertBanner.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-white/80 border border-slate-200">
                    Recipient: {alertBanner.requesterName}
                  </span>
                  <span className="text-[10px] text-slate-500">{alertBanner.timestamp}</span>
                </div>
                <p className="text-xs mt-1 font-medium leading-relaxed">
                  {alertBanner.message}
                </p>
              </div>
            </div>
            <button
              onClick={dismissAlertBanner}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-md cursor-pointer shrink-0"
              title="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* DEMO / WORKFLOW SIMULATOR BAR FOR BLOCK-3 REQUEST & NOTIFICATIONS */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-4 rounded-xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 border border-blue-800">
          <div className="space-y-0.5">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                Block-3 Approval &amp; Notification Workflow Console
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Switch roles with 1-click to test the opposite party notification flow for Block-3:
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                const b3Coord = users.find(u => u.role === 'COORDINATOR' && u.assignedBlock === 'Block-3');
                if (b3Coord) loginAs(b3Coord);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                currentUser.role === 'COORDINATOR' && currentUser.assignedBlock === 'Block-3'
                  ? 'bg-amber-400 text-slate-950 shadow-xs ring-2 ring-white'
                  : 'bg-white/15 hover:bg-white/25 text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Venkat Rao (Coord B-3)</span>
            </button>

            <button
              onClick={() => {
                const facultyVenkat = users.find(u => u.name === 'Venkat' && u.role === 'FACULTY') || users.find(u => u.name === 'Venkat');
                if (facultyVenkat) loginAs(facultyVenkat);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                currentUser.name === 'Venkat' && currentUser.role === 'FACULTY'
                  ? 'bg-emerald-400 text-slate-950 shadow-xs ring-2 ring-white'
                  : 'bg-white/15 hover:bg-white/25 text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Venkat (Faculty)</span>
            </button>

            <button
              onClick={() => {
                const sireesha = users.find(u => u.name === 'Sireesha');
                if (sireesha) loginAs(sireesha);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                currentUser.name === 'Sireesha'
                  ? 'bg-indigo-400 text-slate-950 shadow-xs ring-2 ring-white'
                  : 'bg-white/15 hover:bg-white/25 text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Sireesha (Faculty)</span>
            </button>

            <button
              onClick={() => {
                const ramakrishna = users.find(u => u.name === 'Ramakrishna');
                if (ramakrishna) loginAs(ramakrishna);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                currentUser.name === 'Ramakrishna'
                  ? 'bg-sky-400 text-slate-950 shadow-xs ring-2 ring-white'
                  : 'bg-white/15 hover:bg-white/25 text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Ramakrishna (Faculty)</span>
            </button>
          </div>
        </div>
        
        {/* TOP PROFILE BANNER */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-full bg-blue-700 text-white font-black text-xl flex items-center justify-center shadow-xs">
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {currentUser.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-200 uppercase">
                    {currentUser.role}
                  </span>
                  {currentUser.assignedBlock && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
                      Incharge: {currentUser.assignedBlock}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {currentUser.department} • {currentUser.email} • Ph: {currentUser.phone}
                </p>
              </div>
            </div>

            {/* Top Action buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                id="btn-dash-header-back"
                onClick={goBack}
                className="px-3 py-2 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-900 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer border border-slate-300 shadow-2xs"
                title="Go back to previous screen"
              >
                <ArrowLeft className="w-4 h-4 text-blue-700" />
                <span>Back</span>
              </button>

              <button
                id="btn-dash-header-close"
                onClick={closePage}
                className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer border border-red-200 shadow-2xs"
                title="Close Dashboard and return to Home (Wrong symbol ✕)"
                aria-label="Close page"
              >
                <span>Close</span>
                <X className="w-3.5 h-3.5 text-red-700 stroke-[3]" />
              </button>

              <button
                onClick={() => openBookingModal()}
                className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                + New Hall Booking Request
              </button>

              {isAdmin && (
                <button
                  onClick={openConfigModal}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>College Config</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Total Requests</span>
              <div className="text-xl font-black text-slate-900 mt-0.5">{totalCount}</div>
            </div>
            <div className="p-3 bg-amber-50/70 rounded-lg border border-amber-200">
              <span className="text-[11px] font-bold text-amber-700 uppercase">Pending Approvals</span>
              <div className="text-xl font-black text-amber-900 mt-0.5">{pendingCount}</div>
            </div>
            <div className="p-3 bg-emerald-50/70 rounded-lg border border-emerald-200">
              <span className="text-[11px] font-bold text-emerald-700 uppercase">Confirmed Bookings</span>
              <div className="text-xl font-black text-emerald-900 mt-0.5">{approvedCount}</div>
            </div>
            <div className="p-3 bg-blue-50/70 rounded-lg border border-blue-200">
              <span className="text-[11px] font-bold text-blue-700 uppercase">Campus Halls Active</span>
              <div className="text-xl font-black text-blue-900 mt-0.5">3 / 3 Halls</div>
            </div>
          </div>
        </div>

        {/* ================= COORDINATOR HALL CONTROLS (IF COORDINATOR) ================= */}
        {isCoordinator && coordinatorAssignedBlock && (
          <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                  <Building2 className="w-5 h-5 text-blue-700" />
                  <span>Assigned Hall Management: {coordinatorAssignedBlock} Seminar Hall (Ground Floor • 180 Seats)</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Manage operational status and update photo for {coordinatorAssignedBlock} Seminar Hall
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    const hall = halls.find(h => h.block === coordinatorAssignedBlock);
                    if (hall) openChangeImageModal(hall);
                  }}
                  className="px-3 py-1.5 text-xs font-bold rounded-lg border border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-800 flex items-center space-x-1.5 cursor-pointer shadow-xs transition-colors"
                  title="Upload or change image for this seminar hall"
                >
                  <Camera className="w-4 h-4 text-blue-700" />
                  <span>Change Hall Photo</span>
                </button>

                <div className="flex items-center space-x-1 border-l border-slate-200 pl-2">
                  <span className="text-xs text-slate-500 font-semibold mr-1">Status:</span>
                  {(['Available', 'Booked', 'Maintenance'] as const).map(status => (
                    <button
                      key={status}
                      onClick={() => {
                        const hall = halls.find(h => h.block === coordinatorAssignedBlock);
                        if (hall) updateHall({ ...hall, status });
                      }}
                      className="px-2.5 py-1 text-[11px] font-bold rounded border bg-slate-50 hover:bg-blue-50 text-slate-700 cursor-pointer"
                    >
                      Set {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= ADMIN SPECIFIC TABS ================= */}
        {isAdmin && (
          <div className="flex space-x-2 border-b border-slate-200 pb-2">
            <button
              onClick={() => setAdminSubTab('requests')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                adminSubTab === 'requests'
                  ? 'bg-blue-700 text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              All College Booking Requests ({bookings.length})
            </button>
            <button
              onClick={() => setAdminSubTab('halls')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                adminSubTab === 'halls'
                  ? 'bg-blue-700 text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              Seminar Halls Configuration ({halls.length})
            </button>
            <button
              onClick={() => setAdminSubTab('coordinators')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                adminSubTab === 'coordinators'
                  ? 'bg-blue-700 text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              Assigned Hall Coordinators ({coordinators.length})
            </button>
          </div>
        )}

        {/* ================= ADMIN: HALLS SUBTAB ================= */}
        {isAdmin && adminSubTab === 'halls' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {halls.map(h => (
              <div key={h.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <div className="relative h-32 w-full rounded-lg overflow-hidden bg-slate-100 mb-2">
                  <img src={h.image} alt={h.hall_name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute top-2 right-2 bg-white/90 text-slate-800 font-bold text-[10px] px-2 py-0.5 rounded">
                    {h.status}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-900 text-base">{h.hall_name}</span>
                  <span className="text-xs font-bold text-slate-500">180 Seats</span>
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <div>Floor: <strong className="text-slate-800">Ground Floor</strong></div>
                  <div>Location: {h.location}</div>
                  <div className="pt-2">
                    <span className="font-semibold text-slate-700">Facilities:</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">{h.facilities.join(', ')}</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100 flex gap-2">
                  <button
                    onClick={() => openChangeImageModal(h)}
                    className="flex-1 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 font-bold text-xs rounded flex items-center justify-center space-x-1 cursor-pointer"
                    title="Personally change hall photo"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Change Photo</span>
                  </button>
                  <button
                    onClick={() => updateHall({ ...h, status: h.status === 'Available' ? 'Maintenance' : 'Available' })}
                    className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded cursor-pointer"
                  >
                    Toggle Maint.
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= ADMIN: COORDINATORS SUBTAB ================= */}
        {isAdmin && adminSubTab === 'coordinators' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {coordinators.map(c => (
              <div key={c.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-base">{c.name}</span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800">
                    {c.block}
                  </span>
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <div>Designation: {c.designation}</div>
                  <div>Department: {c.department}</div>
                  <div>Phone: {c.phone}</div>
                  <div>Email: {c.email}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= BOOKINGS TABLE (Coordinator review or User bookings or Admin) ================= */}
        {(!isAdmin || adminSubTab === 'requests') && (
          <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
            {/* Search & Filter Bar (#18 Filter Panel) */}
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/70 space-y-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-blue-700" />
                  <h3 className="font-bold text-sm text-slate-900">
                    {isCoordinator ? `Requests for ${coordinatorAssignedBlock}` : isAdmin ? 'All Department Bookings' : 'My Event Bookings & Slips'}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Search Input */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search event, dept, or organizer..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg w-52 sm:w-64"
                    />
                  </div>

                  {/* Block Filter */}
                  <select
                    value={filterBlock}
                    onChange={e => setFilterBlock(e.target.value)}
                    className="px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-700"
                  >
                    <option value="ALL">All Halls</option>
                    <option value="Block-2">Block-2</option>
                    <option value="Block-3">Block-3</option>
                    <option value="Block-4">Block-4</option>
                  </select>

                  {/* Status Filter */}
                  <select
                    value={filterStatus}
                    onChange={e => setFilterStatus(e.target.value)}
                    className="px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-700"
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="PENDING">Pending Approval</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100/80 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Event &amp; Department</th>
                    <th className="py-3 px-4">Hall &amp; Incharge</th>
                    <th className="py-3 px-4">Date &amp; Timing</th>
                    <th className="py-3 px-4">Organizer</th>
                    <th className="py-3 px-4">Requirements</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-500">
                        No booking requests found matching criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map(b => {
                      const isPending = b.status === 'PENDING';
                      const isApproved = b.status === 'APPROVED';
                      const isRejected = b.status === 'REJECTED';
                      const hallCoordinator = coordinators.find(c => c.block === b.block);

                      // Can the current user approve this?
                      // If admin OR if coordinator matches this block
                      const canApprove = (isAdmin || (isCoordinator && coordinatorAssignedBlock === b.block)) && isPending;

                      return (
                        <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900 text-xs">{b.event_name}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              {b.department} • <span className="font-medium text-blue-700">{b.event_type}</span>
                            </div>
                            <div className="text-[10px] text-slate-400">
                              Participants: {b.expected_participants} | Guests: {b.number_of_guests}
                            </div>
                          </td>

                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="font-bold text-blue-900 block">{b.block}</span>
                            <span className="text-[11px] text-slate-500">Coord: {hallCoordinator?.name || b.block}</span>
                          </td>

                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="font-bold text-slate-800">{b.date}</div>
                            <div className="text-[11px] text-slate-500">{b.start_time} – {b.end_time}</div>
                          </td>

                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="font-medium text-slate-900">{b.organizer_name}</div>
                            <div className="text-[11px] text-slate-500 font-mono">{b.contact_number}</div>
                          </td>

                          <td className="py-3.5 px-4 max-w-[180px]">
                            <div className="flex flex-wrap gap-1">
                              {b.requirements.slice(0, 3).map((r, i) => (
                                <span key={i} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px]">
                                  {r}
                                </span>
                              ))}
                              {b.requirements.length > 3 && (
                                <span className="text-[10px] text-slate-400">+{b.requirements.length - 3}</span>
                              )}
                            </div>
                            {b.remarks && (
                              <p className="text-[10px] text-slate-400 italic truncate mt-1" title={b.remarks}>
                                "{b.remarks}"
                              </p>
                            )}
                          </td>

                          <td className="py-3.5 px-4 text-center whitespace-nowrap">
                            <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              isApproved
                                ? 'bg-emerald-100 text-emerald-800'
                                : isPending
                                ? 'bg-amber-100 text-amber-900'
                                : 'bg-rose-100 text-rose-800'
                            }`}>
                              {b.status === 'APPROVED' ? 'Approved' : b.status === 'PENDING' ? 'Pending Approval' : 'Rejected'}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-1">
                            {/* APPROVE / REJECT CONTROLS FOR COORDINATORS */}
                            {canApprove && (
                              <div className="inline-flex items-center space-x-1.5">
                                <button
                                  onClick={() => acceptBooking(b.id, b.block === 'Block-3' ? 'Approved by Venkat Rao (Block-3 Coordinator)' : 'Approved by Hall Coordinator')}
                                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-bold shadow-xs cursor-pointer flex items-center space-x-1 transition-colors"
                                  title="Approve booking and send instant notification to requester"
                                >
                                  <Check className="w-3 h-3" />
                                  <span>Accept</span>
                                </button>
                                <button
                                  onClick={() => setDecliningBookingId(b.id)}
                                  className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded text-[11px] font-bold shadow-xs cursor-pointer flex items-center space-x-1 transition-colors"
                                  title="Decline booking with remarks and notify requester"
                                >
                                  <X className="w-3 h-3" />
                                  <span>Decline</span>
                                </button>
                              </div>
                            )}

                            {/* USER / PRINT CONFIRMATION SLIP */}
                            {isApproved && (
                              <button
                                onClick={() => handlePrintSlip(b)}
                                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-semibold inline-flex items-center space-x-1 cursor-pointer"
                                title="Print Official Booking Confirmation Slip"
                              >
                                <Printer className="w-3 h-3" />
                                <span>Slip</span>
                              </button>
                            )}

                            {/* CANCEL BUTTON FOR PENDING OR USER REQUEST */}
                            {isPending && (
                              <button
                                onClick={() => cancelBooking(b.id)}
                                className="px-2 py-1 text-red-600 hover:bg-red-50 rounded text-[11px] font-semibold cursor-pointer"
                              >
                                Cancel
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PRINTABLE OFFICIAL BOOKING CONFIRMATION SLIP (Hidden until triggered) */}
        {selectedSlipBooking && (
          <div className="hidden print:block fixed inset-0 bg-white p-8 z-50">
            <div className="text-center border-b-2 border-black pb-4">
              <h2 className="text-2xl font-black uppercase tracking-tight">
                Narasaraopeta Engineering College
              </h2>
              <p className="text-xs font-bold tracking-widest mt-1">
                Central Seminar Hall Allocation &amp; Event Clearance Slip
              </p>
              <p className="text-[11px] text-slate-600">
                Autonomous Institution | Kotappakonda Road, Yellamanda (P.O), Narasaraopet
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-xs">
              <div>
                <strong>Slip ID:</strong> NEC/SLIP/{selectedSlipBooking.id}
              </div>
              <div>
                <strong>Booking Date:</strong> {selectedSlipBooking.date}
              </div>
              <div>
                <strong>Seminar Hall:</strong> {selectedSlipBooking.hall_name} ({selectedSlipBooking.block})
              </div>
              <div>
                <strong>Allotted Time Slot:</strong> {selectedSlipBooking.start_time} - {selectedSlipBooking.end_time}
              </div>
              <div>
                <strong>Event Title:</strong> {selectedSlipBooking.event_name}
              </div>
              <div>
                <strong>Department:</strong> {selectedSlipBooking.department}
              </div>
              <div>
                <strong>Organizer Incharge:</strong> {selectedSlipBooking.organizer_name} ({selectedSlipBooking.contact_number})
              </div>
              <div>
                <strong>Hall Incharge:</strong> {coordinators.find(c => c.block === selectedSlipBooking.block)?.name || selectedSlipBooking.block}
              </div>
            </div>

            <div className="mt-4 border-t border-slate-300 pt-3 text-xs">
              <strong>Approved Facilities &amp; Dais Requisitions:</strong>
              <div className="mt-1 flex flex-wrap gap-2">
                {selectedSlipBooking.requirements.map((r: string, i: number) => (
                  <span key={i} className="px-2 py-0.5 bg-slate-100 border border-slate-300 rounded font-medium">
                    ✓ {r}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-slate-400 grid grid-cols-3 gap-4 text-center text-xs">
              <div>
                <div className="h-10"></div>
                <div className="border-t border-black pt-1 font-bold">Organizer Signature</div>
              </div>
              <div>
                <div className="h-10"></div>
                <div className="border-t border-black pt-1 font-bold">Hall Incharge Signature</div>
              </div>
              <div>
                <div className="h-10"></div>
                <div className="border-t border-black pt-1 font-bold">Principal Approval</div>
              </div>
            </div>
          </div>
        )}

        {/* DECLINE REASON MODAL */}
        {decliningBookingId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 bg-rose-700 text-white flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <XCircle className="w-5 h-5 text-rose-200" />
                  <h3 className="font-bold text-base">Decline Booking Requisition</h3>
                </div>
                <button
                  onClick={() => setDecliningBookingId(null)}
                  className="p-1 rounded hover:bg-rose-800 text-rose-100 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Provide an official reason for declining this seminar hall request. The organizer/requester will receive an immediate high-priority notification with your remarks.
                </p>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Quick Select Standard Reason:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      'Slot reserved for external lab examination',
                      'Scheduled electrical / AC maintenance in progress',
                      'Prior institutional academic council meeting',
                      'Inter-department event conflict on same floor'
                    ].map((reason, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setDeclineReason(reason)}
                        className={`p-2 text-left text-[11px] rounded-lg border transition-all cursor-pointer ${
                          declineReason === reason
                            ? 'bg-rose-50 border-rose-400 text-rose-900 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {reason}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Coordinator Remarks / Explanation:
                  </label>
                  <textarea
                    rows={3}
                    value={declineReason}
                    onChange={e => setDeclineReason(e.target.value)}
                    className="w-full text-xs p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
                    placeholder="Enter explicit reason for rejection..."
                  />
                </div>

                <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setDecliningBookingId(null)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (decliningBookingId) {
                        rejectBooking(decliningBookingId, declineReason || 'Declined by assigned Block Coordinator');
                        setDecliningBookingId(null);
                      }
                    }}
                    className="px-4 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-xs cursor-pointer"
                  >
                    Confirm Decline &amp; Send Notification
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
