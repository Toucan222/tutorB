import React, { useState } from 'react'
import { teachers, rooms } from '../../data/mockData'

export default function LessonCreator({ onClose }) {
  const [lessonType, setLessonType] = useState('group')
  const [subject, setSubject] = useState('')
  const [level, setLevel] = useState('')
  const [capacity, setCapacity] = useState(6)
  const [showResults, setShowResults] = useState(false)

  const handleFindSlots = () => {
    if (!subject || !level) {
      alert('Demo: Please fill in required fields')
      return
    }
    setShowResults(true)
  }

  const handleCreateLesson = (slot) => {
    alert(`Demo: Lesson created successfully!
    Type: ${lessonType}
    Subject: ${subject}
    Level: ${level}
    Time: ${slot.time}
    Teacher: ${slot.teacher}
    Room: ${slot.room}`)
    onClose?.()
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Create New Lesson</h3>
        {onClose && (
          <button 
            className="text-gray-400 hover:text-gray-500"
            onClick={onClose}
          >
            ×
          </button>
        )}
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Lesson Type</label>
          <select 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={lessonType}
            onChange={(e) => setLessonType(e.target.value)}
          >
            <option value="group">Group Class</option>
            <option value="private">Private Lesson</option>
            <option value="trial">Trial Class</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Subject</label>
          <select 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="">Select Subject</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
            <option value="german">German</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Level</label>
          <select 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="">Select Level</option>
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
            <option value="C1">C1</option>
          </select>
        </div>

        {lessonType === 'group' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Capacity</label>
            <input
              type="number"
              min="1"
              max="10"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={capacity}
              onChange={(e) => setCapacity(parseInt(e.target.value))}
            />
          </div>
        )}

        <div className="pt-4">
          <button 
            className="btn btn-primary w-full"
            onClick={handleFindSlots}
          >
            Find Available Slots
          </button>
        </div>

        {showResults && (
          <div className="mt-4 space-y-4">
            <h4 className="font-medium">Available Slots:</h4>
            <div className="space-y-2">
              {[
                { time: "Monday 10:00", teacher: "Sarah Miller", room: "Room 1.1" },
                { time: "Tuesday 14:00", teacher: "John Davis", room: "Room 2.1" },
                { time: "Wednesday 16:00", teacher: "Maria Garcia", room: "Room 1.2" }
              ].map((slot, index) => (
                <div 
                  key={index}
                  className="p-3 border rounded-lg hover:bg-blue-50 cursor-pointer"
                  onClick={() => handleCreateLesson(slot)}
                >
                  <div className="font-medium">{slot.time}</div>
                  <div className="text-sm text-gray-600">
                    {slot.teacher} • {slot.room}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
