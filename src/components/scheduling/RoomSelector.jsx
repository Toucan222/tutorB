import React from 'react'
import { rooms } from '../../data/mockData'

export default function RoomSelector({ onSelect }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Available Rooms</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {rooms.map(room => (
          <div 
            key={room.id}
            className="p-4 rounded-lg border border-gray-200 cursor-pointer hover:border-blue-500"
            onClick={() => onSelect(room)}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium">{room.name}</div>
                <div className="text-sm text-gray-500">{room.branch}</div>
              </div>
              <span className="text-sm">
                Cap: {room.capacity}
              </span>
            </div>
            
            <div className="mt-2">
              <div className="text-sm text-gray-500">Features:</div>
              <div className="mt-1 flex flex-wrap gap-1">
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
          </div>
        ))}
      </div>
    </div>
  )
}
