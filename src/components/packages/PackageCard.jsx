import React from 'react'

export default function PackageCard({ package: pkg }) {
  return (
    <div className="card">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{pkg.name}</h3>
          <p className="text-sm text-gray-500">{pkg.type}</p>
        </div>
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {pkg.active ? 'Active' : 'Inactive'}
        </span>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Sessions:</span>
          <span className="font-medium">{pkg.sessions}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Validity:</span>
          <span className="font-medium">{pkg.validity}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Price:</span>
          <span className="font-medium">${pkg.price}</span>
        </div>
      </div>

      <div className="mt-4">
        <button className="btn btn-primary w-full">
          Purchase Package
        </button>
      </div>
    </div>
  )
}
