import React, { useState } from 'react'
import { format } from 'date-fns'

export default function LessonCreator({ onClose }) {
  const [step, setStep] = useState(1)
  const [lessonType, setLessonType] = useState('')
  const [subject, setSubject] = useState('')
  const [level, setLevel] = useState('')
  const [capacity, setCapacity] = useState(6)
  const [sessions, setSessions] = useState(10)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
      if (step === 2) {
        setShowSuggestions(true)
      }
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
      setShowSuggestions(false)
    }
  }

  const handleCreate = () => {
    alert('Demo: Lesson created successfully!')
    onClose()
  }

  const suggestedSlots = [
    {
      teacher: 'Dr. Sarah Miller',
      room: 'Room 1.1',
      time: '10:00',
      date: format(new Date(), 'yyyy-MM-dd'),
      branch: 'Main Branch'
    },
    {
      teacher: 'Prof. John Davis',
      room: 'Room 2.1',
      time: '14:00',
      date: format(new Date(), 'yyyy-MM-dd'),
      branch: 'Downtown Branch'
    },
    {
      teacher: 'Maria Garcia',
      room: 'Room 1.2',
      time: '15:00',
      date: format(new Date(), 'yyyy-MM-dd'),
      branch: 'Main Branch'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex justify-between mb-8">
        {[1, 2, 3].map((number) => (
          <div
            key={number}
            className={`flex items-center ${number !== 3 ? 'flex-1' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= number
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {number}
            </div>
            {number !== 3 && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  step > number ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Details */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Lesson Type
            </label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={lessonType}
              onChange={(e) => setLessonType(e.target.value)}
            >
              <option value="">Select type...</option>
              <option value="group">Group Lesson (Fixed Sessions)</option>
              <option value="ondemand">On-demand Group</option>
              <option value="private">Private Lesson</option>
              <option value="trial">Trial Class</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Subject & Level
            </label>
            <div className="grid grid-cols-2 gap-4">
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                <option value="">Select subject...</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </select>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value="">Select level...</option>
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
                <option value="C2">C2</option>
              </select>
            </div>
          </div>

          {lessonType && (
            <div className="space-y-4">
              {(lessonType === 'group' || lessonType === 'ondemand') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Capacity
                  </label>
                  <input
                    type="number"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    min="1"
                    max="12"
                  />
                </div>
              )}

              {lessonType === 'group' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Number of Sessions
                  </label>
                  <input
                    type="number"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={sessions}
                    onChange={(e) => setSessions(e.target.value)}
                    min="1"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Step 2: Schedule Selection */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Preferred Schedule
            </label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>Any Day</option>
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
              </select>
              <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>Any Time</option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Branch Preference
            </label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option>Any Branch</option>
              <option>Main Branch</option>
              <option>Downtown Branch</option>
              <option>West Branch</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Teacher Preference
            </label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option>Any Teacher</option>
              <option>Dr. Sarah Miller</option>
              <option>Prof. John Davis</option>
              <option>Maria Garcia</option>
            </select>
          </div>
        </div>
      )}

      {/* Step 3: Suggestions */}
      {step === 3 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">
            Suggested Time Slots
          </h3>
          <div className="space-y-3">
            {suggestedSlots.map((slot, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg hover:bg-blue-50 cursor-pointer"
                onClick={() => {
                  alert('Demo: Slot selected! Click Create to confirm.')
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-gray-900">
                      {slot.date} at {slot.time}
                    </div>
                    <div className="text-sm text-gray-500">
                      {slot.teacher} • {slot.room}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{slot.branch}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <button
          className="btn bg-gray-100 text-gray-700 hover:bg-gray-200"
          onClick={step === 1 ? onClose : handleBack}
        >
          {step === 1 ? 'Cancel' : 'Back'}
        </button>
        <button
          className="btn btn-primary"
          onClick={step === 3 ? handleCreate : handleNext}
        >
          {step === 3 ? 'Create Lesson' : 'Next'}
        </button>
      </div>
    </div>
  )
}
