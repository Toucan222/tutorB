import React from 'react'

export default function ProgressBar({ value, total, type = 'default' }) {
  const percentage = (value / total) * 100
  
  const colorClasses = {
    default: 'bg-blue-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    danger: 'bg-red-600'
  }

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        className={`h-2.5 rounded-full ${colorClasses[type]}`}
        style={{ width: `${percentage}%` }}
      />
      <div className="text-xs text-gray-600 mt-1">
        {value} / {total} lessons
      </div>
    </div>
  )
}
