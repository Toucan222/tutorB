import React, { useState } from 'react'
import { students, lessons, packages } from '../data/mockData'
import StatusBadge from '../components/common/StatusBadge'
import ProgressBar from '../components/common/ProgressBar'
import LessonCard from '../components/lessons/LessonCard'

export default function StudentExample() {
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showRescheduleModal, setShowRescheduleModal] = useState(false)
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [showProgressModal, setShowProgressModal] = useState(false)
  const [showPackageModal, setShowPackageModal] = useState(false)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)

  // Demo: Using first student as example
  const currentStudent = students[0]
  const studentLessons = lessons.filter(lesson => 
    lesson.students.includes(currentStudent.name)
  )

  return (
    <div className="space-y-6">
      {/* Header with Student Info */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-500">Welcome back, {currentStudent.name}</p>
        </div>
        <div className="flex space-x-3">
          <button 
            className="btn bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
            onClick={() => setShowProgressModal(true)}
          >
            View Progress Report
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => setShowBookingModal(true)}
          >
            Book New Class
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-medium mb-2">My Progress</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Current Level:</span>
              <span className="font-medium">{currentStudent.level}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Course:</span>
              <span className="font-medium">{currentStudent.course}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Status:</span>
              <StatusBadge status={currentStudent.status} />
            </div>
            <button 
              className="text-sm text-blue-600 hover:text-blue-800 mt-2"
              onClick={() => setShowProgressModal(true)}
            >
              View Detailed Progress →
            </button>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-medium mb-2">Package Status</h3>
          <div className="space-y-2">
            <ProgressBar 
              value={currentStudent.package.used} 
              total={currentStudent.package.purchased}
            />
            <div className="flex justify-between text-sm">
              <span>Remaining Classes:</span>
              <span className="font-medium">{currentStudent.package.remaining}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Scheduled:</span>
              <span className="font-medium">{currentStudent.package.scheduled}</span>
            </div>
            <button 
              className="text-sm text-blue-600 hover:text-blue-800 mt-2"
              onClick={() => setShowPackageModal(true)}
            >
              View Package Details →
            </button>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-medium mb-2">Next Class</h3>
          {studentLessons[0] && (
            <div className="space-y-2">
              <div className="text-sm">
                <div className="font-medium">{studentLessons[0].subject} ({studentLessons[0].level})</div>
                <div className="text-gray-500">{studentLessons[0].time}</div>
                <div className="text-gray-500">with {studentLessons[0].teacher}</div>
                <div className="text-gray-500">Room {studentLessons[0].room}</div>
              </div>
              <div className="flex space-x-2 mt-3">
                <button 
                  className="btn btn-secondary text-sm flex-1"
                  onClick={() => {
                    setSelectedLesson(studentLessons[0])
                    setShowRescheduleModal(true)
                  }}
                >
                  Reschedule
                </button>
                <button 
                  className="btn bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm flex-1"
                  onClick={() => alert('Demo: Class materials would be downloaded')}
                >
                  Materials
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Learning Path */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">My Learning Path</h2>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-200"></div>
          <div className="space-y-6 relative">
            {[
              { level: 'A1', status: 'completed', date: '2023-06' },
              { level: 'A2', status: 'current', date: '2023-09' },
              { level: 'B1', status: 'upcoming', date: '2024-01' },
            ].map((milestone, index) => (
              <div key={index} className="flex items-center ml-6">
                <div className={`absolute -left-3 w-6 h-6 rounded-full border-2 ${
                  milestone.status === 'completed' ? 'bg-green-500 border-green-500' :
                  milestone.status === 'current' ? 'bg-blue-500 border-blue-500' :
                  'bg-white border-gray-300'
                }`}></div>
                <div className="bg-white p-4 rounded-lg border flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Level {milestone.level}</h3>
                      <p className="text-sm text-gray-500">{milestone.date}</p>
                    </div>
                    <StatusBadge 
                      status={
                        milestone.status === 'completed' ? 'Completed' :
                        milestone.status === 'current' ? 'In Progress' :
                        'Upcoming'
                      } 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Classes */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">My Upcoming Classes</h2>
          <button 
            className="text-sm text-blue-600 hover:text-blue-800"
            onClick={() => setShowBookingModal(true)}
          >
            + Book More Classes
          </button>
        </div>
        <div className="space-y-4">
          {studentLessons.map(lesson => (
            <LessonCard 
              key={lesson.id} 
              lesson={lesson}
            />
          ))}
        </div>
      </div>

      {/* Progress Modal */}
      {showProgressModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Progress Report</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowProgressModal(false)}
              >
                ×
              </button>
            </div>
            <div className="space-y-6">
              {/* Skills Overview */}
              <div>
                <h4 className="font-medium mb-3">Skills Overview</h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { skill: 'Speaking', level: 75 },
                    { skill: 'Listening', level: 80 },
                    { skill: 'Reading', level: 85 },
                    { skill: 'Writing', level: 70 },
                  ].map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{skill.skill}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-blue-600 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Achievements */}
              <div>
                <h4 className="font-medium mb-3">Recent Achievements</h4>
                <div className="space-y-2">
                  {[
                    'Completed A1 Level with 90% score',
                    'Perfect attendance for 3 months',
                    'Completed 5 conversation practice sessions',
                    'Submitted all homework assignments on time',
                  ].map((achievement, index) => (
                    <div 
                      key={index}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <span className="text-green-500">✓</span>
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Teacher Comments */}
              <div>
                <h4 className="font-medium mb-3">Teacher Comments</h4>
                <div className="space-y-3">
                  {[
                    {
                      teacher: 'Dr. Sarah Miller',
                      date: '2023-08-15',
                      comment: 'Excellent progress in speaking skills. Shows great initiative in class discussions.'
                    },
                    {
                      teacher: 'Prof. John Davis',
                      date: '2023-08-01',
                      comment: 'Good grasp of grammar concepts. Need to focus more on pronunciation.'
                    }
                  ].map((comment, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{comment.teacher}</span>
                        <span className="text-gray-500">{comment.date}</span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.comment}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                className="btn btn-primary w-full"
                onClick={() => {
                  alert('Demo: Downloading progress report PDF')
                  setShowProgressModal(false)
                }}
              >
                Download Full Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Package Modal */}
      {showPackageModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Package Details</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowPackageModal(false)}
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">Package Usage</div>
                <ProgressBar 
                  value={currentStudent.package.used} 
                  total={currentStudent.package.purchased}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Purchased:</span>
                  <p className="font-medium">{currentStudent.package.purchased} lessons</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Used:</span>
                  <p className="font-medium">{currentStudent.package.used} lessons</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Scheduled:</span>
                  <p className="font-medium">{currentStudent.package.scheduled} lessons</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Remaining:</span>
                  <p className="font-medium">{currentStudent.package.remaining} lessons</p>
                </div>
              </div>
              <div className="border-t pt-4 mt-4">
                <h4 className="font-medium mb-2">Available Packages</h4>
                <div className="space-y-3">
                  {packages.map(pkg => (
                    <div 
                      key={pkg.id}
                      className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => alert(`Demo: Opening purchase flow for ${pkg.name}`)}
                    >
                      <div className="flex justify-between">
                        <div>
                          <div className="font-medium">{pkg.name}</div>
                          <div className="text-sm text-gray-500">{pkg.type}</div>
                        </div>
                        <span className="text-lg font-bold text-blue-600">${pkg.price}</span>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        {pkg.sessions} lessons • Valid for {pkg.validity}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Book Class Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Book New Class</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowBookingModal(false)}
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Class Type</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>Group Class</option>
                  <option>Private Lesson</option>
                  <option>Workshop</option>
                  <option>Conversation Practice</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Preferred Date</label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Preferred Time</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>Morning (9:00 - 12:00)</option>
                  <option>Afternoon (12:00 - 15:00)</option>
                  <option>Evening (15:00 - 18:00)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Focus Area</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>General Practice</option>
                  <option>Grammar Focus</option>
                  <option>Conversation Skills</option>
                  <option>Exam Preparation</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Teacher Preference</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>No Preference</option>
                  <option>Dr. Sarah Miller</option>
                  <option>Prof. John Davis</option>
                  <option>Maria Garcia</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
                <textarea
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                  placeholder="Any specific requirements or topics you'd like to focus on..."
                />
              </div>
              <button 
                className="btn btn-primary w-full"
                onClick={() => {
                  alert('Demo: Class booked successfully!')
                  setShowBookingModal(false)
                }}
              >
                Book Class
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && selectedLesson && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Reschedule Class</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowRescheduleModal(false)}
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium">Current Class</h4>
                <p className="text-sm text-gray-600">
                  {selectedLesson.subject} ({selectedLesson.level})
                  <br />
                  {selectedLesson.time} with {selectedLesson.teacher}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">New Date</label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">New Time</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>09:00</option>
                  <option>10:00</option>
                  <option>11:00</option>
                  <option>14:00</option>
                  <option>15:00</option>
                  <option>16:00</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Reason for Rescheduling</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>Schedule Conflict</option>
                  <option>Personal Emergency</option>
                  <option>Health Issues</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="text-sm text-gray-500">
                Note: Rescheduling must be done at least 24 hours before the class.
              </div>
              <button 
                className="btn btn-primary w-full"
                onClick={() => {
                  alert('Demo: Class rescheduled successfully!')
                  setShowRescheduleModal(false)
                }}
              >
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Class Feedback</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowFeedbackModal(false)}
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Overall Rating</label>
                <div className="flex space-x-2 mt-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-blue-100 
                        flex items-center justify-center text-gray-600 hover:text-blue-600"
                    >
                      {rating}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">What went well?</label>
                <textarea
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">What could be improved?</label>
                <textarea
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                />
              </div>
              <button 
                className="btn btn-primary w-full"
                onClick={() => {
                  alert('Demo: Feedback submitted successfully!')
                  setShowFeedbackModal(false)
                }}
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
