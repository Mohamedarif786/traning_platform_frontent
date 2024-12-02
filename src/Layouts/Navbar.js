import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
          <a className="navbar-brand" href="#">Training Platform</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link"  to='/'>Course</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/student'>Student</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/shedule'>Training Schedule</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/courseList'>Courses Timing and list</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/active-student'>Active Student List</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar