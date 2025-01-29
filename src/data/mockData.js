// Enhanced mock data to support all features
export const students = [
  { 
    id: 1, 
    name: 'Emma Wilson', 
    level: 'A1', 
    course: 'Spanish', 
    status: 'Active',
    family: 'Wilson Family',
    familyId: 1,
    package: {
      purchased: 10,
      scheduled: 4,
      used: 3,
      remaining: 6
    },
    billing: {
      method: 'Monthly',
      status: 'Current'
    }
  },
  { 
    id: 2, 
    name: 'James Chen', 
    level: 'B2', 
    course: 'French', 
    status: 'Active',
    family: 'Chen Family',
    familyId: 2,
    package: {
      purchased: 20,
      scheduled: 8,
      used: 6,
      remaining: 14
    },
    billing: {
      method: 'Annual',
      status: 'Current'
    }
  },
  { 
    id: 3, 
    name: 'Sofia Rodriguez', 
    level: 'C1', 
    course: 'German', 
    status: 'Trial',
    family: 'Rodriguez Family',
    familyId: 3,
    package: {
      purchased: 1,
      scheduled: 1,
      used: 0,
      remaining: 1
    },
    billing: {
      method: 'Trial',
      status: 'Pending'
    }
  },
  { 
    id: 4, 
    name: 'Lucas Wilson', 
    level: 'A2', 
    course: 'Spanish', 
    status: 'Active',
    family: 'Wilson Family',
    familyId: 1,
    package: {
      purchased: 10,
      scheduled: 5,
      used: 4,
      remaining: 6
    },
    billing: {
      method: 'Monthly',
      status: 'Current'
    }
  },
  { 
    id: 5, 
    name: 'Mia Zhang', 
    level: 'B1', 
    course: 'French', 
    status: 'Active',
    family: 'Zhang Family',
    familyId: 4,
    package: {
      purchased: 15,
      scheduled: 7,
      used: 5,
      remaining: 10
    },
    billing: {
      method: 'Quarterly',
      status: 'Current'
    }
  }
]

export const teachers = [
  { 
    id: 1, 
    name: 'Dr. Sarah Miller', 
    subjects: ['Spanish', 'French'], 
    status: 'Full-time',
    availability: {
      monday: ['09:00-12:00', '14:00-17:00'],
      tuesday: ['09:00-12:00', '14:00-17:00'],
      wednesday: ['09:00-12:00', '14:00-17:00'],
      thursday: ['09:00-12:00', '14:00-17:00'],
      friday: ['09:00-12:00', '14:00-17:00']
    },
    wage: {
      base: 30,
      premium: 35,
      currency: 'USD'
    }
  },
  { 
    id: 2, 
    name: 'Prof. John Davis', 
    subjects: ['German', 'French'], 
    status: 'Part-time',
    availability: {
      monday: ['14:00-18:00'],
      wednesday: ['14:00-18:00'],
      friday: ['14:00-18:00']
    },
    wage: {
      base: 28,
      premium: 32,
      currency: 'USD'
    }
  },
  { 
    id: 3, 
    name: 'Maria Garcia', 
    subjects: ['Spanish'], 
    status: 'Full-time',
    availability: {
      monday: ['10:00-13:00', '15:00-18:00'],
      tuesday: ['10:00-13:00', '15:00-18:00'],
      thursday: ['10:00-13:00', '15:00-18:00'],
      friday: ['10:00-13:00', '15:00-18:00']
    },
    wage: {
      base: 32,
      premium: 38,
      currency: 'USD'
    }
  },
  { 
    id: 4, 
    name: 'Dr. Hans Weber', 
    subjects: ['German'], 
    status: 'Full-time',
    availability: {
      monday: ['09:00-17:00'],
      tuesday: ['09:00-17:00'],
      wednesday: ['09:00-17:00'],
      thursday: ['09:00-17:00']
    },
    wage: {
      base: 35,
      premium: 40,
      currency: 'USD'
    }
  },
  { 
    id: 5, 
    name: 'Sophie Laurent', 
    subjects: ['French'], 
    status: 'Part-time',
    availability: {
      tuesday: ['14:00-18:00'],
      thursday: ['14:00-18:00'],
      saturday: ['10:00-15:00']
    },
    wage: {
      base: 29,
      premium: 34,
      currency: 'USD'
    }
  }
]

export const rooms = [
  { 
    id: 1, 
    name: 'Room 1.1', 
    capacity: 6, 
    branch: 'Main Branch',
    availability: true,
    features: ['Whiteboard', 'Projector'],
    currentClass: null
  },
  { 
    id: 2, 
    name: 'Room 1.2', 
    capacity: 8, 
    branch: 'Main Branch',
    availability: true,
    features: ['Whiteboard', 'Projector', 'Computer'],
    currentClass: null
  },
  { 
    id: 3, 
    name: 'Room 2.1', 
    capacity: 4, 
    branch: 'Downtown Branch',
    availability: false,
    features: ['Whiteboard'],
    currentClass: 'French B2'
  },
  { 
    id: 4, 
    name: 'Room 2.2', 
    capacity: 10, 
    branch: 'Downtown Branch',
    availability: true,
    features: ['Whiteboard', 'Projector', 'Computer', 'Air Conditioning'],
    currentClass: null
  },
  { 
    id: 5, 
    name: 'Room 3.1', 
    capacity: 6, 
    branch: 'West Branch',
    availability: true,
    features: ['Whiteboard', 'Air Conditioning'],
    currentClass: null
  },
  { 
    id: 6, 
    name: 'Room 3.2', 
    capacity: 12, 
    branch: 'West Branch',
    availability: false,
    features: ['Whiteboard', 'Projector', 'Computer', 'Air Conditioning'],
    currentClass: 'Spanish A1'
  }
]

export const lessons = [
  {
    id: 1,
    subject: 'Spanish',
    level: 'A1',
    teacher: 'Dr. Sarah Miller',
    room: 'Room 1.1',
    time: '09:00',
    date: '2023-08-21',
    students: ['Emma Wilson', 'James Chen'],
    type: 'Group',
    status: 'Scheduled',
    capacity: {
      max: 6,
      current: 2
    },
    package: {
      type: 'Fixed',
      totalSessions: 10,
      currentSession: 3
    }
  },
  {
    id: 2,
    subject: 'French',
    level: 'B2',
    teacher: 'Prof. John Davis',
    room: 'Room 2.1',
    time: '14:00',
    date: '2023-08-21',
    students: ['Mia Zhang'],
    type: 'Private',
    status: 'In Progress',
    capacity: {
      max: 1,
      current: 1
    },
    package: {
      type: 'Flexible',
      totalSessions: 20,
      currentSession: 8
    }
  },
  {
    id: 3,
    subject: 'German',
    level: 'A2',
    teacher: 'Dr. Hans Weber',
    room: 'Room 3.2',
    time: '16:00',
    date: '2023-08-21',
    students: ['Sofia Rodriguez', 'Lucas Wilson', 'James Chen'],
    type: 'Group',
    status: 'Scheduled',
    capacity: {
      max: 6,
      current: 3
    },
    package: {
      type: 'Fixed',
      totalSessions: 15,
      currentSession: 5
    }
  }
]

export const families = [
  {
    id: 1,
    name: 'Wilson Family',
    students: [1, 4], // student IDs
    billing: {
      status: 'Active',
      method: 'Credit Card',
      balance: 500
    },
    contact: {
      email: 'wilson@example.com',
      phone: '+1234567890'
    }
  },
  {
    id: 2,
    name: 'Chen Family',
    students: [2],
    billing: {
      status: 'Active',
      method: 'Bank Transfer',
      balance: 800
    },
    contact: {
      email: 'chen@example.com',
      phone: '+1234567891'
    }
  },
  {
    id: 3,
    name: 'Rodriguez Family',
    students: [3],
    billing: {
      status: 'Trial',
      method: 'Pending',
      balance: 0
    },
    contact: {
      email: 'rodriguez@example.com',
      phone: '+1234567892'
    }
  }
]

export const packages = [
  {
    id: 1,
    name: '10 Lessons Pack',
    type: 'Group Spanish A1',
    sessions: 10,
    validity: '3 months',
    price: 299,
    active: true
  },
  {
    id: 2,
    name: '20 Lessons Pack',
    type: 'Private French B2',
    sessions: 20,
    validity: '6 months',
    price: 899,
    active: true
  },
  {
    id: 3,
    name: 'Trial Package',
    type: 'Group German A2',
    sessions: 1,
    validity: '1 week',
    price: 0,
    active: true
  }
]
