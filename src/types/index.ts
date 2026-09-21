export type Role = 'ADMIN' | 'COORDINATOR' | 'FACULTY' | 'STAFF' | 'STUDENT';

export type BookingStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';

export type EventType = 
  | 'Technical Symposium'
  | 'National Seminar'
  | 'Workshop'
  | 'Faculty Development Program'
  | 'Guest Lecture'
  | 'Cultural Event'
  | 'Placement Drive'
  | 'Conference'
  | 'Lab Examination'
  | 'Alumni Meet'
  | 'Blood Donation Camp / Social Drive'
  | 'Other';

export interface User {
  id: string;
  name: string;
  employee_id: string;
  department: string;
  designation: string;
  email: string;
  phone: string;
  role: Role;
  assignedBlock?: 'Block-2' | 'Block-3' | 'Block-4';
  isActive: boolean;
}

export interface Coordinator {
  id: string;
  name: string;
  block: 'Block-2' | 'Block-3' | 'Block-4';
  email: string;
  phone: string;
  department: string;
  designation: string;
}

export interface SeminarHall {
  id: string;
  block: 'Block-2' | 'Block-3' | 'Block-4';
  hall_name: string;
  coordinator_id: string;
  capacity: number;
  location: string;
  facilities: string[];
  image: string;
  status: 'Available' | 'Booked' | 'Maintenance';
}

export interface Booking {
  id: string;
  requester_id: string;
  requester_name: string;
  requester_role: Role;
  hall_id: string;
  hall_name: string;
  block: 'Block-2' | 'Block-3' | 'Block-4';
  event_name: string;
  event_type: EventType;
  department: string;
  organizer_name: string;
  contact_number: string;
  expected_participants: number;
  number_of_guests: number;
  date: string; // YYYY-MM-DD
  start_time: string; // e.g. "09:00 AM"
  end_time: string; // e.g. "11:00 AM"
  requirements: string[];
  remarks?: string;
  status: BookingStatus;
  approved_by?: string;
  coordinator_remarks?: string;
  created_at: string;
}

export interface EventItem {
  id: string;
  booking_id?: string;
  event_name: string;
  department: string;
  date: string;
  start_time: string;
  end_time: string;
  hall_id: string;
  hall_name: string;
  block: 'Block-2' | 'Block-3' | 'Block-4';
  organizer: string;
  description: string;
  status: 'Upcoming' | 'Today' | 'Completed';
  category: EventType;
  image?: string;
  audience?: number;
}

export interface TravelArrangement {
  travel_required: boolean;
  travel_mode: 'Flight' | 'Train' | 'Bus' | 'College Vehicle' | 'Personal Vehicle';
  travelling_charges: number;
  pickup_required: boolean;
  pickup_location: string;
}

export interface FoodArrangement {
  tea: boolean;
  tea_qty: number;
  snacks: boolean;
  snacks_qty: number;
  breakfast: boolean;
  breakfast_qty: number;
  lunch: boolean;
  lunch_qty: number;
  dinner: boolean;
  dinner_qty: number;
  dietary_notes?: string;
}

export interface AccommodationArrangement {
  required: boolean;
  gender: 'Male' | 'Female';
  suggested_hostel: 'Boys Hostel' | 'Girls Hostel';
  rooms: number;
  persons: number;
  check_in: string;
  check_out: string;
  special_requirements?: string;
}

export interface ExternalFaculty {
  id: string;
  name: string;
  designation: string;
  institution: string;
  department: string;
  phone: string;
  email: string;
  purpose: string;
  subject_lab: string;
  visit_date: string;
  arrival_time: string;
  departure_time: string;
  travel: TravelArrangement;
  food: FoodArrangement;
  accommodation: AccommodationArrangement;
  status: 'Scheduled' | 'Completed' | 'Pending Approval';
  created_at: string;
}

export interface HostelDetails {
  id: string;
  name: 'Boys Hostel' | 'Girls Hostel';
  gender: 'Male' | 'Female';
  total_rooms: number;
  available_rooms: number;
  room_type: string;
  capacity_per_room: number;
  warden_name: string;
  warden_contact: string;
  location: string;
}

export interface NotificationItem {
  id: string;
  user_id: string; // or 'ALL' or 'COORDINATOR_BLOCK_X'
  title: string;
  message: string;
  type: 'BOOKING_REQUEST' | 'BOOKING_APPROVED' | 'BOOKING_REJECTED' | 'BOOKING_CANCELLED' | 'SLOT_CHANGED' | 'EXAMINER_ARRANGEMENT' | 'EVENT_ANNOUNCED' | 'HALL_IMAGE_UPDATED';
  is_read: boolean;
  created_at: string;
  link_tab?: string;
}

export interface CollegeConfig {
  collegeName: string;
  portalTitle: string;
  collegeLogoUrl: string | null;
  officialEmail: string;
  officialPhone: string;
  officialAddress: string;
  accreditation: string;
}
