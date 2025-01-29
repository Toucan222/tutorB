import React, { useState } from 'react'

export default function Tooltip({ content, children }) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="relative inline-block">
      <div 
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      
      {isVisible && (
        <div className="absolute z-10 px-3 py-2 text-sm text-white bg-gray-900 
          rounded-lg shadow-sm -top-10 left-1/2 transform -translate-x-1/2">
          {content}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 
            border-4 border-transparent border-t-gray-900" />
        </div>
      )}
    </div>
  )
}
