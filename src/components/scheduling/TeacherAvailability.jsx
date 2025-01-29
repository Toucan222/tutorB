import React from 'react'
import { teachers } from '../../data/mockData'

export default function TeacherAvailability({ selectedDate, onSelect }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Available Teachers</h3>
      
      <div className="divide-y">
        {teachers.map(teacher => (
          <div key={teacher.id} className="py-3">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium">{teacher.name}</div>
                <div className="text-sm text-gray-500">{teacher.subjects.join(', ')}</div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                teacher.status === 'Full-time' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {teacher.status}
              </span>
            </div>
            
            <div className="mt-2 grid grid-cols-2 gap-2">
              {Object.entries(teacher.availability).map(([day, slots]) => (
                <div key={day} className="text-sm">
                  <div className="font-medium capitalize">{day}</div>
                  {slots.map(slot => (
                    <div 
                      key={slot}
                      className="text-gray-600 cursor-pointer hover:text-blue-600"
                      onClick={() => onSelect(teacher, day, slot)}
                    >
                      {slot}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
