import React, { useState } from 'react'
import { lessons, teachers, rooms } from '../data/mockData'
import ScheduleCalendar from '../components/ScheduleCalendar'
import LessonCreator from '../components/scheduling/LessonCreator'

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState('2023-08-21')
  const [scheduleView, setScheduleView] = useState('day')
  const [showLessonCreator, setShowLessonCreator] = useState(false)

  const handleCreateLesson = () => {
    setShowLessonCreator(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
        <div className="flex space-x-4">
          <select 
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={scheduleView}
            onChange={(e) => setScheduleView(e.target.value)}
          >
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
          <input
            type="date"
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <button 
            className="btn btn-primary"
            onClick={handleCreateLesson}
          >
            + New Lesson
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-3">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                  <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option>All Branches</option>
                    <option>Main Branch</option>
                    <option>Downtown Branch</option>
                  </select>
                  <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option>All Teachers</option>
                    {teachers.map(teacher => (
                      <option key={teacher.id}>{teacher.name}</option>
                    ))}
                  </select>
                  <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option>All Rooms</option>
                    {rooms.map(room => (
                      <option key={room.id}>{room.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex space-x-2">
                  <button className="btn bg-gray-100 text-gray-700 hover:bg-gray-200">
                    Today
                  </button>
                  <button className="btn bg-gray-100 text-gray-700 hover:bg-gray-200">
                    &lt;
                  </button>
                  <button className="btn bg-gray-100 text-gray-700 hover:bg-gray-200">
                    &gt;
                  </button>
                </div>
              </div>
            </div>
            <ScheduleCalendar 
              view={scheduleView}
              selectedDate={selectedDate}
              lessons={lessons}
            />
          </div>
        </div>

        <div className="space-y-6">
          {showLessonCreator ? (
            <LessonCreator onClose={() => setShowLessonCreator(false)} />
          ) : (
            <div className="space-y-4">
              <div className="card">
                <h3 className="text-lg font-medium mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <button 
                    className="btn btn-secondary w-full"
                    onClick={handleCreateLesson}
                  >
                    Schedule New Lesson
                  </button>
                  <button 
                    className="btn bg-gray-100 text-gray-700 hover:bg-gray-200 w-full"
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
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-medium mb-3">Today's Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Classes</span>
                    <span className="font-medium">{lessons.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Available Rooms</span>
                    <span className="font-medium">{rooms.filter(r => r.availability).length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Active Teachers</span>
                    <span className="font-medium">{teachers.length}</span>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-medium mb-3">Recent Changes</h3>
                <div className="space-y-2">
                  {[
                    { action: 'Room Change', lesson: 'Spanish A1', time: '5 mins ago' },
                    { action: 'Teacher Substitution', lesson: 'French B2', time: '15 mins ago' },
                    { action: 'New Booking', lesson: 'German A2', time: '30 mins ago' }
                  ].map((change, index) => (
                    <div 
                      key={index}
                      className="p-2 rounded hover:bg-gray-50 cursor-pointer"
                      onClick={() => alert(`Demo: Viewing details of ${change.action} for ${change.lesson}`)}
                    >
                      <div className="font-medium text-sm">{change.action}</div>
                      <div className="text-xs text-gray-500">{change.lesson} • {change.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
