import React from 'react'
import StatusBadge from './common/StatusBadge'

export default function LessonTable({ lessons, onLessonClick, onStatusChange }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {lessons.map((lesson) => (
            <tr 
              key={lesson.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => onLessonClick?.(lesson)}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lesson.time}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{lesson.subject}</div>
                <div className="text-xs text-gray-500">Level {lesson.level}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lesson.teacher}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lesson.room}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge 
                  status={lesson.type} 
                  size="small"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{lesson.students.length} students</div>
                <div className="text-xs text-gray-500">
                  {lesson.capacity.current}/{lesson.capacity.max} capacity
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <select
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={lesson.status}
                  onChange={(e) => {
                    e.stopPropagation()
                    onStatusChange?.(lesson, e.target.value)
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex space-x-2">
                  <button 
                    className="text-blue-600 hover:text-blue-900"
                    onClick={(e) => {
                      e.stopPropagation()
                      alert(`Demo: Opening lesson details for ${lesson.subject}`)
                    }}
                  >
                    Details
                  </button>
                  <button 
                    className="text-blue-600 hover:text-blue-900"
                    onClick={(e) => {
                      e.stopPropagation()
                      alert(`Demo: Opening edit form for ${lesson.subject}`)
                    }}
                  >
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
