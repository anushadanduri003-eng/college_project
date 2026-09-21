import {
  Coordinator,
  SeminarHall,
  User,
  Booking,
  EventItem,
  ExternalFaculty,
  HostelDetails,
  NotificationItem,
  CollegeConfig
} from '../types';

export const INITIAL_CONFIG: CollegeConfig = {
  collegeName: 'Narasaraopeta Engineering College',
  portalTitle: 'Seminar Hall & Event Coordination Portal',
  collegeLogoUrl: null, // Empty placeholder for user upload
  officialEmail: 'info@nrtec.ac.in (Placeholder)',
  officialPhone: '+91 8647 239904 / 239905 (Placeholder)',
  officialAddress: 'Kotappakonda Road, Yellamanda, Narasaraopet, Palnadu Dist., Andhra Pradesh 522601 (Placeholder)',
  accreditation: 'Autonomous Institution | Approved by AICTE, New Delhi | Accredited by NBA & NAAC with A+ Grade'
};

export const INITIAL_COORDINATORS: Coordinator[] = [
  {
    id: 'coord-b2',
    name: 'Tirumala Rao',
    block: 'Block-2',
    email: 'tirumalarao@nec.edu.in',
    phone: '+91 98480 12345',
    department: 'Mechanical & Civil Engineering',
    designation: 'Assistant Professor & Block-2 Incharge'
  },
  {
    id: 'coord-b3',
    name: 'Venkat Rao',
    block: 'Block-3',
    email: 'venkatrao@nec.edu.in',
    phone: '+91 98480 23456',
    department: 'Electronics & Communication Engg.',
    designation: 'Associate Professor & Block-3 Incharge'
  },
  {
    id: 'coord-b4',
    name: 'Suneel Sir',
    block: 'Block-4',
    email: 'suneelsir@nec.edu.in',
    phone: '+91 98480 34567',
    department: 'Computer Science & Engineering',
    designation: 'Senior Faculty & Central Block-4 Incharge'
  }
];

export const INITIAL_HALLS: SeminarHall[] = [
  {
    id: 'hall-b2',
    block: 'Block-2',
    hall_name: 'Block-2 Seminar Hall',
    coordinator_id: 'coord-b2',
    capacity: 180,
    location: 'Ground Floor, Block-2 (Academic Wing)',
    facilities: [
      'High-Definition Projector',
      'Dual Wireless Microphones',
      'Centralized Air Conditioning',
      'Audio PA System',
      'Dedicated Stage & Podium',
      'High-Speed Wi-Fi'
    ],
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
    status: 'Available'
  },
  {
    id: 'hall-b3',
    block: 'Block-3',
    hall_name: 'Block-3 Seminar Hall',
    coordinator_id: 'coord-b3',
    capacity: 180,
    location: 'Ground Floor, Block-3 (Tech Tower)',
    facilities: [
      'Dual Synchronized Projectors',
      'Conference Audio Setup',
      'Split Air Conditioning Units',
      'Podium with Touch Interface',
      'Fiber Broadband Wi-Fi',
      'Stepped Auditorium Seating'
    ],
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
    status: 'Available'
  },
  {
    id: 'hall-b4',
    block: 'Block-4',
    hall_name: 'Block-4 Seminar Hall',
    coordinator_id: 'coord-b4',
    capacity: 180,
    location: 'Ground Floor, Block-4 (Central Block)',
    facilities: [
      'Ultra HD LED Video Wall Display',
      'Acoustic Wall Treatment',
      'Centralized Dual Chiller AC',
      'Surround Sound Audio System',
      'Live Webcast & Recording Suite',
      'VIP Front-Row Recliners'
    ],
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    status: 'Available'
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-fac-1',
    name: 'Venkat',
    employee_id: 'EMP-FAC-101',
    department: 'Computer Science & Engineering',
    designation: 'Faculty & Associate Professor',
    email: 'venkat.faculty@nec.edu.in',
    phone: '+91 94400 11223',
    role: 'FACULTY',
    isActive: true
  },
  {
    id: 'usr-fac-2',
    name: 'Sireesha',
    employee_id: 'EMP-FAC-102',
    department: 'Electronics & Communication Engg.',
    designation: 'Faculty & Assistant Professor',
    email: 'sireesha.faculty@nec.edu.in',
    phone: '+91 97000 44556',
    role: 'FACULTY',
    isActive: true
  },
  {
    id: 'usr-fac-3',
    name: 'Ramakrishna',
    employee_id: 'EMP-FAC-103',
    department: 'Mechanical Engineering',
    designation: 'Faculty & Assistant Professor',
    email: 'ramakrishna.faculty@nec.edu.in',
    phone: '+91 94900 33445',
    role: 'FACULTY',
    isActive: true
  },
  {
    id: 'usr-b4-coord',
    name: 'Suneel Sir',
    employee_id: 'EMP-CSE-104',
    department: 'Computer Science & Engineering',
    designation: 'Senior Faculty & Coordinator',
    email: 'suneelsir@nec.edu.in',
    phone: '+91 98480 34567',
    role: 'COORDINATOR',
    assignedBlock: 'Block-4',
    isActive: true
  },
  {
    id: 'usr-b3-coord',
    name: 'Venkat Rao',
    employee_id: 'EMP-ECE-103',
    department: 'Electronics & Communication Engg.',
    designation: 'Associate Professor & Coordinator',
    email: 'venkatrao@nec.edu.in',
    phone: '+91 98480 23456',
    role: 'COORDINATOR',
    assignedBlock: 'Block-3',
    isActive: true
  },
  {
    id: 'usr-b2-coord',
    name: 'Tirumala Rao',
    employee_id: 'EMP-MEC-102',
    department: 'Mechanical Engineering',
    designation: 'Assistant Professor & Coordinator',
    email: 'tirumalarao@nec.edu.in',
    phone: '+91 98480 12345',
    role: 'COORDINATOR',
    assignedBlock: 'Block-2',
    isActive: true
  },
  {
    id: 'usr-stu-1',
    name: 'A. Rajesh Kumar',
    employee_id: '22711A0501',
    department: 'Computer Science & Engineering',
    designation: 'Student Council President',
    email: 'rajesh.22cse@nec.edu.in',
    phone: '+91 91234 56789',
    role: 'STUDENT',
    isActive: true
  }
];

// Today is 2026-09-20 according to context. We will provide dates around Sept 20-26, 2026.
export const INITIAL_BOOKINGS: Booking[] = [
  // Block-3 request: User sends request to Block-3 so Venkat Rao can Accept or Decline with instant notification to requester
  {
    id: 'bk-b3-pending-01',
    requester_id: 'usr-fac-1',
    requester_name: 'Venkat',
    requester_role: 'FACULTY',
    hall_id: 'hall-b3',
    hall_name: 'Block-3 Seminar Hall',
    block: 'Block-3',
    event_name: 'VLSI Design & Embedded Systems Workshop',
    event_type: 'Workshop',
    department: 'Computer Science & Engineering',
    organizer_name: 'Venkat',
    contact_number: '+91 94400 11223',
    expected_participants: 160,
    number_of_guests: 3,
    date: '2026-09-24',
    start_time: '10:00 AM',
    end_time: '01:00 PM',
    requirements: ['Projector', 'Microphone', 'Speakers', 'Internet', 'AC', 'Podium'],
    remarks: 'Requesting Block-3 Ground Floor Seminar Hall for hands-on demonstration kit setup. Awaiting coordinator approval.',
    status: 'PENDING',
    created_at: '2026-09-20 08:45 AM'
  },
  // Inter-department request from requirement 9:
  // Venkat Rao (Block-3 Coordinator) requesting Block-4 from Suneel Sir
  {
    id: 'bk-inter-01',
    requester_id: 'usr-b3-coord',
    requester_name: 'Venkat Rao',
    requester_role: 'COORDINATOR',
    hall_id: 'hall-b4',
    hall_name: 'Block-4 Seminar Hall',
    block: 'Block-4',
    event_name: 'Inter-Department AIoT National Workshop & Hackathon',
    event_type: 'National Seminar',
    department: 'ECE & CSE Joint Initiative',
    organizer_name: 'Venkat Rao (Block-3 Coordinator)',
    contact_number: '+91 98480 23456',
    expected_participants: 400,
    number_of_guests: 6,
    date: '2026-09-25',
    start_time: '09:00 AM',
    end_time: '01:00 PM',
    requirements: ['Projector', 'Microphone', 'Speakers', 'Internet', 'AC', 'Chairs'],
    remarks: 'Mega event with keynote from DRDO scientist. Block-3 is smaller for expected 400 registrations, therefore requesting Block-4 Seminar Hall.',
    status: 'PENDING',
    created_at: '2026-09-20 09:30 AM'
  },
  {
    id: 'bk-today-01',
    requester_id: 'usr-fac-1',
    requester_name: 'Venkat',
    requester_role: 'FACULTY',
    hall_id: 'hall-b2',
    hall_name: 'Block-2 Seminar Hall',
    block: 'Block-2',
    event_name: 'Industry Orientation on Full-Stack Cloud Architecture',
    event_type: 'Guest Lecture',
    department: 'Computer Science & Engineering',
    organizer_name: 'Venkat',
    contact_number: '+91 94400 11223',
    expected_participants: 180,
    number_of_guests: 2,
    date: '2026-09-20',
    start_time: '11:00 AM',
    end_time: '01:00 PM',
    requirements: ['Projector', 'Microphone', 'Speakers', 'AC'],
    remarks: 'Guest Speaker from Wipro Technologies.',
    status: 'APPROVED',
    approved_by: 'Tirumala Rao',
    created_at: '2026-09-18 02:15 PM'
  },
  {
    id: 'bk-today-02',
    requester_id: 'usr-fac-2',
    requester_name: 'Sireesha',
    requester_role: 'FACULTY',
    hall_id: 'hall-b4',
    hall_name: 'Block-4 Seminar Hall',
    block: 'Block-4',
    event_name: 'IEEE Student Branch Technical Paper Presentation',
    event_type: 'Technical Symposium',
    department: 'Electronics & Communication Engg.',
    organizer_name: 'Sireesha',
    contact_number: '+91 97000 44556',
    expected_participants: 320,
    number_of_guests: 4,
    date: '2026-09-20',
    start_time: '02:00 PM',
    end_time: '04:00 PM',
    requirements: ['Projector', 'Microphone', 'Speakers', 'Tables', 'Internet', 'AC'],
    remarks: 'State-level students presenting capstone projects.',
    status: 'APPROVED',
    approved_by: 'Suneel Sir',
    created_at: '2026-09-17 11:00 AM'
  },
  {
    id: 'bk-future-01',
    requester_id: 'usr-fac-3',
    requester_name: 'Ramakrishna',
    requester_role: 'FACULTY',
    hall_id: 'hall-b3',
    hall_name: 'Block-3 Seminar Hall',
    block: 'Block-3',
    event_name: 'Faculty Development Program on Cyber Security & Forensics',
    event_type: 'Faculty Development Program',
    department: 'Mechanical Engineering',
    organizer_name: 'Ramakrishna',
    contact_number: '+91 94900 33445',
    expected_participants: 120,
    number_of_guests: 3,
    date: '2026-09-22',
    start_time: '09:00 AM',
    end_time: '01:00 PM',
    requirements: ['Projector', 'Microphone', 'Speakers', 'Internet', 'AC'],
    remarks: 'AICTE sponsored one-week FDP inauguration.',
    status: 'APPROVED',
    approved_by: 'Venkat Rao',
    created_at: '2026-09-16 10:00 AM'
  },
  {
    id: 'bk-future-02',
    requester_id: 'usr-stu-1',
    requester_name: 'A. Rajesh Kumar',
    requester_role: 'STUDENT',
    hall_id: 'hall-b2',
    hall_name: 'Block-2 Seminar Hall',
    block: 'Block-2',
    event_name: 'Freshers Talent Showcase & Club Induction',
    event_type: 'Cultural Event',
    department: 'Student Affairs',
    organizer_name: 'A. Rajesh Kumar',
    contact_number: '+91 91234 56789',
    expected_participants: 220,
    number_of_guests: 2,
    date: '2026-09-23',
    start_time: '02:00 PM',
    end_time: '05:00 PM',
    requirements: ['Microphone', 'Speakers', 'Chairs', 'Tables'],
    remarks: 'Annual cultural club induction.',
    status: 'APPROVED',
    approved_by: 'Tirumala Rao',
    created_at: '2026-09-17 04:00 PM'
  }
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'evt-blood-camp-b4',
    event_name: 'Mega Blood Donation Camp 2026',
    department: 'NSS Unit & Youth Red Cross',
    date: '2026-09-21',
    start_time: '09:00 AM',
    end_time: '04:00 PM',
    hall_id: 'hall-b4',
    hall_name: 'Block-4 Seminar Hall',
    block: 'Block-4',
    organizer: 'Prof. P. Ramesh (NSS Officer)',
    description: 'Mega Blood Donation Camp will be held in Block-4 Ground Floor Seminar Hall. Donors will receive donor badges, medical checkups, and refreshments.',
    status: 'Upcoming',
    category: 'Blood Donation Camp / Social Drive',
    audience: 180,
    image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'evt-01',
    booking_id: 'bk-today-01',
    event_name: 'Industry Orientation on Full-Stack Cloud Architecture',
    department: 'Computer Science & Engineering',
    date: '2026-09-20',
    start_time: '11:00 AM',
    end_time: '01:00 PM',
    hall_id: 'hall-b2',
    hall_name: 'Block-2 Seminar Hall',
    block: 'Block-2',
    organizer: 'Venkat',
    description: 'Special technical session for 3rd and 4th year students by Cloud Architects from Wipro Technologies.',
    status: 'Today',
    category: 'Guest Lecture'
  },
  {
    id: 'evt-02',
    booking_id: 'bk-today-02',
    event_name: 'IEEE Student Branch Technical Paper Presentation',
    department: 'Electronics & Communication Engg.',
    date: '2026-09-20',
    start_time: '02:00 PM',
    end_time: '04:00 PM',
    hall_id: 'hall-b4',
    hall_name: 'Block-4 Seminar Hall',
    block: 'Block-4',
    organizer: 'Sireesha',
    description: 'Annual technical research exhibition where undergraduate scholars present papers judged by external university faculty.',
    status: 'Today',
    category: 'Technical Symposium'
  },
  {
    id: 'evt-03',
    booking_id: 'bk-future-01',
    event_name: 'Faculty Development Program on Cyber Security & Forensics',
    department: 'Mechanical Engineering',
    date: '2026-09-22',
    start_time: '09:00 AM',
    end_time: '01:00 PM',
    hall_id: 'hall-b3',
    hall_name: 'Block-3 Seminar Hall',
    block: 'Block-3',
    organizer: 'Ramakrishna',
    description: 'AICTE-guided Faculty Development Program focusing on ethical hacking, memory analysis, and network defense.',
    status: 'Upcoming',
    category: 'Faculty Development Program'
  },
  {
    id: 'evt-04',
    booking_id: 'bk-future-02',
    event_name: 'Freshers Talent Showcase & Club Induction',
    department: 'Student Affairs',
    date: '2026-09-23',
    start_time: '02:00 PM',
    end_time: '05:00 PM',
    hall_id: 'hall-b2',
    hall_name: 'Block-2 Seminar Hall',
    block: 'Block-2',
    organizer: 'Student Council (A. Rajesh Kumar)',
    description: 'Campus talent quest showcasing music, robotics club demos, and student extracurricular presentations.',
    status: 'Upcoming',
    category: 'Cultural Event'
  },
  {
    id: 'evt-05',
    event_name: 'National Conference on Green Energy Technologies',
    department: 'Electrical & Mechanical Engg.',
    date: '2026-09-28',
    start_time: '09:30 AM',
    end_time: '04:30 PM',
    hall_id: 'hall-b4',
    hall_name: 'Block-4 Seminar Hall',
    block: 'Block-4',
    organizer: 'Dr. M. Chaitanya',
    description: 'Inter-collegiate scientific conference on solar micro-grids, EV powertrain efficiency, and thermal dynamics.',
    status: 'Upcoming',
    category: 'Conference'
  }
];

export const INITIAL_EXTERNAL_FACULTY: ExternalFaculty[] = [
  {
    id: 'ext-01',
    name: 'Dr. Ramesh Babu N.',
    designation: 'Professor & Senior Lab Evaluator',
    institution: 'JNTU College of Engineering, Kakinada',
    department: 'Computer Science & Engineering',
    phone: '+91 98481 99887',
    email: 'rameshbabu.jntuk@gmail.com',
    purpose: 'External Lab Examiner for B.Tech IV Year Distributed Systems Lab',
    subject_lab: 'Distributed Systems & Cloud Computing Lab (R20 Regulations)',
    visit_date: '2026-09-24',
    arrival_time: '08:30 AM',
    departure_time: '05:00 PM',
    travel: {
      travel_required: true,
      travel_mode: 'Train',
      travelling_charges: 1850,
      pickup_required: true,
      pickup_location: 'Guntur Junction Railway Station (Platform 1)'
    },
    food: {
      tea: true,
      tea_qty: 2,
      snacks: true,
      snacks_qty: 2,
      breakfast: true,
      breakfast_qty: 1,
      lunch: true,
      lunch_qty: 1,
      dinner: false,
      dinner_qty: 0,
      dietary_notes: 'Vegetarian meals, low sugar coffee/tea.'
    },
    accommodation: {
      required: true,
      gender: 'Male',
      suggested_hostel: 'Boys Hostel',
      rooms: 1,
      persons: 1,
      check_in: '2026-09-23 07:00 PM',
      check_out: '2026-09-24 06:00 PM',
      special_requirements: 'Quiet room with study desk and AC.'
    },
    status: 'Scheduled',
    created_at: '2026-09-18 11:20 AM'
  },
  {
    id: 'ext-02',
    name: 'Dr. Ananya Sundaram',
    designation: 'Associate Professor',
    institution: 'NIT Andhra Pradesh, Tadepalligudem',
    department: 'Electronics & Communication Engg.',
    phone: '+91 94411 77665',
    email: 'ananya.sundaram@nitandhra.ac.in',
    purpose: 'External Lab Examiner for VLSI Design & Simulation Lab',
    subject_lab: 'Cadence VLSI Lab & FPGA Verification',
    visit_date: '2026-09-26',
    arrival_time: '09:00 AM',
    departure_time: '05:30 PM',
    travel: {
      travel_required: true,
      travel_mode: 'College Vehicle',
      travelling_charges: 0,
      pickup_required: true,
      pickup_location: 'Vijayawada Airport (Gannavaram)'
    },
    food: {
      tea: true,
      tea_qty: 2,
      snacks: true,
      snacks_qty: 2,
      breakfast: true,
      breakfast_qty: 1,
      lunch: true,
      lunch_qty: 1,
      dinner: true,
      dinner_qty: 1,
      dietary_notes: 'South Indian vegetarian food.'
    },
    accommodation: {
      required: true,
      gender: 'Female',
      suggested_hostel: 'Girls Hostel',
      rooms: 1,
      persons: 1,
      check_in: '2026-09-25 08:00 PM',
      check_out: '2026-09-26 07:00 PM',
      special_requirements: 'Guest suite in Girls Hostel with Wi-Fi.'
    },
    status: 'Scheduled',
    created_at: '2026-09-19 03:40 PM'
  }
];

export const INITIAL_HOSTELS: HostelDetails[] = [
  {
    id: 'hostel-boys',
    name: 'Boys Hostel',
    gender: 'Male',
    total_rooms: 12,
    available_rooms: 8,
    room_type: 'Executive Guest Suite (Air Conditioned)',
    capacity_per_room: 2,
    warden_name: 'Sri K. Srinivasa Rao',
    warden_contact: '+91 98490 55667',
    location: 'North Campus, Beside Sports Complex'
  },
  {
    id: 'hostel-girls',
    name: 'Girls Hostel',
    gender: 'Female',
    total_rooms: 10,
    available_rooms: 6,
    room_type: 'VIP Guest Suite (Air Conditioned with Balcony)',
    capacity_per_room: 2,
    warden_name: 'Smt. M. Madhavi Latha',
    warden_contact: '+91 98490 66778',
    location: 'South Campus, Near Central Library'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-01',
    user_id: 'usr-b4-coord',
    title: 'New Inter-Department Booking Request',
    message: 'Venkat Rao has requested Block-4 Seminar Hall for "Inter-Department AIoT National Workshop" on 25 September 2026.',
    type: 'BOOKING_REQUEST',
    is_read: false,
    created_at: '2026-09-20 09:30 AM',
    link_tab: 'coordinator'
  },
  {
    id: 'notif-02',
    user_id: 'usr-fac-1',
    title: 'Booking Request Approved',
    message: 'Your request for Block-2 Seminar Hall on 20 September 2026 has been approved by Tirumala Rao.',
    type: 'BOOKING_APPROVED',
    is_read: true,
    created_at: '2026-09-18 03:00 PM',
    link_tab: 'dashboard'
  },
  {
    id: 'notif-03',
    user_id: 'usr-fac-2',
    title: 'Booking Request Approved',
    message: 'Your request for Block-4 Seminar Hall on 20 September 2026 has been approved by Suneel Sir.',
    type: 'BOOKING_APPROVED',
    is_read: true,
    created_at: '2026-09-17 12:30 PM',
    link_tab: 'dashboard'
  },
  {
    id: 'notif-04',
    user_id: 'ALL',
    title: 'External Faculty Examiner Scheduled',
    message: 'Dr. Ramesh Babu N. (JNTUK) scheduled as External Examiner for Distributed Systems Lab on 24 Sep 2026.',
    type: 'EXAMINER_ARRANGEMENT',
    is_read: false,
    created_at: '2026-09-18 11:30 AM',
    link_tab: 'examiner'
  }
];
