import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Course from '../Pages/Course'
import MainLayout from '../Layouts/MainLayout'
import Student from '../Pages/Student'
import Schedule from '../Pages/Shedule'
import CoursesList from '../Pages/CoursesList'
import ActiveStudentList from '../Pages/ActiveStudentList'


const Index = () => {
    return (
        <BrowserRouter>
            <Routes >
                <Route path='/' element={<MainLayout />}>
                    <Route index element={<Course />} />
                    <Route path="/student" element={<Student />} />
                    <Route path="/shedule" element={<Schedule />} /> 
                    <Route path="/courseList" element={<CoursesList />} /> 
                    <Route path="/active-student" element={<ActiveStudentList />} /> 
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Index