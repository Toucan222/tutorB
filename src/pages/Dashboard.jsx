import React, { useState } from 'react'
import { lessons, teachers, rooms, packages } from '../data/mockData'
import StatsCard from '../components/StatsCard'
import LessonTable from '../components/LessonTable'
import AttendanceMarker from '../components/attendance/AttendanceMarker'

export default function Dashboard() {
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [showAttendance, setShowAttendance] = useState(false)
  const [selectedBranch, setSelectedBranch] = useState('all')
  const [showQuickAdd, setShowQuickAdd] = useState(false)
  const [showRoomAvailability, setShowRoomAvailability] = useState(false)
  const [showTeacherSchedules, setShowTeacherSchedules] = useState(false)
  const [showPackageManagement, setShowPackageManagement] = useState(false)
  const [showStudentRegistration, setShowStudentRegistration] = useState(false)
  const todayLessons = lessons
  
  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson)
    setShowAttendance(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex space-x-4">
          <button 
            className="btn btn-secondary"
            onClick={() => setShowQuickAdd(true)}
          >
            Quick Add Lesson
          </button>
          <button className="btn btn-primary">+ New Lesson</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          title="Today's Classes" 
          value={todayLessons.length} 
          color="blue"
          onClick={() => alert('Demo: View all today\'s classes')}
        />
        <StatsCard 
          title="Active Students" 
          value="24" 
          color="cyan"
          onClick={() => alert('Demo: View active students list')}
        />
        <StatsCard 
          title="Available Rooms" 
          value="6" 
          color="green"
          onClick={() => alert('Demo: View room availability')}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Today's Schedule</h2>
              <select 
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
              >
                <option value="all">All Branches</option>
                <option value="main">Main Branch</option>
                <option value="downtown">Downtown Branch</option>
                <option value="west">West Branch</option>
              </select>
            </div>
            <LessonTable 
              lessons={todayLessons} 
              onLessonClick={handleLessonClick}
              onStatusChange={(lesson, status) => alert(`Demo: Lesson ${lesson.id} status changed to ${status}`)}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button 
                className="btn btn-secondary w-full"
                onClick={() => setShowRoomAvailability(true)}
              >
                View Room Availability
              </button>
              <button 
                className="btn bg-gray-100 text-gray-700 hover:bg-gray-200 w-full"
                onClick={() => setShowTeacherSchedules(true)}
              >
                Teacher Schedules
              </button>
              <button 
                className="btn bg-gray-100 text-gray-700 hover:bg-gray-200 w-full"
                onClick={() => setShowPackageManagement(true)}
              >
                Manage Packages
              </button>
              <button 
                className="btn bg-gray-100 text-gray-700 hover:bg-gray-200 w-full"
                onClick={() => setShowStudentRegistration(true)}
              >
                New Student Registration
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Modal */}
      {showAttendance && selectedLesson && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Mark Attendance</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowAttendance(false)}
              >
                ×
              </button>
            </div>
            <AttendanceMarker lesson={selectedLesson} />
          </div>
        </div>
      )}

      {/* Room Availability Modal */}
      {showRoomAvailability && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Room Availability</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowRoomAvailability(false)}
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rooms.map(room => (
                  <div key={room.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{room.name}</h4>
                        <p className="text-sm text-gray-500">{room.branch}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        room.availability
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {room.availability ? 'Available' : 'In Use'}
                      </span>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">Capacity: {room.capacity} students</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {room.features.map((feature, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 rounded-full bg-gray-100 text-xs"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Teacher Schedules Modal */}
      {showTeacherSchedules && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Teacher Schedules</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowTeacherSchedules(false)}
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              {teachers.map(teacher => (
                <div key={teacher.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{teacher.name}</h4>
                      <p className="text-sm text-gray-500">{teacher.subjects.join(', ')}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      teacher.status === 'Full-time' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {teacher.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {Object.entries(teacher.availability).map(([day, slots]) => (
                      <div key={day} className="flex items-center">
                        <span className="w-24 text-sm font-medium capitalize">{day}:</span>
                        <div className="flex flex-wrap gap-2">
                          {slots.map((slot, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 bg-blue-50 rounded text-sm"
                            >
                              {slot}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Package Management Modal */}
      {showPackageManagement && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Package Management</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowPackageManagement(false)}
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {packages.map(pkg => (
                <div key={pkg.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{pkg.name}</h4>
                      <p className="text-sm text-gray-500">{pkg.type}</p>
                    </div>
                    <span className="text-lg font-bold text-blue-600">
                      ${pkg.price}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Sessions:</span>
                      <span className="font-medium">{pkg.sessions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Validity:</span>
                      <span className="font-medium">{pkg.validity}</span>
                    </div>
                  </div>
                  <button 
                    className="mt-4 btn btn-primary w-full"
                    onClick={() => alert('Demo: Package purchase flow would start here')}
                  >
                    Purchase Package
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Student Registration Modal */}
      {showStudentRegistration && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">New Student Registration</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowStudentRegistration(false)}
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Student Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter student name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Course
                </label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Level
                </label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>A1</option>
                  <option>A2</option>
                  <option>B1</option>
                  <option>B2</option>
                  <option>C1</option>
                  <option>C2</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Family Information
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter family name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact Email
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter phone number"
                />
              </div>
              <button 
                className="btn btn-primary w-full"
                onClick={() => {
                  alert('Demo: Student registration successful!')
                  setShowStudentRegistration(false)
                }}
              >
                Register Student
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Add Lesson Modal */}
      {showQuickAdd && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Quick Add Lesson</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowQuickAdd(false)}
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Lesson Type</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>Group Class</option>
                  <option>Private Lesson</option>
                  <option>Trial Class</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Subject & Level</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>Spanish A1</option>
                  <option>Spanish A2</option>
                  <option>French B1</option>
                  <option>French B2</option>
                  <option>German A1</option>
                  <option>German B1</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Time Slot</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>Today - 14:00</option>
                  <option>Today - 15:00</option>
                  <option>Today - 16:00</option>
                  <option>Tomorrow - 09:00</option>
                  <option>Tomorrow - 10:00</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Room</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>Room 1.1 - Main Branch</option>
                  <option>Room 1.2 - Main Branch</option>
                  <option>Room 2.1 - Downtown Branch</option>
                  <option>Room 3.1 - West Branch</option>
                </select>
              </div>
              <button 
                className="btn btn-primary w-full"
                onClick={() => {
                  alert('Demo: Lesson added successfully!')
                  setShowQuickAdd(false)
                }}
              >
                Add Lesson
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
