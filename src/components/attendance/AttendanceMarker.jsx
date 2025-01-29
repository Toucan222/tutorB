import React, { useState } from 'react'

export default function AttendanceMarker({ lesson }) {
  const [attendance, setAttendance] = useState({})
  const [notes, setNotes] = useState('')
  const [saved, setSaved] = useState(false)

  const handleAttendanceChange = (student, status) => {
    setAttendance(prev => ({
      ...prev,
      [student]: status
    }))
  }

  const handleSave = () => {
    setSaved(true)
    alert('Demo: Attendance saved successfully! In the full version, this would update the database.')
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        {lesson.students.map(student => (
          <div key={student} className="flex items-center justify-between">
            <span className="text-sm font-medium">{student}</span>
            <select 
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              onChange={(e) => handleAttendanceChange(student, e.target.value)}
              value={attendance[student] || ''}
            >
              <option value="">Select...</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="late">Late</option>
            </select>
          </div>
        ))}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Lesson Notes</label>
        <textarea
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add notes about the lesson..."
        />
      </div>

      <button 
        className={`btn w-full ${saved ? 'bg-green-500' : 'btn-primary'}`}
        onClick={handleSave}
      >
        {saved ? 'Saved!' : 'Save Attendance'}
      </button>
    </div>
  )
}
