import React, { useState } from 'react'
import { format } from 'date-fns'
import { lessons } from '../data/mockData'
import ScheduleCalendar from '../components/ScheduleCalendar'
import LessonCreator from '../components/scheduling/LessonCreator'

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewType, setViewType] = useState('day')
  const [showQuickAdd, setShowQuickAdd] = useState(false)
  const [selectedBranch, setSelectedBranch] = useState('all')
  const [showTeacherSchedule, setShowTeacherSchedule] = useState(false)
  const [showRoomAvailability, setShowRoomAvailability] = useState(false)
  const [showLessonDetails, setShowLessonDetails] = useState(false)
  const [selectedLesson, setSelectedLesson] = useState(null)

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson)
    setShowLessonDetails(true)
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
        <div className="flex space-x-4">
          <select 
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={viewType}
            onChange={(e) => setViewType(e.target.value)}
          >
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
          <input
            type="date"
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={format(selectedDate, 'yyyy-MM-dd')}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
          />
          <button 
            className="btn btn-primary"
            onClick={() => setShowQuickAdd(true)}
          >
            + New Lesson
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="card">
        {/* Filters and Actions */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
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
            <select 
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="all">All Lesson Types</option>
              <option value="group">Group Lessons</option>
              <option value="private">Private Lessons</option>
              <option value="trial">Trial Classes</option>
              <option value="ondemand">On-Demand Groups</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button 
              className="btn bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
              onClick={() => setShowRoomAvailability(true)}
            >
              View Rooms
            </button>
            <button 
              className="btn bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
              onClick={() => setShowTeacherSchedule(true)}
            >
              Teacher Schedules
            </button>
          </div>
        </div>

        {/* Calendar View */}
        <ScheduleCalendar 
          viewType={viewType}
          selectedDate={selectedDate}
          onLessonClick={handleLessonClick}
        />
      </div>

      {/* Modals */}
      {showQuickAdd && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Create New Lesson</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowQuickAdd(false)}
              >
                ×
              </button>
            </div>
            <LessonCreator onClose={() => setShowQuickAdd(false)} />
          </div>
        </div>
      )}

      {/* Other modals remain the same */}
    </div>
  )
}
