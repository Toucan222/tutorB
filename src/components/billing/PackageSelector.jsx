import React, { useState } from 'react'
import { packages } from '../../data/mockData'

export default function PackageSelector() {
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleSelect = (pkg) => {
    setSelectedPackage(pkg)
    setShowConfirmation(true)
  }

  const handlePurchase = () => {
    alert('Demo: Package purchased successfully! In the full version, this would process payment and update credits.')
    setShowConfirmation(false)
    setSelectedPackage(null)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {packages.map(pkg => (
          <div 
            key={pkg.id} 
            className={`card cursor-pointer hover:shadow-md transition-shadow ${
              selectedPackage?.id === pkg.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => handleSelect(pkg)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{pkg.name}</h3>
                <p className="text-sm text-gray-500">{pkg.type}</p>
              </div>
              <span className="text-lg font-bold text-blue-600">${pkg.price}</span>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Sessions:</span>
                <span className="font-medium">{pkg.sessions}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Validity:</span>
                <span className="font-medium">{pkg.validity}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Confirm Purchase</h3>
            <p className="text-gray-600 mb-4">
              You are about to purchase {selectedPackage.name} for ${selectedPackage.price}
            </p>
            <div className="flex space-x-4">
              <button 
                className="btn btn-primary flex-1"
                onClick={handlePurchase}
              >
                Confirm
              </button>
              <button 
                className="btn bg-gray-100 text-gray-700 hover:bg-gray-200 flex-1"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
