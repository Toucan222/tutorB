import React from 'react'

export default function StatsCard({ title, value, color = 'blue' }) {
  const colorClasses = {
    blue: 'text-blue-600',
    cyan: 'text-cyan-600',
    green: 'text-green-600'
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium mb-2 text-gray-900">{title}</h3>
      <p className={`text-3xl font-bold ${colorClasses[color]}`}>{value}</p>
    </div>
  )
}
