import React, { useState } from 'react'
import { lessons } from '../data/mockData'
import StatsCard from '../components/StatsCard'
import LessonTable from '../components/LessonTable'
import AttendanceMarker from '../components/attendance/AttendanceMarker'

export default function Dashboard() {
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [showAttendance, setShowAttendance] = useState(false)
  const [selectedBranch, setSelectedBranch] = useState('all')
  const [showQuickAdd, setShowQuickAdd] = useState(false)
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
                onClick={() => alert('Demo: Opening room availability view')}
              >
                View Room Availability
              </button>
              <button 
                className="btn bg-gray-100 text-gray-700 hover:bg-gray-200 w-full"
                onClick={() => alert('Demo: Opening teacher schedules')}
              >
                Teacher Schedules
              </button>
              <button 
                className="btn bg-gray-100 text-gray-700 hover:bg-gray-200 w-full"
                onClick={() => alert('Demo: Opening package management')}
              >
                Manage Packages
              </button>
              <button 
                className="btn bg-gray-100 text-gray-700 hover:bg-gray-200 w-full"
                onClick={() => alert('Demo: Opening student registration')}
              >
                New Student Registration
              </button>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {[
                { action: 'New Student Registration', time: '10 mins ago', details: 'Emma Wilson - Spanish A1' },
                { action: 'Package Purchase', time: '25 mins ago', details: '10 Lessons Pack - Chen Family' },
                { action: 'Room Change Request', time: '1 hour ago', details: 'French B2 moved to Room 2.1' },
                { action: 'Teacher Substitution', time: '2 hours ago', details: 'German A2 - Dr. Weber' },
                { action: 'Lesson Completed', time: '3 hours ago', details: 'Spanish B1 - Room 1.1' }
              ].map((activity, index) => (
                <div 
                  key={index}
                  className="flex flex-col cursor-pointer hover:bg-gray-50 p-2 rounded"
                  onClick={() => alert(`Demo: Viewing details of ${activity.action}`)}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900">{activity.action}</span>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                  <span className="text-xs text-gray-600 mt-1">{activity.details}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold mb-4">Resource Usage</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Room Utilization</span>
                  <span className="font-medium">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Teacher Hours</span>
                  <span className="font-medium">82%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-cyan-600 h-2 rounded-full" style={{ width: '82%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Package Usage</span>
                  <span className="font-medium">60%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
