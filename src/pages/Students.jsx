import React, { useState } from 'react'
import { students } from '../data/mockData'
import StatusBadge from '../components/common/StatusBadge'
import ProgressBar from '../components/common/ProgressBar'

export default function Students() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLevel, setFilterLevel] = useState('')
  const [filterCourse, setFilterCourse] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [showPackageModal, setShowPackageModal] = useState(false)
  const [showFamilyModal, setShowFamilyModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Students</h1>
        <div className="flex space-x-3">
          <button 
            className="btn bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
            onClick={() => alert('Demo: Exporting student data...')}
          >
            Export Data
          </button>
          <button className="btn btn-primary">+ Add Student</button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search students by name, email, or family..."
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select 
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
            >
              <option value="">All Levels</option>
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
              <option value="C1">C1</option>
              <option value="C2">C2</option>
            </select>
            <select 
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
            >
              <option value="">All Courses</option>
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
              <option value="Active">Active</option>
              <option value="Trial">Trial</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Student List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <div key={student.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{student.name}</h3>
                  <p className="text-sm text-gray-500">{student.course} ({student.level})</p>
                </div>
                <StatusBadge status={student.status} />
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Package Usage</div>
                  <ProgressBar 
                    value={student.package.used} 
                    total={student.package.purchased}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Family:</span>
                  <span className="font-medium">{student.family}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Billing:</span>
                  <span className="font-medium">{student.billing.method}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button 
                  className="btn btn-secondary text-sm"
                  onClick={() => {
                    setSelectedStudent(student)
                    setShowPackageModal(true)
                  }}
                >
                  View Package
                </button>
                <button 
                  className="btn bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm"
                  onClick={() => {
                    setSelectedStudent(student)
                    setShowFamilyModal(true)
                  }}
                >
                  Family Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Package Modal */}
      {showPackageModal && selectedStudent && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Package Details - {selectedStudent.name}</h3>
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
                  value={selectedStudent.package.used} 
                  total={selectedStudent.package.purchased}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Purchased:</span>
                  <p className="font-medium">{selectedStudent.package.purchased} lessons</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Used:</span>
                  <p className="font-medium">{selectedStudent.package.used} lessons</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Scheduled:</span>
                  <p className="font-medium">{selectedStudent.package.scheduled} lessons</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Remaining:</span>
                  <p className="font-medium">{selectedStudent.package.remaining} lessons</p>
                </div>
              </div>
              <button 
                className="btn btn-primary w-full"
                onClick={() => {
                  alert('Demo: Opening package purchase interface')
                  setShowPackageModal(false)
                }}
              >
                Purchase New Package
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Family Modal */}
      {showFamilyModal && selectedStudent && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Family Details - {selectedStudent.family}</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowFamilyModal(false)}
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Billing Status</label>
                <div className="mt-1 text-sm">{selectedStudent.billing.status}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                <div className="mt-1 text-sm">{selectedStudent.billing.method}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Family ID</label>
                <div className="mt-1 text-sm">{selectedStudent.familyId}</div>
              </div>
              <button 
                className="btn btn-primary w-full"
                onClick={() => {
                  alert('Demo: Opening family management interface')
                  setShowFamilyModal(false)
                }}
              >
                Manage Family
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
