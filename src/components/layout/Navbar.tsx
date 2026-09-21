import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  Calendar, 
  Clock, 
  CalendarDays, 
  UserCheck, 
  ShieldCheck, 
  Bell, 
  LogOut, 
  LogIn, 
  UserPlus, 
  Menu, 
  X, 
  Upload, 
  ChevronDown, 
  Info,
  CheckCircle2,
  AlertCircle,
  Home,
  Users,
  BedDouble,
  FileSpreadsheet,
  ArrowLeft
} from 'lucide-react';
import { User } from '../../types';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    activeTab, 
    setActiveTab, 
    goBack,
    closePage,
    config, 
    logout, 
    openAuthModal, 
    openConfigModal,
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead,
    users,
    loginAs
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const [isRoleSwitcherOpen, setIsRoleSwitcherOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const unreadNotifs = notifications.filter(n => !n.is_read);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifDropdownOpen(false);
      }
      if (roleRef.current && !roleRef.current.contains(event.target as Node)) {
        setIsRoleSwitcherOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (tab: any) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* College Institutional Banner Bar */}
      <div className="bg-blue-900 text-white text-xs px-4 py-1.5 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-semibold tracking-wide uppercase text-blue-200">
              Narasaraopeta Engineering College (Autonomous)
            </span>
            <span className="text-blue-300">|</span>
            <span className="text-blue-100 hidden md:inline">
              NAAC 'A+' Grade & NBA Accredited | JNTUK Permanent Affiliation
            </span>
          </div>
          <div className="flex items-center space-x-4 text-blue-100">
            <span>Official Event Management & Hall Allocation System</span>
            <button
              id="btn-edit-portal-config"
              onClick={openConfigModal}
              className="text-xs text-blue-200 hover:text-white underline cursor-pointer"
              title="Edit college placeholders & logo"
            >
              Config / Logo Settings
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand & Logo Placeholder */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('home')}>
            {/* Logo Container / Placeholder */}
            <div 
              className="group relative flex items-center justify-center w-14 h-14 rounded-lg bg-blue-50 border-2 border-dashed border-blue-400/80 hover:border-blue-600 transition-colors p-1"
              title="Click to change or upload college logo"
              onClick={(e) => {
                e.stopPropagation();
                openConfigModal();
              }}
            >
              {config.collegeLogoUrl ? (
                <img 
                  src={config.collegeLogoUrl} 
                  alt="NEC Logo" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="text-center">
                  <div className="text-[11px] font-black tracking-tighter text-blue-900 uppercase leading-none">
                    [ NEC ]
                  </div>
                  <div className="text-[9px] font-bold text-blue-600 uppercase tracking-widest leading-none mt-0.5">
                    LOGO
                  </div>
                </div>
              )}
              {/* Subtle hover upload hint */}
              <div className="absolute inset-0 bg-blue-900/80 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[9px] font-medium text-center p-0.5">
                <Upload className="w-3.5 h-3.5 mx-auto mb-0.5" />
              </div>
            </div>

            {/* Institution Titles */}
            <div className="flex flex-col">
              <span className="font-bold text-lg md:text-xl text-slate-900 tracking-tight leading-tight">
                {config.collegeName}
              </span>
              <span className="text-xs md:text-sm font-semibold text-blue-700 tracking-wide flex items-center space-x-1.5">
                <span>{config.portalTitle}</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 text-sm font-medium text-slate-700">
            <button
              id="nav-link-home"
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 rounded-md transition-colors ${
                activeTab === 'home' ? 'bg-blue-50 text-blue-700 font-semibold' : 'hover:text-blue-700 hover:bg-slate-50'
              }`}
            >
              Home
            </button>

            <button
              id="nav-link-halls"
              onClick={() => handleNavClick('halls')}
              className={`px-3 py-2 rounded-md transition-colors ${
                activeTab === 'halls' || activeTab === 'hall-detail' ? 'bg-blue-50 text-blue-700 font-semibold' : 'hover:text-blue-700 hover:bg-slate-50'
              }`}
            >
              Seminar Halls
            </button>

            <button
              id="nav-link-events"
              onClick={() => handleNavClick('events')}
              className={`px-3 py-2 rounded-md transition-colors ${
                activeTab === 'events' ? 'bg-blue-50 text-blue-700 font-semibold' : 'hover:text-blue-700 hover:bg-slate-50'
              }`}
            >
              Events
            </button>

            <button
              id="nav-link-slots"
              onClick={() => handleNavClick('slots')}
              className={`px-3 py-2 rounded-md transition-colors ${
                activeTab === 'slots' ? 'bg-blue-50 text-blue-700 font-semibold' : 'hover:text-blue-700 hover:bg-slate-50'
              }`}
            >
              Available Slots
            </button>

            {/* Authenticated Internal Links */}
            {currentUser && (
              <>
                <button
                  id="nav-link-examiner"
                  onClick={() => handleNavClick('examiner')}
                  className={`px-3 py-2 rounded-md transition-colors ${
                    activeTab === 'examiner' ? 'bg-blue-50 text-blue-700 font-semibold' : 'hover:text-blue-700 hover:bg-slate-50'
                  }`}
                  title="External Faculty & Examiner Arrangements"
                >
                  External Faculty
                </button>

                <button
                  id="nav-link-hostel"
                  onClick={() => handleNavClick('hostel')}
                  className={`px-3 py-2 rounded-md transition-colors ${
                    activeTab === 'hostel' ? 'bg-blue-50 text-blue-700 font-semibold' : 'hover:text-blue-700 hover:bg-slate-50'
                  }`}
                  title="Hostel Accommodation"
                >
                  Hostels
                </button>

                {currentUser.role === 'COORDINATOR' ? (
                  <button
                    id="nav-link-coordinator"
                    onClick={() => handleNavClick('coordinator')}
                    className={`px-3 py-2 rounded-md transition-colors ${
                      activeTab === 'coordinator' ? 'bg-amber-50 text-amber-900 font-semibold border border-amber-200' : 'text-amber-800 hover:bg-amber-50/60'
                    }`}
                  >
                    Coord Dashboard
                  </button>
                ) : (
                  <button
                    id="nav-link-dashboard"
                    onClick={() => handleNavClick('dashboard')}
                    className={`px-3 py-2 rounded-md transition-colors ${
                      activeTab === 'dashboard' ? 'bg-blue-50 text-blue-700 font-semibold' : 'hover:text-blue-700 hover:bg-slate-50'
                    }`}
                  >
                    My Dashboard
                  </button>
                )}
              </>
            )}

            <button
              id="nav-link-about"
              onClick={() => handleNavClick('about')}
              className={`px-3 py-2 rounded-md transition-colors ${
                activeTab === 'about' ? 'bg-blue-50 text-blue-700 font-semibold' : 'hover:text-blue-700 hover:bg-slate-50'
              }`}
            >
              About
            </button>
          </nav>

          {/* Right Action Section */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Direct Back & Wrong (Close) Symbol Button for Quick Page Navigation */}
            {activeTab !== 'home' && (
              <div className="flex items-center space-x-1.5">
                <button
                  id="btn-navbar-back"
                  onClick={goBack}
                  className="inline-flex items-center space-x-1 px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-lg text-xs font-bold border border-blue-200 transition-colors shadow-2xs cursor-pointer"
                  title="Go back to previous page"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-blue-700" />
                  <span>Back</span>
                </button>
                <button
                  id="btn-navbar-close"
                  onClick={closePage}
                  className="inline-flex items-center space-x-1 px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-xs font-bold border border-red-200 transition-colors shadow-2xs cursor-pointer"
                  title="Close Page (Wrong / Close symbol ✕)"
                  aria-label="Close page"
                >
                  <span className="hidden md:inline">Close</span>
                  <X className="w-3.5 h-3.5 text-red-600 stroke-[3]" />
                </button>
              </div>
            )}

            {/* Quick Demo Role Switcher */}
            <div className="relative" ref={roleRef}>
              <button
                id="btn-quick-role-switcher"
                onClick={() => setIsRoleSwitcherOpen(!isRoleSwitcherOpen)}
                className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md border border-slate-300 transition-colors"
                title="Switch test accounts (Suneel Sir, Venkat Rao, Tirumala Rao, Venkat, Sireesha, Ramakrishna)"
              >
                <Users className="w-3.5 h-3.5 text-blue-700" />
                <span className="hidden xl:inline">Role Switcher:</span>
                <span className="text-blue-800 font-bold max-w-[110px] truncate">
                  {currentUser ? currentUser.name.split(' ')[0] : 'Guest'}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {/* Role Switcher Dropdown */}
              {isRoleSwitcherOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1.5 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-900">Switch Active Test Profile</p>
                    <p className="text-[11px] text-slate-500">Test workflows from each role's perspective</p>
                  </div>
                  <div className="max-h-72 overflow-y-auto py-1 text-xs">
                    {/* Public / Unauthenticated */}
                    <button
                      onClick={() => {
                        logout();
                        setIsRoleSwitcherOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-semibold text-slate-800">Public / Unauthenticated</div>
                        <div className="text-slate-500 text-[10px]">Test login-required modal triggers</div>
                      </div>
                      {!currentUser && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                    </button>

                    <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50">
                      Coordinators
                    </div>

                    {users.filter(u => u.role === 'COORDINATOR').map(user => (
                      <button
                        key={user.id}
                        onClick={() => {
                          loginAs(user);
                          setIsRoleSwitcherOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-blue-50/70 flex items-center justify-between"
                      >
                        <div>
                          <div className="font-semibold text-blue-950 flex items-center space-x-1">
                            <span>{user.name}</span>
                            <span className="px-1.5 py-0.2 bg-amber-100 text-amber-800 text-[10px] font-bold rounded">
                              {user.assignedBlock}
                            </span>
                          </div>
                          <div className="text-slate-500 text-[10px]">{user.department}</div>
                        </div>
                        {currentUser?.id === user.id && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                      </button>
                    ))}

                    <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50">
                      Faculty Members (Venkat, Sireesha, Ramakrishna)
                    </div>

                    {users.filter(u => u.role === 'FACULTY').map(user => (
                      <button
                        key={user.id}
                        onClick={() => {
                          loginAs(user);
                          setIsRoleSwitcherOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-blue-50/70 flex items-center justify-between"
                      >
                        <div>
                          <div className="font-semibold text-slate-900 flex items-center space-x-1">
                            <span>{user.name}</span>
                            <span className="px-1.5 py-0.2 bg-blue-100 text-blue-800 text-[10px] font-bold rounded">
                              Faculty
                            </span>
                          </div>
                          <div className="text-slate-500 text-[10px]">{user.department}</div>
                        </div>
                        {currentUser?.id === user.id && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative" ref={notifRef}>
              <button
                id="btn-notifications-bell"
                onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
                className="relative p-2 text-slate-600 hover:text-blue-700 hover:bg-slate-100 rounded-full transition-colors"
                title="Notifications"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                    {unreadNotifs.length}
                  </span>
                )}
              </button>

              {/* Notification Dropdown Panel */}
              {isNotifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Notifications</h4>
                      <p className="text-xs text-slate-500">
                        {unreadNotifs.length} unread updates
                      </p>
                    </div>
                    {unreadNotifs.length > 0 && (
                      <button
                        onClick={markAllNotificationsAsRead}
                        className="text-xs font-semibold text-blue-700 hover:text-blue-900 cursor-pointer"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-500">
                        No notifications at this time.
                      </div>
                    ) : (
                      notifications.slice(0, 8).map(notif => (
                        <div
                          key={notif.id}
                          onClick={() => {
                            markNotificationAsRead(notif.id);
                            if (notif.link_tab) {
                              setActiveTab(notif.link_tab as any);
                            }
                            setIsNotifDropdownOpen(false);
                          }}
                          className={`p-3 text-xs cursor-pointer hover:bg-slate-50 transition-colors ${
                            !notif.is_read ? 'bg-blue-50/50 font-medium' : 'text-slate-600'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <span className="font-semibold text-slate-900">{notif.title}</span>
                            <span className="text-[10px] text-slate-400">{notif.created_at}</span>
                          </div>
                          <p className="text-slate-600 mt-1 line-clamp-2 text-[11px] leading-relaxed">
                            {notif.message}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Authentication Buttons / User Profile */}
            {currentUser ? (
              <div className="relative" ref={userRef}>
                <button
                  id="btn-user-profile-menu"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 pl-2 pr-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="text-left hidden md:block">
                    <div className="text-xs font-bold text-slate-900 truncate max-w-[120px]">
                      {currentUser.name}
                    </div>
                    <div className="text-[10px] font-semibold text-blue-700 uppercase">
                      {currentUser.role}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden md:block" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 py-1.5 z-50">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded">
                        {currentUser.role} {currentUser.assignedBlock ? `(${currentUser.assignedBlock})` : ''}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setActiveTab('dashboard');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                    >
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      <span>My Bookings & Requests</span>
                    </button>

                    {currentUser.role === 'COORDINATOR' && (
                      <button
                        onClick={() => {
                          setActiveTab('coordinator');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-amber-800 font-semibold hover:bg-amber-50 flex items-center space-x-2"
                      >
                        <UserCheck className="w-3.5 h-3.5 text-amber-600" />
                        <span>Coordinator Console</span>
                      </button>
                    )}

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      id="btn-logout"
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center space-x-2 font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5 text-red-500" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  id="btn-nav-login"
                  onClick={() => openAuthModal('login')}
                  className="inline-flex items-center space-x-1 px-3 py-2 text-xs sm:text-sm font-semibold text-blue-700 hover:text-blue-900 hover:bg-blue-50 rounded-md transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>
                <button
                  id="btn-nav-signup"
                  onClick={() => openAuthModal('signup')}
                  className="inline-flex items-center space-x-1 px-3 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md shadow-xs transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </button>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-6 space-y-1 shadow-lg">
          <button
            onClick={() => handleNavClick('home')}
            className="w-full text-left px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-md"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('halls')}
            className="w-full text-left px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-md"
          >
            Seminar Halls
          </button>
          <button
            onClick={() => handleNavClick('events')}
            className="w-full text-left px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-md"
          >
            Events
          </button>
          <button
            onClick={() => handleNavClick('slots')}
            className="w-full text-left px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-md"
          >
            Available Slots
          </button>
          {currentUser && (
            <>
              <button
                onClick={() => handleNavClick('dashboard')}
                className="w-full text-left px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 rounded-md"
              >
                My Dashboard
              </button>
              <button
                onClick={() => handleNavClick('examiner')}
                className="w-full text-left px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-md"
              >
                External Faculty Arrangements
              </button>
              <button
                onClick={() => handleNavClick('hostel')}
                className="w-full text-left px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-md"
              >
                Hostel Accommodation
              </button>
              {currentUser.role === 'COORDINATOR' ? (
                <button
                  onClick={() => handleNavClick('coordinator')}
                  className="w-full text-left px-3 py-2 text-sm font-semibold text-amber-800 hover:bg-amber-50 rounded-md"
                >
                  Coordinator Console ({currentUser.assignedBlock})
                </button>
              ) : (
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="w-full text-left px-3 py-2 text-sm font-semibold text-blue-900 hover:bg-blue-50 rounded-md"
                >
                  My Dashboard
                </button>
              )}
            </>
          )}
          <button
            onClick={() => handleNavClick('about')}
            className="w-full text-left px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-md"
          >
            About
          </button>
          <div className="pt-2 border-t border-slate-100 flex flex-col space-y-2">
            <button
              onClick={openConfigModal}
              className="text-xs text-blue-700 text-left px-3 py-1 font-medium"
            >
              Settings & Logo Upload
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
