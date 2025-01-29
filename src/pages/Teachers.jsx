import React, { useState } from 'react'
import { teachers } from '../data/mockData'

export default function Teachers() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSubject, setFilterSubject] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false)
  const [showWageModal, setShowWageModal] = useState(false)

  const handleViewSchedule = (teacher) => {
    setSelectedTeacher(teacher)
    setShowScheduleModal(true)
  }

  const handleEditAvailability = (teacher) => {
    setSelectedTeacher(teacher)
    setShowAvailabilityModal(true)
  }

  const handleWageDetails = (teacher) => {
    setSelectedTeacher(teacher)
    setShowWageModal(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Teachers</h1>
        <div className="flex space-x-3">
          <button 
            className="btn bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
            onClick={() => alert('Demo: Exporting teacher data...')}
          >
            Export Data
          </button>
          <button className="btn btn-primary">+ Add Teacher</button>
        </div>
      </div>

      <div className="card">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search teachers by name, subject, or status..."
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select 
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
            >
              <option value="">All Subjects</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
            </select>
            <select 
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((teacher) => (
            <div key={teacher.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{teacher.name}</h3>
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

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Base Rate:</span>
                  <span className="font-medium">${teacher.wage.base}/hr</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Premium Rate:</span>
                  <span className="font-medium">${teacher.wage.premium}/hr</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Hours This Month:</span>
                  <span className="font-medium">32 hrs</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    className="btn btn-secondary text-sm"
                    onClick={() => handleViewSchedule(teacher)}
                  >
                    View Schedule
                  </button>
                  <button 
                    className="btn bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm"
                    onClick={() => handleEditAvailability(teacher)}
                  >
                    Availability
                  </button>
                  <button 
                    className="btn bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm col-span-2"
                    onClick={() => handleWageDetails(teacher)}
                  >
                    Wage Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && selectedTeacher && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Schedule - {selectedTeacher.name}</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowScheduleModal(false)}
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              {Object.entries(selectedTeacher.availability).map(([day, slots]) => (
                <div key={day} className="border-b pb-4">
                  <h4 className="font-medium capitalize mb-2">{day}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {slots.map(slot => (
                      <div 
                        key={slot}
                        className="p-2 bg-blue-50 rounded text-sm"
                      >
                        {slot}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Availability Modal */}
      {showAvailabilityModal && selectedTeacher && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Edit Availability - {selectedTeacher.name}</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowAvailabilityModal(false)}
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              {Object.entries(selectedTeacher.availability).map(([day, slots]) => (
                <div key={day} className="border-b pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium capitalize">{day}</h4>
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      + Add Time Slot
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {slots.map(slot => (
                      <div 
                        key={slot}
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

      {/* Wage Modal */}
      {showWageModal && selectedTeacher && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Wage Details - {selectedTeacher.name}</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowWageModal(false)}
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Base Rate</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    value={selectedTeacher.wage.base}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">/hr</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Premium Rate</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    value={selectedTeacher.wage.premium}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">/hr</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Currency</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                  <option>{selectedTeacher.wage.currency}</option>
                  <option>EUR</option>
                  <option>GBP</option>
                </select>
              </div>
              <button 
                className="btn btn-primary w-full"
                onClick={() => {
                  alert('Demo: Wage details updated successfully!')
                  setShowWageModal(false)
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
