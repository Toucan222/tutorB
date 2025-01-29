import React, { useState } from 'react'
import { students, teachers, rooms, lessons, families } from '../data/mockData'
import StatsCard from '../components/StatsCard'

export default function Billing() {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showLinkModal, setShowLinkModal] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState('invoice')
  const [generatedLink, setGeneratedLink] = useState('')

  // Calculate demo insights
  const totalRevenue = families.reduce((sum, family) => sum + family.billing.balance, 0)
  const pendingPayments = families.filter(f => f.billing.status === 'Pending').length
  const activeStudents = students.filter(s => s.status === 'Active').length
  const averageRevenuePerStudent = totalRevenue / activeStudents

  const teacherPayments = teachers.reduce((sum, teacher) => {
    const baseHours = 32 // Demo: Assuming average hours
    return sum + (baseHours * teacher.wage.base)
  }, 0)

  const roomUtilization = rooms.filter(r => !r.availability).length / rooms.length * 100

  // Demo templates
  const paymentTemplates = [
    { id: 'invoice', name: 'Standard Invoice' },
    { id: 'reminder', name: 'Payment Reminder' },
    { id: 'receipt', name: 'Payment Receipt' },
    { id: 'package', name: 'Package Purchase' }
  ]

  const handleGenerateLink = () => {
    // Demo: Generate a fake payment link
    const demoLink = `https://demo-payment.tutorbase.edu/pay/${Math.random().toString(36).substr(2, 9)}`
    setGeneratedLink(demoLink)
    setShowLinkModal(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Billing & Payments</h1>
        <div className="flex space-x-3">
          <button 
            className="btn bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
            onClick={() => setShowPaymentModal(true)}
          >
            Create Payment Request
          </button>
          <button 
            className="btn btn-primary"
            onClick={handleGenerateLink}
          >
            Generate Payment Link
          </button>
        </div>
      </div>

      {/* Revenue Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          title="Total Revenue" 
          value={`$${totalRevenue.toLocaleString()}`}
          color="green"
        />
        <StatsCard 
          title="Pending Payments" 
          value={pendingPayments}
          color="yellow"
        />
        <StatsCard 
          title="Avg. Revenue/Student" 
          value={`$${averageRevenuePerStudent.toFixed(2)}`}
          color="blue"
        />
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Breakdown */}
        <div className="card">
          <h2 className="text-lg font-medium mb-4">Revenue Breakdown</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Student Packages</span>
              <span className="font-medium">${(totalRevenue * 0.8).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Trial Classes</span>
              <span className="font-medium">${(totalRevenue * 0.1).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Materials & Resources</span>
              <span className="font-medium">${(totalRevenue * 0.1).toFixed(2)}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full mt-2">
              <div className="h-2 bg-blue-600 rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>
        </div>

        {/* Expenses Overview */}
        <div className="card">
          <h2 className="text-lg font-medium mb-4">Expenses Overview</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Teacher Payments</span>
              <span className="font-medium">${teacherPayments.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Room Utilization</span>
              <span className="font-medium">{roomUtilization.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Operating Costs</span>
              <span className="font-medium">${(teacherPayments * 0.3).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <h2 className="text-lg font-medium mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Family</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {families.map((family) => (
                <tr key={family.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {new Date().toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{family.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">Package Payment</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">${family.billing.balance}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      family.billing.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {family.billing.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Request Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Create Payment Request</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowPaymentModal(false)}
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Template Type</label>
                <select 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                >
                  {paymentTemplates.map(template => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Family</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  {families.map(family => (
                    <option key={family.id} value={family.id}>
                      {family.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Due Date</label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                  placeholder="Add any additional notes..."
                />
              </div>
              <button 
                className="btn btn-primary w-full"
                onClick={() => {
                  alert('Demo: Payment request created successfully!')
                  setShowPaymentModal(false)
                }}
              >
                Create Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Link Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Payment Link Generated</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowLinkModal(false)}
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-md break-all">
                <p className="text-sm font-mono">{generatedLink}</p>
              </div>
              <p className="text-sm text-gray-500">
                Share this link with the customer to receive payment. The link will expire in 24 hours.
              </p>
              <button 
                className="btn btn-primary w-full"
                onClick={() => {
                  alert('Demo: Link copied to clipboard!')
                  setShowLinkModal(false)
                }}
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
