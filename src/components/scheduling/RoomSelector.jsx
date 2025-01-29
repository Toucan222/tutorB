import React, { useState } from 'react'
import { rooms } from '../../data/mockData'

export default function RoomSelector({ onSelect, currentBranch }) {
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [showDetails, setShowDetails] = useState(false)
  const [filterBranch, setFilterBranch] = useState(currentBranch || 'all')

  const filteredRooms = rooms.filter(room => 
    filterBranch === 'all' || room.branch === filterBranch
  )

  const handleRoomSelect = (room) => {
    setSelectedRoom(room)
    setShowDetails(true)
  }

  const handleConfirm = () => {
    if (selectedRoom) {
      onSelect(selectedRoom)
      setShowDetails(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Select Room</h3>
        <select
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={filterBranch}
          onChange={(e) => setFilterBranch(e.target.value)}
        >
          <option value="all">All Branches</option>
          <option value="Main Branch">Main Branch</option>
          <option value="Downtown Branch">Downtown Branch</option>
          <option value="West Branch">West Branch</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
              selectedRoom?.id === room.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => handleRoomSelect(room)}
          >
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
            
            <div className="mt-2 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Capacity:</span>
                <span className="font-medium">{room.capacity} students</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {room.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showDetails && selectedRoom && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Room Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Room Name</label>
                <div className="mt-1 text-sm">{selectedRoom.name}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Branch</label>
                <div className="mt-1 text-sm">{selectedRoom.branch}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Capacity</label>
                <div className="mt-1 text-sm">{selectedRoom.capacity} students</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Features</label>
                <div className="mt-1 flex flex-wrap gap-1">
                  {selectedRoom.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  className="btn btn-primary flex-1"
                  onClick={handleConfirm}
                >
                  Confirm Selection
                </button>
                <button
                  className="btn bg-gray-100 text-gray-700 hover:bg-gray-200 flex-1"
                  onClick={() => setShowDetails(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
