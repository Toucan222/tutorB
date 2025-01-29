import React from 'react'

const brands = [
  { id: 1, name: 'Spanish School', color: 'blue' },
  { id: 2, name: 'French Academy', color: 'red' },
  { id: 3, name: 'German Institute', color: 'yellow' }
]

export default function BrandSelector({ currentBrand, onSelect }) {
  return (
    <div className="relative">
      <select
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        value={currentBrand}
        onChange={(e) => onSelect(e.target.value)}
      >
        {brands.map(brand => (
          <option key={brand.id} value={brand.id}>
            {brand.name}
          </option>
        ))}
      </select>
    </div>
  )
}
