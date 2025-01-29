import React from 'react'
import StatusBadge from '../common/StatusBadge'
import Tooltip from '../common/Tooltip'
import ProgressBar from '../common/ProgressBar'

export default function LessonCard({ lesson }) {
  const getLessonTypeColor = (type) => {
    const colors = {
      private: 'border-purple-200 bg-purple-50',
      group: 'border-blue-200 bg-blue-50',
      trial: 'border-green-200 bg-green-50'
    }
    return colors[type.toLowerCase()] || 'border-gray-200 bg-gray-50'
  }

  return (
    <div className={`p-4 rounded-lg border ${getLessonTypeColor(lesson.type)} mb-4`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-gray-900">
            {lesson.subject} ({lesson.level})
          </h3>
          <p className="text-sm text-gray-500">
            {lesson.teacher} • Room {lesson.room}
          </p>
        </div>
        <StatusBadge status={lesson.status} />
      </div>

      <div className="mb-3">
        <Tooltip content="Current class capacity">
          <div className="mb-2">
            <ProgressBar 
              value={lesson.capacity.current} 
              total={lesson.capacity.max}
              type={lesson.capacity.current >= lesson.capacity.max ? 'warning' : 'default'}
            />
          </div>
        </Tooltip>
      </div>

      <div className="flex flex-wrap gap-2 text-sm">
        {lesson.students.map((student, index) => (
          <span key={index} className="px-2 py-1 bg-white rounded-full border 
            border-gray-200 text-gray-700">
            {student}
          </span>
        ))}
      </div>

      <div className="mt-3 flex justify-end gap-2">
        <button 
          onClick={() => alert('Demo: Opening attendance marker')}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Mark Attendance
        </button>
        <button 
          onClick={() => alert('Demo: Opening lesson details')}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          View Details
        </button>
      </div>
    </div>
  )
}
