import React, { useEffect, useState } from "react";
import {
  Student_create,
  Delete_Student,
  getAllStudent,
  UpdateStudent,
} from "../api/api";
import { toast } from "react-toastify";

const Student = () => {
  const [student, setStudent] = useState([]);
  const [studentData, setStudentData] = useState({
    student_name: "",
    student_email: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  useEffect(() => {
    getAllstudentListFn();
  }, []);
  const getAllstudentListFn = async () => {
    try {
      const respose = await getAllStudent();
      console.log("data", respose.data.data);
      if (respose.data) {
        setStudent(respose.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Handle form submission to create or update course
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editIndex === null) {
      try {
        const { data } = await Student_create(studentData);
        if (data) {
          toast.success("Student form Submitted Successfully");
          getAllstudentListFn();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      // Update an existing course
      try {
        const { data } = await UpdateStudent(editIndex, studentData);
        if (data) {
          toast.success("Student form Update  Successfully");
          getAllstudentListFn();
        }
      } catch (error) {
        console.log(error);
      }
      setEditIndex(null); // Reset edit state
    }

    // Clear form fields after submission
    setStudentData({ student_name: "", student_email: "" });
  };

  // Handle edit course
  const handleEdit = (index) => {
    setEditIndex(student[index].id);
    setStudentData({
      student_name: student[index].student_name,
      student_email: student[index].student_email,
    });
  };

  // Handle delete course
  const handleDelete = async (index) => {
    // const updatedCourses = courses.filter((_, i) => i !== index);
    // setCourses(updatedCourses);

    const Delete_id = student[index]?.id;
    try {
      const { data } = await Delete_Student(Delete_id);
      if (data) {
        toast.success("Student Deleted Successfully");
        getAllstudentListFn();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Student Management</h1>

      {/* Course Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="courseName" className="form-label">
            Student Name
          </label>
          <input
            type="text"
            className="form-control"
            id="courseName"
            value={studentData.student_name}
            onChange={(e) =>
              setStudentData({ ...studentData, student_name: e.target.value })
            }
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="courseDescription" className="form-label">
            Student email
          </label>
          <input
            type="email"
            className="form-control"
            id="courseName"
            value={studentData.student_email}
            onChange={(e) =>
              setStudentData({ ...studentData, student_email: e.target.value })
            }
            required
          />
          {/* <textarea
            className="form-control"
            id="courseDescription"
            rows="3"
            value={studentData.course_description}
            onChange={(e) =>
                setStudentData({
                ...studentData,
                course_description: e.target.value,
              })
            }
            required
          ></textarea> */}
        </div>

        <button type="submit" className="btn btn-primary">
          {editIndex === null ? "Add Course" : "Update Course"}
        </button>
      </form>

      <hr />

      {/* Course List */}
      <h2>Student List</h2>
      {student.length === 0 ? (
        <p>No Student Data available.</p>
      ) : (
        <ul className="list-group">
          {student?.map((course, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5>{course.student_name}</h5>
                <p>{course.student_email}</p>
              </div>
              <div>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Student;
