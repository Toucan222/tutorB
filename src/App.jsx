import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Schedule from './pages/Schedule'
import Students from './pages/Students'
import Teachers from './pages/Teachers'
import Rooms from './pages/Rooms'
import Billing from './pages/Billing'
import StudentExample from './pages/StudentExample'
import TeacherExample from './pages/TeacherExample'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="students" element={<Students />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="billing" element={<Billing />} />
        <Route path="student-example" element={<StudentExample />} />
        <Route path="teacher-example" element={<TeacherExample />} />
      </Route>
    </Routes>
  )
}
