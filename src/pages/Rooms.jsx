import React, { useState } from 'react'
import { rooms } from '../data/mockData'

export default function Rooms() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterBranch, setFilterBranch] = useState('')
  const [filterCapacity, setFilterCapacity] = useState('')
  const [filterFeatures, setFilterFeatures] = useState([])
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)

  const handleViewSchedule = (room) => {
    setSelectedRoom(room)
    setShowScheduleModal(true)
  }

  const handleEditRoom = (room) => {
    setSelectedRoom(room)
    setShowEditModal(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Rooms</h1>
        <div className="flex space-x-3">
          <button 
            className="btn bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
            onClick={() => alert('Demo: Exporting room data...')}
          >
            Export Data
          </button>
          <button className="btn btn-primary">+ Add Room</button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search rooms by name or branch..."
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select 
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={filterBranch}
              onChange={(e) => setFilterBranch(e.target.value)}
            >
              <option value="">All Branches</option>
              <option value="Main Branch">Main Branch</option>
              <option value="Downtown">Downtown Branch</option>
            </select>
            <select 
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={filterCapacity}
              onChange={(e) => setFilterCapacity(e.target.value)}
            >
              <option value="">All Capacities</option>
              <option value="small">Small (1-4)</option>
              <option value="medium">Medium (5-8)</option>
              <option value="large">Large (9+)</option>
            </select>
          </div>
        </div>

        {/* Feature Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {['Whiteboard', 'Projector', 'Air Conditioning', 'Computer'].map(feature => (
            <button
              key={feature}
              className={`px-3 py-1 rounded-full text-sm ${
                filterFeatures.includes(feature)
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setFilterFeatures(prev => 
                prev.includes(feature)
                  ? prev.filter(f => f !== feature)
                  : [...prev, feature]
              )}
            >
              {feature}
            </button>
          ))}
        </div>
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room.id} className="card">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{room.name}</h3>
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

            {/* Room Details */}
            <div className="mt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Capacity:</span>
                <span className="font-medium">{room.capacity} students</span>
              </div>
              
              <div className="space-y-1">
                <div className="text-sm text-gray-500">Features:</div>
                <div className="flex flex-wrap gap-1">
                  {room.features.map(feature => (
                    <span 
                      key={feature}
                      className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {room.currentClass && (
                <div className="p-2 rounded bg-blue-50 text-sm">
                  <div className="font-medium text-blue-900">Current Class:</div>
                  <div className="text-blue-700">{room.currentClass}</div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button 
                className="btn btn-secondary text-sm"
                onClick={() => handleViewSchedule(room)}
              >
                View Schedule
              </button>
              <button 
                className="btn bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm"
                onClick={() => handleEditRoom(room)}
              >
                Edit Room
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && selectedRoom && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Schedule - {selectedRoom.name}</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowScheduleModal(false)}
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              {/* Demo Schedule Data */}
              {[
                { time: "Monday 10:00-11:30", class: "Spanish A1", teacher: "Sarah Miller" },
                { time: "Monday 14:00-15:30", class: "French B2", teacher: "John Davis" },
                { time: "Tuesday 09:00-10:30", class: "German A2", teacher: "Maria Garcia" }
              ].map((slot, index) => (
                <div 
                  key={index}
                  className="p-3 border rounded-lg hover:bg-blue-50"
                >
                  <div className="font-medium">{slot.time}</div>
                  <div className="text-sm text-gray-600">
                    {slot.class} • {slot.teacher}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedRoom && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Edit Room - {selectedRoom.name}</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowEditModal(false)}
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Room Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  defaultValue={selectedRoom.name}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Branch</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>Main Branch</option>
                  <option>Downtown Branch</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Capacity</label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  defaultValue={selectedRoom.capacity}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Features</label>
                <div className="mt-2 space-y-2">
                  {['Whiteboard', 'Projector', 'Air Conditioning', 'Computer'].map(feature => (
                    <label key={feature} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        defaultChecked={selectedRoom.features.includes(feature)}
                      />
                      <span className="ml-2 text-sm text-gray-700">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button 
                className="btn btn-primary w-full"
                onClick={() => {
                  alert('Demo: Room updated successfully!')
                  setShowEditModal(false)
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
