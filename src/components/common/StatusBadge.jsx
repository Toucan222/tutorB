import React from 'react'

export default function StatusBadge({ status, size = 'default' }) {
  const statusClasses = {
    active: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800',
    trial: 'bg-purple-100 text-purple-800'
  }

  const sizeClasses = {
    small: 'px-2 py-1 text-xs',
    default: 'px-3 py-1.5 text-sm',
    large: 'px-4 py-2 text-base'
  }

  return (
    <span className={`inline-flex items-center rounded-full font-medium
      ${statusClasses[status.toLowerCase()]} ${sizeClasses[size]}`}>
      {status}
    </span>
  )
}
