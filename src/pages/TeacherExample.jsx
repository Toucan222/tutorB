import React, { useState } from 'react'
import { teachers, lessons, students } from '../data/mockData'
import StatusBadge from '../components/common/StatusBadge'
import ProgressBar from '../components/common/ProgressBar'
import LessonCard from '../components/lessons/LessonCard'

export default function TeacherExample() {
  const [showClassDetailsModal, setShowClassDetailsModal] = useState(false)
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false)
  const [showEarningsModal, setShowEarningsModal] = useState(false)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [selectedClass, setSelectedClass] = useState(null)

  // Demo: Using first teacher as example
  const currentTeacher = teachers[0]
  const teacherLessons = lessons.filter(lesson => 
    lesson.teacher === currentTeacher.name
  )

  // Calculate demo metrics
  const totalHours = 32 // Demo value
  const completedClasses = 24
  const upcomingClasses = 8
  const monthlyEarnings = totalHours * currentTeacher.wage.base
  const bonusEarnings = totalHours * (currentTeacher.wage.premium - currentTeacher.wage.base)

  return (
    <div className="space-y-6">
      {/* Header with Teacher Info */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
          <p className="text-gray-500">Welcome back, {currentTeacher.name}</p>
        </div>
        <div className="flex space-x-3">
          <button 
            className="btn bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
            onClick={() => setShowAvailabilityModal(true)}
          >
            Manage Availability
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => setShowEarningsModal(true)}
          >
            View Earnings
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <h3 className="text-lg font-medium mb-2">Today's Classes</h3>
          <div className="text-3xl font-bold text-blue-600">
            {teacherLessons.filter(l => l.date === '2023-08-21').length}
          </div>
          <p className="text-sm text-gray-500 mt-1">Next class in 2 hours</p>
        </div>

        <div className="card">
          <h3 className="text-lg font-medium mb-2">This Month</h3>
          <div className="text-3xl font-bold text-cyan-600">{totalHours}</div>
          <p className="text-sm text-gray-500 mt-1">teaching hours</p>
        </div>

        <div className="card">
          <h3 className="text-lg font-medium mb-2">Students</h3>
          <div className="text-3xl font-bold text-green-600">
            {new Set(teacherLessons.flatMap(l => l.students)).size}
          </div>
          <p className="text-sm text-gray-500 mt-1">active students</p>
        </div>

        <div className="card">
          <h3 className="text-lg font-medium mb-2">Rating</h3>
          <div className="text-3xl font-bold text-purple-600">4.9</div>
          <p className="text-sm text-gray-500 mt-1">from 56 reviews</p>
        </div>
      </div>

      {/* Schedule Overview */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Today's Schedule</h2>
          <div className="flex space-x-2">
            <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option>All Classes</option>
              <option>Group Classes</option>
              <option>Private Lessons</option>
              <option>Trial Classes</option>
            </select>
          </div>
        </div>
        
        <div className="space-y-4">
          {teacherLessons.map(lesson => (
            <div 
              key={lesson.id}
              className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => {
                setSelectedClass(lesson)
                setShowClassDetailsModal(true)
              }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{lesson.subject} ({lesson.level})</h3>
                  <p className="text-sm text-gray-500">{lesson.time} • Room {lesson.room}</p>
                </div>
                <StatusBadge status={lesson.type} />
              </div>
              <div className="mt-2">
                <div className="text-sm text-gray-600">Students:</div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {lesson.students.map((student, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 bg-gray-100 rounded-full text-sm"
                    >
                      {student}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-3 flex justify-end space-x-2">
                <button 
                  className="text-sm text-blue-600 hover:text-blue-800"
                  onClick={(e) => {
                    e.stopPropagation()
                    alert('Demo: Opening attendance form')
                  }}
                >
                  Take Attendance
                </button>
                <button 
                  className="text-sm text-blue-600 hover:text-blue-800"
                  onClick={(e) => {
                    e.stopPropagation()
                    alert('Demo: Opening materials')
                  }}
                >
                  View Materials
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance & Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Performance Overview</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Class Completion Rate</span>
                <span>98%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-green-500 rounded-full" style={{ width: '98%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Student Satisfaction</span>
                <span>4.9/5.0</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: '98%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Student Progress Rate</span>
                <span>92%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-purple-500 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button 
              className="text-sm text-blue-600 hover:text-blue-800"
              onClick={() => setShowFeedbackModal(true)}
            >
              View All Feedback →
            </button>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Recent Student Progress</h2>
          <div className="space-y-4">
            {teacherLessons[0]?.students.map((student, idx) => (
              <div key={idx} className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{student}</span>
                    <span className="text-sm text-gray-500">Level A2 → B1</span>
                  </div>
                  <ProgressBar value={75} total={100} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Class Details Modal */}
      {showClassDetailsModal && selectedClass && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Class Details</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowClassDetailsModal(false)}
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subject</label>
                  <div className="mt-1 text-sm">{selectedClass.subject} ({selectedClass.level})</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Time</label>
                  <div className="mt-1 text-sm">{selectedClass.time}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Room</label>
                  <div className="mt-1 text-sm">{selectedClass.room}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <div className="mt-1">
                    <StatusBadge status={selectedClass.type} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Students</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedClass.students.map((student, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                    >
                      {student}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Lesson Plan</label>
                <div className="mt-2 p-3 bg-gray-50 rounded-lg text-sm">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Review previous lesson concepts</li>
                    <li>Introduce new grammar point</li>
                    <li>Practice exercises</li>
                    <li>Conversation practice</li>
                    <li>Homework assignment</li>
                  </ul>
                </div>
              </div>

              <div className="flex space-x-3">
                <button 
                  className="btn btn-primary flex-1"
                  onClick={() => {
                    alert('Demo: Opening attendance form')
                    setShowClassDetailsModal(false)
                  }}
                >
                  Take Attendance
                </button>
                <button 
                  className="btn bg-gray-100 text-gray-700 hover:bg-gray-200 flex-1"
                  onClick={() => {
                    alert('Demo: Opening materials')
                    setShowClassDetailsModal(false)
                  }}
                >
                  View Materials
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Availability Modal */}
      {showAvailabilityModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Manage Availability</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowAvailabilityModal(false)}
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              {Object.entries(currentTeacher.availability).map(([day, slots]) => (
                <div key={day} className="border-b pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium capitalize">{day}</h4>
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      + Add Time Slot
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {slots.map((slot, idx) => (
                      <div 
                        key={idx}
                        className="p-2 bg-blue-50 rounded text-sm flex justify-between items-center"
                      >
                        {slot}
                        <button className="text-red-600 hover:text-red-800">×</button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <button 
                className="btn btn-primary w-full"
                onClick={() => {
                  alert('Demo: Availability updated successfully!')
                  setShowAvailabilityModal(false)
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Earnings Modal */}
      {showEarningsModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Earnings Overview</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowEarningsModal(false)}
              >
                ×
              </button>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-700">Monthly Earnings</div>
                  <div className="text-2xl font-bold text-blue-900">${monthlyEarnings}</div>
                  <div className="text-sm text-blue-600">{totalHours} hours</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-sm text-green-700">Bonus Earnings</div>
                  <div className="text-2xl font-bold text-green-900">${bonusEarnings}</div>
                  <div className="text-sm text-green-600">Performance bonus</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="text-sm text-purple-700">Total Classes</div>
                  <div className="text-2xl font-bold text-purple-900">{completedClasses + upcomingClasses}</div>
                  <div className="text-sm text-purple-600">This month</div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Earnings Breakdown</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>Base Rate Classes</span>
                    <span className="font-medium">${currentTeacher.wage.base}/hr</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>Premium Rate Classes</span>
                    <span className="font-medium">${currentTeacher.wage.premium}/hr</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>Performance Bonus</span>
                    <span className="font-medium">+$5/hr</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Monthly Stats</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Completed Classes</span>
                      <span>{completedClasses} classes</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-green-500 rounded-full" 
                        style={{ width: `${(completedClasses / (completedClasses + upcomingClasses)) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Teaching Hours</span>
                      <span>{totalHours} hours</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-blue-500 rounded-full" 
                        style={{ width: '80%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button 
                  className="btn btn-primary flex-1"
                  onClick={() => alert('Demo: Downloading earnings report')}
                >
                  Download Report
                </button>
                <button 
                  className="btn bg-gray-100 text-gray-700 hover:bg-gray-200 flex-1"
                  onClick={() => setShowEarningsModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Student Feedback</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowFeedbackModal(false)}
              >
                ×
              </button>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">4.9</div>
                  <div className="text-sm text-blue-600">Overall Rating</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">56</div>
                  <div className="text-sm text-green-600">Total Reviews</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">98%</div>
                  <div className="text-sm text-purple-600">Satisfaction Rate</div>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    student: 'Emma Wilson',
                    date: '2023-08-20',
                    rating: 5,
                    comment: 'Excellent teaching style! Very patient and explains concepts clearly.'
                  },
                  {
                    student: 'James Chen',
                    date: '2023-08-19',
                    rating: 5,
                    comment: 'Great at keeping the class engaged and making learning fun.'
                  },
                  {
                    student: 'Sofia Rodriguez',
                    date: '2023-08-18',
                    rating: 4,
                    comment: 'Very knowledgeable and helpful. Could provide more practice materials.'
                  }
                ].map((feedback, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{feedback.student}</h4>
                        <p className="text-sm text-gray-500">{feedback.date}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span className="font-medium">{feedback.rating}.0</span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm">{feedback.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
