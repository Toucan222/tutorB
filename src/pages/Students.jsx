import React, { useState } from 'react'
import { students } from '../data/mockData'

export default function Students() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddStudent, setShowAddStudent] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [filterLevel, setFilterLevel] = useState('')
  const [filterCourse, setFilterCourse] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [showPackageModal, setShowPackageModal] = useState(false)
  const [showFamilyModal, setShowFamilyModal] = useState(false)
  const [currentPackage, setCurrentPackage] = useState(null)
  const [currentFamily, setCurrentFamily] = useState(null)
  
  const handleAddStudent = () => {
    setShowAddStudent(true)
  }

  const handleEditStudent = (student) => {
    setSelectedStudent(student)
    alert(`Demo: Opening edit form for ${student.name}`)
  }

  const handleViewPackages = (student) => {
    setCurrentPackage(student.package)
    setShowPackageModal(true)
  }

  const handleViewFamily = (student) => {
    setCurrentFamily({
      name: student.family,
      id: student.familyId,
      billing: student.billing
    })
    setShowFamilyModal(true)
  }

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
          <button 
            className="btn btn-primary"
            onClick={handleAddStudent}
          >
            + Add Student
          </button>
        </div>
      </div>

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
              <option value="German">German</option>
              <option value="French">French</option>
            </select>
            <select 
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Trial">Trial</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Info</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Billing</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div>
                        <div className="font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.family}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{student.course}</div>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      Level {student.level}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">
                        {student.package.remaining} / {student.package.purchased} lessons
                      </div>
                      <div className="text-gray-500">
                        {student.package.scheduled} scheduled
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className={`font-medium ${
                        student.billing.status === 'Current' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {student.billing.status}
                      </div>
                      <div className="text-gray-500">{student.billing.method}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex flex-col space-y-2">
                      <button 
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => handleEditStudent(student)}
                      >
                        Edit Profile
                      </button>
                      <button 
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => handleViewPackages(student)}
                      >
                        View Package
                      </button>
                      <button 
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => handleViewFamily(student)}
                      >
                        Family Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Package Modal */}
      {showPackageModal && currentPackage && (
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
              <div className="flex justify-between">
                <span className="text-gray-500">Purchased Lessons:</span>
                <span className="font-medium">{currentPackage.purchased}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Used Lessons:</span>
                <span className="font-medium">{currentPackage.used}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Scheduled:</span>
                <span className="font-medium">{currentPackage.scheduled}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Remaining:</span>
                <span className="font-medium">{currentPackage.remaining}</span>
              </div>
              <button 
                className="btn btn-primary w-full"
                onClick={() => {
                  alert('Demo: Opening package purchase...')
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
      {showFamilyModal && currentFamily && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Family Details</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowFamilyModal(false)}
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Family Name</label>
                <div className="mt-1 text-sm">{currentFamily.name}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Family ID</label>
                <div className="mt-1 text-sm">{currentFamily.id}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Billing Status</label>
                <div className="mt-1 text-sm">{currentFamily.billing.status}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                <div className="mt-1 text-sm">{currentFamily.billing.method}</div>
              </div>
              <button 
                className="btn btn-primary w-full"
                onClick={() => {
                  alert('Demo: Opening family billing management...')
                  setShowFamilyModal(false)
                }}
              >
                Manage Billing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
