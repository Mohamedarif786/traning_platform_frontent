import React, { useEffect, useState } from "react";
import { Course_create, Delete_Courses, getAllCourses, UpdateCourses } from "../api/api";
import { toast } from "react-toastify";
const Course = () => {
  // Initial courses data
  const [courses, setCourses] = useState([]);
  const [courseData, setCourseData] = useState({
    course_name: "",
    course_description: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  useEffect(() => {
    getAllCoursesFn();
  }, []);
  const getAllCoursesFn = async () => {
    try {
      const respose = await getAllCourses();
      console.log("data", respose.data.data);
      if (respose.data) {
        setCourses(respose.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editIndex === null) {
      try {
        const { data } = await Course_create(courseData);
        if (data) {
          toast.success("Course form Submitted Successfully");
          getAllCoursesFn();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data } = await UpdateCourses(editIndex, courseData);
        if (data) {
          toast.success("Course form Update  Successfully");
          getAllCoursesFn();
        }
      } catch (error) {
        console.log(error);
      }
      setEditIndex(null); // Reset edit state
    }
    setCourseData({ course_name: "", course_description: "" });
  };

  const handleEdit = (index) => {
    setEditIndex(courses[index].id);
    setCourseData({
      course_name: courses[index].course_name,
      course_description: courses[index].course_description,
    });
  };

  const handleDelete = async(index) => {
    // const updatedCourses = courses.filter((_, i) => i !== index);
    // setCourses(updatedCourses);

    const Delete_id = courses[index]?.id;
    try {
      const { data } = await Delete_Courses(Delete_id);
      if (data) {
        toast.success("Course Deleted Successfully");
        getAllCoursesFn();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Course Management</h1>

      {/* Course Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="courseName" className="form-label">
            Course Name
          </label>
          <input
            type="text"
            className="form-control"
            id="courseName"
            value={courseData.course_name}
            onChange={(e) =>
              setCourseData({ ...courseData, course_name: e.target.value })
            }
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="courseDescription" className="form-label">
            Course Description
          </label>
          <textarea
            className="form-control"
            id="courseDescription"
            rows="3"
            value={courseData.course_description}
            onChange={(e) =>
              setCourseData({
                ...courseData,
                course_description: e.target.value,
              })
            }
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          {editIndex === null ? "Add Course" : "Update Course"}
        </button>
      </form>

      <hr />

      {/* Course List */}
      <h2>Courses</h2>
      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <ul className="list-group">
          {courses?.map((course, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5>{course.course_name}</h5>
                <p>{course.course_description}</p>
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

export default Course;
