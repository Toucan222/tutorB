import React from 'react'
import { format } from 'date-fns'
import { lessons } from '../data/mockData'

export default function ScheduleCalendar() {
  const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']

  return (
    <div className="grid grid-cols-1 divide-y">
      {timeSlots.map((time) => (
        <div key={time} className="p-4">
          <div className="flex items-start">
            <div className="w-20 text-sm text-gray-500">{time}</div>
            <div className="flex-1">
              {lessons
                .filter(lesson => lesson.time === time)
                .map(lesson => (
                  <div 
                    key={lesson.id}
                    className="ml-2 p-3 rounded-lg bg-blue-50 border border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors"
                    onClick={() => alert(`Demo: Opening lesson details for ${lesson.subject} (${lesson.level})`)}
                  >
                    <div className="font-medium text-blue-900">
                      {lesson.subject} ({lesson.level})
                    </div>
                    <div className="text-sm text-blue-700">
                      {lesson.teacher} • {lesson.room}
                    </div>
                    <div className="text-xs text-blue-600 mt-1">
                      {lesson.students.join(', ')}
                    </div>
                    <div className="mt-2 flex space-x-2">
                      <button 
                        className="text-xs text-blue-600 hover:text-blue-800"
                        onClick={(e) => {
                          e.stopPropagation()
                          alert('Demo: Opening attendance marker')
                        }}
                      >
                        Mark Attendance
                      </button>
                      <button 
                        className="text-xs text-blue-600 hover:text-blue-800"
                        onClick={(e) => {
                          e.stopPropagation()
                          alert('Demo: Opening edit form')
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
