import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Coordinator,
  SeminarHall,
  Booking,
  EventItem,
  ExternalFaculty,
  HostelDetails,
  NotificationItem,
  CollegeConfig,
  BookingStatus
} from '../types';
import {
  INITIAL_CONFIG,
  INITIAL_COORDINATORS,
  INITIAL_HALLS,
  INITIAL_USERS,
  INITIAL_BOOKINGS,
  INITIAL_EVENTS,
  INITIAL_EXTERNAL_FACULTY,
  INITIAL_HOSTELS,
  INITIAL_NOTIFICATIONS
} from '../data/initialData';

export type ActiveTab = 
  | 'home' 
  | 'halls' 
  | 'hall-detail' 
  | 'slots' 
  | 'events' 
  | 'dashboard' 
  | 'coordinator' 
  | 'admin' 
  | 'examiner' 
  | 'hostel' 
  | 'about';

interface AppContextType {
  currentUser: User | null;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  goBack: () => void;
  closePage: () => void;
  selectedHallId: string | null;
  setSelectedHallId: (id: string | null) => void;
  selectedExaminerId: string | null;
  setSelectedExaminerId: (id: string | null) => void;
  config: CollegeConfig;
  updateConfig: (newConfig: Partial<CollegeConfig>) => void;
  resetLogo: () => void;
  uploadLogo: (base64OrUrl: string) => void;
  
  // Data
  users: User[];
  coordinators: Coordinator[];
  halls: SeminarHall[];
  bookings: Booking[];
  events: EventItem[];
  externalFaculty: ExternalFaculty[];
  hostels: HostelDetails[];
  notifications: NotificationItem[];
  
  // Auth
  login: (emailOrId: string, password?: string) => boolean;
  loginAs: (user: User) => void;
  logout: () => void;
  signUp: (userData: Omit<User, 'id' | 'isActive'>) => boolean;
  
  // Modals
  isLoginRequiredOpen: boolean;
  loginRequiredReason: string;
  openLoginRequired: (reason?: string, pendingAction?: () => void) => void;
  closeLoginRequired: () => void;
  
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup';
  openAuthModal: (mode?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  
  isBookingModalOpen: boolean;
  bookingModalPreFill: { block?: 'Block-2' | 'Block-3' | 'Block-4'; date?: string; slot?: string } | null;
  openBookingModal: (preFill?: { block?: 'Block-2' | 'Block-3' | 'Block-4'; date?: string; slot?: string }) => void;
  closeBookingModal: () => void;
  
  isExaminerModalOpen: boolean;
  openExaminerModal: () => void;
  closeExaminerModal: () => void;

  isTimetableModalOpen: boolean;
  openTimetableModal: (examinerId: string) => void;
  closeTimetableModal: () => void;

  isConfigModalOpen: boolean;
  openConfigModal: () => void;
  closeConfigModal: () => void;

  // Hall Image Change Modal
  isChangeImageModalOpen: boolean;
  editingHallForImage: SeminarHall | null;
  openChangeImageModal: (hall: SeminarHall) => void;
  closeChangeImageModal: () => void;
  updateHallImage: (hallId: string, image: string) => void;

  // Upload Event Modal
  isUploadEventModalOpen: boolean;
  openUploadEventModal: () => void;
  closeUploadEventModal: () => void;
  addEvent: (eventData: Omit<EventItem, 'id' | 'status'> & { status?: 'Upcoming' | 'Today' | 'Completed' }) => void;

  // Alert Banner for Block-3 (and other) Request Status Updates
  alertBanner: { id: string; title: string; message: string; type: 'success' | 'error'; timestamp: string; recipientId: string; requesterName: string } | null;
  dismissAlertBanner: () => void;

  // Actions
  createBookingRequest: (data: Omit<Booking, 'id' | 'status' | 'created_at' | 'requester_id' | 'requester_name' | 'requester_role'>) => boolean;
  acceptBooking: (bookingId: string, coordinatorRemarks?: string) => void;
  rejectBooking: (bookingId: string, remarks: string) => void;
  cancelBooking: (bookingId: string) => void;
  
  addExternalFacultyArrangement: (data: Omit<ExternalFaculty, 'id' | 'status' | 'created_at'>) => void;
  updateExternalFacultyStatus: (id: string, status: ExternalFaculty['status']) => void;
  
  updateHall: (hall: SeminarHall) => void;
  updateCoordinator: (coordinator: Coordinator) => void;
  toggleUserStatus: (userId: string) => void;
  updateUserRole: (userId: string, role: User['role']) => void;
  
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  
  // Notifications helpers
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'nec_current_user',
  USERS: 'nec_users',
  COORDINATORS: 'nec_coordinators',
  HALLS: 'nec_halls',
  BOOKINGS: 'nec_bookings',
  EVENTS: 'nec_events',
  EXTERNAL: 'nec_external_faculty',
  HOSTELS: 'nec_hostels',
  NOTIFICATIONS: 'nec_notifications',
  CONFIG: 'nec_config'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved state or fall back to initial data
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    if (saved) {
      try {
        const parsed: User = JSON.parse(saved);
        if (parsed.name.toLowerCase().includes('murali') || parsed.name.toLowerCase().includes('admin')) {
          return null;
        }
        return parsed;
      } catch (e) { /* ignore */ }
    }
    return null;
  });

  const [activeTab, setActiveTabState] = useState<ActiveTab>('home');
  const [tabHistory, setTabHistory] = useState<ActiveTab[]>(['home']);
  const [selectedHallId, setSelectedHallId] = useState<string | null>('hall-b2');
  const [selectedExaminerId, setSelectedExaminerId] = useState<string | null>(null);

  const [config, setConfig] = useState<CollegeConfig>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_CONFIG;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USERS);
    if (saved) {
      try {
        const parsed: User[] = JSON.parse(saved);
        const hasOldAdmin = parsed.some(u => u.name.toLowerCase().includes('murali') || (u.role === 'ADMIN' && u.name.toLowerCase().includes('admin')));
        const hasVenkat = parsed.some(u => u.name === 'Venkat' && u.role === 'FACULTY');
        const hasSireesha = parsed.some(u => u.name === 'Sireesha');
        const hasRamakrishna = parsed.some(u => u.name === 'Ramakrishna');
        if (!hasOldAdmin && hasVenkat && hasSireesha && hasRamakrishna) {
          return parsed;
        }
      } catch (e) { /* ignore */ }
    }
    return INITIAL_USERS;
  });

  const [coordinators, setCoordinators] = useState<Coordinator[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COORDINATORS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_COORDINATORS;
  });

  const [halls, setHalls] = useState<SeminarHall[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.HALLS);
    if (saved) {
      try {
        const parsed: SeminarHall[] = JSON.parse(saved);
        return parsed.map(h => ({
          ...h,
          capacity: 180,
          location: h.location.replace(/First Floor|Second Floor/gi, 'Ground Floor')
        }));
      } catch (e) { /* ignore */ }
    }
    return INITIAL_HALLS;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_BOOKINGS;
  });

  const [events, setEvents] = useState<EventItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EVENTS);
    if (saved) {
      try {
        const parsed: EventItem[] = JSON.parse(saved);
        // Ensure blood donation camp is present if not already added
        const hasBloodCamp = parsed.some(e => e.id === 'evt-blood-camp-b4' || e.event_name.toLowerCase().includes('blood donation'));
        if (!hasBloodCamp) {
          const bloodCampEvent = INITIAL_EVENTS.find(e => e.id === 'evt-blood-camp-b4');
          if (bloodCampEvent) {
            return [bloodCampEvent, ...parsed];
          }
        }
        return parsed;
      } catch (e) { /* ignore */ }
    }
    return INITIAL_EVENTS;
  });

  const [externalFaculty, setExternalFaculty] = useState<ExternalFaculty[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EXTERNAL);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_EXTERNAL_FACULTY;
  });

  const [hostels, setHostels] = useState<HostelDetails[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.HOSTELS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_HOSTELS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_NOTIFICATIONS;
  });

  // Modal states
  const [isLoginRequiredOpen, setIsLoginRequiredOpen] = useState(false);
  const [loginRequiredReason, setLoginRequiredReason] = useState('Please login or create an account to continue.');
  const [pendingPostLoginAction, setPendingPostLoginAction] = useState<(() => void) | null>(null);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingModalPreFill, setBookingModalPreFill] = useState<{ block?: 'Block-2' | 'Block-3' | 'Block-4'; date?: string; slot?: string } | null>(null);

  const [isExaminerModalOpen, setIsExaminerModalOpen] = useState(false);
  const [isTimetableModalOpen, setIsTimetableModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);

  // Hall Image Change Modal State
  const [isChangeImageModalOpen, setIsChangeImageModalOpen] = useState(false);
  const [editingHallForImage, setEditingHallForImage] = useState<SeminarHall | null>(null);

  const openChangeImageModal = (hall: SeminarHall) => {
    setEditingHallForImage(hall);
    setIsChangeImageModalOpen(true);
  };

  const closeChangeImageModal = () => {
    setIsChangeImageModalOpen(false);
    setEditingHallForImage(null);
  };

  const updateHallImage = (hallId: string, image: string) => {
    setHalls(prev => prev.map(h => h.id === hallId ? { ...h, image } : h));
    showToast('Seminar hall photo updated successfully!', 'success');
  };

  // Upload Event Modal State
  const [isUploadEventModalOpen, setIsUploadEventModalOpen] = useState(false);

  const openUploadEventModal = () => {
    setIsUploadEventModalOpen(true);
  };

  const closeUploadEventModal = () => {
    setIsUploadEventModalOpen(false);
  };

  const addEvent = (eventData: Omit<EventItem, 'id' | 'status'> & { status?: 'Upcoming' | 'Today' | 'Completed' }) => {
    const newEvent: EventItem = {
      ...eventData,
      id: `evt-custom-${Date.now()}`,
      status: eventData.status || (eventData.date === new Date().toISOString().split('T')[0] ? 'Today' : 'Upcoming')
    };
    setEvents(prev => [newEvent, ...prev]);

    // Send broadcast notification
    const notif: NotificationItem = {
      id: `notif-evt-${Date.now()}`,
      user_id: 'ALL',
      title: `Event Announced: ${newEvent.event_name}`,
      message: `${newEvent.event_name} organized by ${newEvent.department} will be held in ${newEvent.hall_name} (${newEvent.block} Ground Floor) on ${newEvent.date} (${newEvent.start_time} - ${newEvent.end_time}).`,
      type: 'EVENT_ANNOUNCED',
      is_read: false,
      created_at: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      link_tab: 'events'
    };
    setNotifications(prev => [notif, ...prev]);
    showToast(`Event "${newEvent.event_name}" uploaded and published to campus schedule!`, 'success');
  };

  // Alert Banner for Real-time Request Notifications (e.g. Block-3 Accepted / Declined)
  const [alertBanner, setAlertBanner] = useState<{
    id: string;
    title: string;
    message: string;
    type: 'success' | 'error';
    timestamp: string;
    recipientId: string;
    requesterName: string;
  } | null>(null);

  const dismissAlertBanner = () => {
    setAlertBanner(null);
  };

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Persist to local storage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COORDINATORS, JSON.stringify(coordinators));
  }, [coordinators]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HALLS, JSON.stringify(halls));
  }, [halls]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EXTERNAL, JSON.stringify(externalFaculty));
  }, [externalFaculty]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  // Tab navigation wrapper with scroll-to-top and history
  const setActiveTab = (tab: ActiveTab) => {
    setActiveTabState(prev => {
      if (prev !== tab) {
        setTabHistory(h => [...h, tab]);
      }
      return tab;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    setTabHistory(prev => {
      if (prev.length > 1) {
        const nextHist = prev.slice(0, -1);
        const prevTab = nextHist[nextHist.length - 1] || 'home';
        setActiveTabState(prevTab);
        return nextHist;
      } else {
        setActiveTabState('home');
        return ['home'];
      }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closePage = () => {
    setActiveTabState('home');
    setTabHistory(['home']);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Config handlers
  const updateConfig = (newConfig: Partial<CollegeConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
    showToast('College portal configuration updated.', 'success');
  };

  const resetLogo = () => {
    setConfig(prev => ({ ...prev, collegeLogoUrl: null }));
    showToast('Logo reset to placeholder [ NEC LOGO ].', 'info');
  };

  const uploadLogo = (base64OrUrl: string) => {
    setConfig(prev => ({ ...prev, collegeLogoUrl: base64OrUrl }));
    showToast('College logo updated successfully.', 'success');
  };

  // Auth handlers
  const login = (emailOrId: string, _password?: string): boolean => {
    const trimmed = emailOrId.trim().toLowerCase();
    const found = users.find(u => 
      u.email.toLowerCase() === trimmed || 
      u.employee_id.toLowerCase() === trimmed
    );

    if (found) {
      if (!found.isActive) {
        showToast('This account has been deactivated by administrator.', 'error');
        return false;
      }
      setCurrentUser(found);
      setIsAuthModalOpen(false);
      setIsLoginRequiredOpen(false);
      showToast(`Welcome back, ${found.name}!`, 'success');

      if (pendingPostLoginAction) {
        pendingPostLoginAction();
        setPendingPostLoginAction(null);
      } else {
        // Direct to appropriate dashboard
        if (found.role === 'ADMIN') {
          setActiveTab('admin');
        } else if (found.role === 'COORDINATOR') {
          setActiveTab('coordinator');
        } else {
          setActiveTab('dashboard');
        }
      }
      return true;
    } else {
      showToast('Invalid credentials. Please check your Email/ID or try a demo account.', 'error');
      return false;
    }
  };

  const loginAs = (user: User) => {
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    setIsLoginRequiredOpen(false);
    showToast(`Logged in as ${user.name} (${user.role})`, 'success');

    if (pendingPostLoginAction) {
      pendingPostLoginAction();
      setPendingPostLoginAction(null);
    } else {
      if (user.role === 'ADMIN') {
        setActiveTab('admin');
      } else if (user.role === 'COORDINATOR') {
        setActiveTab('coordinator');
      } else {
        setActiveTab('dashboard');
      }
    }
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('You have been logged out successfully.', 'info');
    setActiveTab('home');
  };

  const signUp = (userData: Omit<User, 'id' | 'isActive'>): boolean => {
    const existing = users.find(u => 
      u.email.toLowerCase() === userData.email.trim().toLowerCase() ||
      u.employee_id.toLowerCase() === userData.employee_id.trim().toLowerCase()
    );

    if (existing) {
      showToast('An account with this Email or Employee/Student ID already exists.', 'error');
      return false;
    }

    const newUser: User = {
      ...userData,
      id: `usr-${Date.now()}`,
      isActive: true
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
    setIsLoginRequiredOpen(false);
    showToast(`Account created successfully! Welcome, ${newUser.name}.`, 'success');

    if (pendingPostLoginAction) {
      pendingPostLoginAction();
      setPendingPostLoginAction(null);
    } else {
      if (newUser.role === 'ADMIN') {
        setActiveTab('admin');
      } else if (newUser.role === 'COORDINATOR') {
        setActiveTab('coordinator');
      } else {
        setActiveTab('dashboard');
      }
    }
    return true;
  };

  // Modals management
  const openLoginRequired = (reason?: string, pendingAction?: () => void) => {
    setLoginRequiredReason(reason || 'Please login or create an account to continue.');
    if (pendingAction) {
      setPendingPostLoginAction(() => pendingAction);
    }
    setIsLoginRequiredOpen(true);
  };

  const closeLoginRequired = () => {
    setIsLoginRequiredOpen(false);
    setPendingPostLoginAction(null);
  };

  const openAuthModal = (mode: 'login' | 'signup' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const openBookingModal = (preFill?: { block?: 'Block-2' | 'Block-3' | 'Block-4'; date?: string; slot?: string }) => {
    if (!currentUser) {
      openLoginRequired('Please login or create an account to request a seminar hall slot.', () => {
        setBookingModalPreFill(preFill || null);
        setIsBookingModalOpen(true);
      });
      return;
    }
    setBookingModalPreFill(preFill || null);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setBookingModalPreFill(null);
  };

  const openExaminerModal = () => {
    if (!currentUser) {
      openLoginRequired('Login required to register external faculty / examiner arrangements.', () => {
        setIsExaminerModalOpen(true);
      });
      return;
    }
    setIsExaminerModalOpen(true);
  };

  const closeExaminerModal = () => {
    setIsExaminerModalOpen(false);
  };

  const openTimetableModal = (examinerId: string) => {
    setSelectedExaminerId(examinerId);
    setIsTimetableModalOpen(true);
  };

  const closeTimetableModal = () => {
    setIsTimetableModalOpen(false);
  };

  const openConfigModal = () => {
    setIsConfigModalOpen(true);
  };

  const closeConfigModal = () => {
    setIsConfigModalOpen(false);
  };

  // Booking workflows
  const createBookingRequest = (
    data: Omit<Booking, 'id' | 'status' | 'created_at' | 'requester_id' | 'requester_name' | 'requester_role'>
  ): boolean => {
    if (!currentUser) {
      openLoginRequired();
      return false;
    }

    // Check duplicate/collision for approved booking
    const hasConflict = bookings.some(b => 
      b.block === data.block &&
      b.date === data.date &&
      b.start_time === data.start_time &&
      b.status === 'APPROVED'
    );

    if (hasConflict) {
      showToast(`Conflict detected: ${data.block} is already booked on ${data.date} for ${data.start_time}. Please select an alternative slot.`, 'error');
      return false;
    }

    const newBooking: Booking = {
      ...data,
      id: `bk-${Date.now()}`,
      requester_id: currentUser.id,
      requester_name: currentUser.name,
      requester_role: currentUser.role,
      status: 'PENDING',
      created_at: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setBookings(prev => [newBooking, ...prev]);

    // Find coordinator for this block to alert
    const targetCoordinator = coordinators.find(c => c.block === data.block);
    const coordName = targetCoordinator ? targetCoordinator.name : `${data.block} Coordinator`;

    // Add notification to block coordinator
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      user_id: targetCoordinator ? targetCoordinator.id : 'ALL',
      title: 'New Booking Request Received',
      message: `${currentUser.name} (${currentUser.department}) has submitted a booking request for ${data.hall_name} on ${data.date} (${data.start_time} - ${data.end_time}) for "${data.event_name}".`,
      type: 'BOOKING_REQUEST',
      is_read: false,
      created_at: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      link_tab: 'coordinator'
    };
    setNotifications(prev => [newNotif, ...prev]);

    showToast(`Booking request sent successfully. Status: PENDING COORDINATOR APPROVAL (${coordName})`, 'success');
    closeBookingModal();
    return true;
  };

  const acceptBooking = (bookingId: string, coordinatorRemarks?: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    const isBlock3 = booking.block === 'Block-3';
    const approverName = isBlock3 
      ? 'Venkat Rao (Block-3 Coordinator)' 
      : (currentUser?.name || `${booking.block} Coordinator`);

    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: 'APPROVED',
          approved_by: approverName,
          coordinator_remarks: coordinatorRemarks || (isBlock3 ? 'Approved by Venkat Rao (Block-3 Coordinator)' : 'Approved by Hall Coordinator')
        };
      }
      return b;
    }));

    // Add to public Events
    const newEvent: EventItem = {
      id: `evt-${Date.now()}`,
      booking_id: booking.id,
      event_name: booking.event_name,
      department: booking.department,
      date: booking.date,
      start_time: booking.start_time,
      end_time: booking.end_time,
      hall_id: booking.hall_id,
      hall_name: booking.hall_name,
      block: booking.block,
      organizer: booking.organizer_name || booking.requester_name,
      description: `Approved event: ${booking.event_name} organized by ${booking.department}. Expected participants: ${booking.expected_participants}. Venue: ${booking.hall_name} (Ground Floor).`,
      status: booking.date === new Date().toISOString().split('T')[0] ? 'Today' : 'Upcoming',
      category: booking.event_type
    };
    setEvents(prev => [newEvent, ...prev]);

    // Send notification specifically to requester (the opposite party)
    const notifTitle = isBlock3 
      ? 'Block-3 Seminar Hall Booking Request ACCEPTED' 
      : 'Booking Request Approved';
    const notifMessage = isBlock3
      ? `Good news! Your booking request for Block-3 Seminar Hall on ${booking.date} (${booking.start_time} - ${booking.end_time}) for "${booking.event_name}" has been ACCEPTED by Venkat Rao (Block-3 Coordinator). Slot is now confirmed!`
      : `Your request for ${booking.hall_name} on ${booking.date} (${booking.start_time} - ${booking.end_time}) for "${booking.event_name}" has been approved by ${approverName}. The slot is now confirmed!`;

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      user_id: booking.requester_id,
      title: notifTitle,
      message: notifMessage,
      type: 'BOOKING_APPROVED',
      is_read: false,
      created_at: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      link_tab: 'dashboard'
    };
    setNotifications(prev => [notif, ...prev]);

    // Set real-time alert banner for the requester
    setAlertBanner({
      id: `alert-${Date.now()}`,
      title: notifTitle,
      message: notifMessage,
      type: 'success',
      timestamp: notif.created_at,
      recipientId: booking.requester_id,
      requesterName: booking.requester_name
    });

    showToast(`Booking for "${booking.event_name}" has been ACCEPTED. Notification sent to ${booking.requester_name}!`, 'success');
  };

  const rejectBooking = (bookingId: string, remarks: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    const isBlock3 = booking.block === 'Block-3';
    const rejecterName = isBlock3 
      ? 'Venkat Rao (Block-3 Coordinator)' 
      : (currentUser?.name || `${booking.block} Coordinator`);

    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: 'REJECTED',
          approved_by: rejecterName,
          coordinator_remarks: remarks || 'Slot unavailable / Maintenance'
        };
      }
      return b;
    }));

    // Send notification specifically to requester (the opposite party)
    const notifTitle = isBlock3 
      ? 'Block-3 Seminar Hall Booking Request DECLINED' 
      : 'Booking Request Declined';
    const notifMessage = isBlock3
      ? `Your booking request for Block-3 Seminar Hall on ${booking.date} for "${booking.event_name}" was DECLINED by Venkat Rao (Block-3 Coordinator). Reason: ${remarks || 'Slot unavailable / Departmental conflict'}.`
      : `Your request for ${booking.hall_name} on ${booking.date} for "${booking.event_name}" was declined by ${rejecterName}. Reason: ${remarks || 'Slot unavailable'}.`;

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      user_id: booking.requester_id,
      title: notifTitle,
      message: notifMessage,
      type: 'BOOKING_REJECTED',
      is_read: false,
      created_at: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      link_tab: 'dashboard'
    };
    setNotifications(prev => [notif, ...prev]);

    // Set real-time alert banner for the requester
    setAlertBanner({
      id: `alert-${Date.now()}`,
      title: notifTitle,
      message: notifMessage,
      type: 'error',
      timestamp: notif.created_at,
      recipientId: booking.requester_id,
      requesterName: booking.requester_name
    });

    showToast(`Booking for "${booking.event_name}" DECLINED. Notification sent to ${booking.requester_name}.`, 'info');
  };

  const cancelBooking = (bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'CANCELLED' } : b));
    setEvents(prev => prev.filter(e => e.booking_id !== bookingId));

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      user_id: 'ALL',
      title: 'Booking Cancelled',
      message: `Booking for ${booking.hall_name} on ${booking.date} (${booking.event_name}) has been cancelled and the slot is now open.`,
      type: 'BOOKING_CANCELLED',
      is_read: false,
      created_at: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setNotifications(prev => [notif, ...prev]);

    showToast('Booking cancelled. Slot is now available.', 'info');
  };

  // External Faculty handlers
  const addExternalFacultyArrangement = (data: Omit<ExternalFaculty, 'id' | 'status' | 'created_at'>) => {
    const newRecord: ExternalFaculty = {
      ...data,
      id: `ext-${Date.now()}`,
      status: 'Scheduled',
      created_at: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setExternalFaculty(prev => [newRecord, ...prev]);

    // Add alert notification
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      user_id: 'ALL',
      title: 'External Faculty Examiner Arranged',
      message: `Arrangements confirmed for ${data.name} (${data.institution}) visiting on ${data.visit_date} for ${data.purpose}.`,
      type: 'EXAMINER_ARRANGEMENT',
      is_read: false,
      created_at: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      link_tab: 'examiner'
    };
    setNotifications(prev => [notif, ...prev]);

    showToast(`External faculty arrangement for ${data.name} registered successfully!`, 'success');
    closeExaminerModal();
    // Open timetable directly to view
    openTimetableModal(newRecord.id);
  };

  const updateExternalFacultyStatus = (id: string, status: ExternalFaculty['status']) => {
    setExternalFaculty(prev => prev.map(f => f.id === id ? { ...f, status } : f));
    showToast(`Faculty arrangement status updated to ${status}.`, 'info');
  };

  // Admin updates
  const updateHall = (updated: SeminarHall) => {
    setHalls(prev => prev.map(h => h.id === updated.id ? updated : h));
    showToast(`${updated.hall_name} details updated.`, 'success');
  };

  const updateCoordinator = (updated: Coordinator) => {
    setCoordinators(prev => prev.map(c => c.id === updated.id ? updated : c));
    showToast(`Coordinator details for ${updated.name} updated.`, 'success');
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, isActive: !u.isActive } : u));
    showToast('User activation status changed.', 'info');
  };

  const updateUserRole = (userId: string, role: User['role']) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role } : u));
    showToast(`User role updated to ${role}.`, 'success');
  };

  // Notification actions
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    showToast('All notifications marked as read.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        activeTab,
        setActiveTab,
        goBack,
        closePage,
        selectedHallId,
        setSelectedHallId,
        selectedExaminerId,
        setSelectedExaminerId,
        config,
        updateConfig,
        resetLogo,
        uploadLogo,
        users,
        coordinators,
        halls,
        bookings,
        events,
        externalFaculty,
        hostels,
        notifications,
        login,
        loginAs,
        logout,
        signUp,
        isLoginRequiredOpen,
        loginRequiredReason,
        openLoginRequired,
        closeLoginRequired,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        isBookingModalOpen,
        bookingModalPreFill,
        openBookingModal,
        closeBookingModal,
        isExaminerModalOpen,
        openExaminerModal,
        closeExaminerModal,
        isTimetableModalOpen,
        openTimetableModal,
        closeTimetableModal,
        isConfigModalOpen,
        openConfigModal,
        closeConfigModal,
        isChangeImageModalOpen,
        editingHallForImage,
        openChangeImageModal,
        closeChangeImageModal,
        updateHallImage,
        isUploadEventModalOpen,
        openUploadEventModal,
        closeUploadEventModal,
        addEvent,
        alertBanner,
        dismissAlertBanner,
        createBookingRequest,
        acceptBooking,
        rejectBooking,
        cancelBooking,
        addExternalFacultyArrangement,
        updateExternalFacultyStatus,
        updateHall,
        updateCoordinator,
        toggleUserStatus,
        updateUserRole,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
