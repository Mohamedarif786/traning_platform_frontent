import React, { useEffect, useState } from "react";
import {
  Delete_Courses,
  getAllCourses,
  UpdateSchedule,
  Schedule_create,
  getAllSchedule,
} from "../api/api";
import { toast } from "react-toastify";
import moment from "moment";
const Schedule = () => {
  // Initial courses data
  const [schedule, setSchedule] = useState([]);
  const [scheduleData, setScheduleData] = useState({
    course_id: "",
    date: "",
    time: "",
  });

  const [courseList, setCourseList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  useEffect(() => {
    getAllCoursesFn();
    getAllSheduleFn();
  }, []);

  const getAllCoursesFn = async () => {
    try {
      const respose = await getAllCourses();
      console.log("data", respose.data.data);
      if (respose.data) {
        setCourseList(respose.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("scheduleData", scheduleData);
  }, [scheduleData]);
  const getAllSheduleFn = async () => {
    try {
      const respose = await getAllSchedule();
      if (respose.data) {
        setSchedule(respose.data.data);
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
        const { data } = await Schedule_create(scheduleData);
        if (data) {
          toast.success("Course form Submitted Successfully");
          getAllSheduleFn();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      // Update an existing course
      try {
        const { data } = await UpdateSchedule(editIndex, scheduleData);
        if (data) {
          toast.success("Course form Update  Successfully");
          getAllSheduleFn();
        }
      } catch (error) {
        console.log(error);
      }
      setEditIndex(null); // Reset edit state
    }

    // Clear form fields after submission
    setScheduleData({ course_id: "", date: "", time: "" });
  };

  // Handle edit course
  const handleEdit = (index) => {
    // console.log("schedule", schedule[index].course_id);
    setEditIndex(schedule[index].id);
    setScheduleData({
      course_id: schedule[index].course_id,
      date: schedule[index].date,
      time: schedule[index].time,
    });
  };

  // Handle delete course
  const handleDelete = async (index) => {
    // const updatedCourses = courses.filter((_, i) => i !== index);
    // setCourses(updatedCourses);

    const Delete_id = schedule[index]?.id;
    try {
      const { data } = await Delete_Courses(Delete_id);
      if (data) {
        toast.success("Course Deleted Successfully");
        getAllSheduleFn();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Shedule Management</h1>

      {/* Course Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="courseName" className="form-label">
            Course Name
          </label>
          {/* <select
            className="form-select"
            required
            onChange={(e) =>
              setScheduleData({ ...scheduleData, course_id: e.target.value })
            }
          >
            <option value="" disabled selected>
              Select a course
            </option>
            {courseList?.map((courseList, i) => (
              <option value={courseList.id} key={i}>
                {courseList.course_name}
              </option>
            ))}
          </select> */}

          <select
            className="form-select"
            required
            value={scheduleData.course_id || ""} // Set the value dynamically from state
            onChange={
              (e) =>
                setScheduleData({ ...scheduleData, course_id: e.target.value }) // Update state on change
            }
          >
            <option value="" disabled>
              Select a course
            </option>
            {courseList?.map((course, i) => (
              <option value={course.id} key={i}>
                {course.course_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="courseDescription" className="form-label">
            Course Date
          </label>
          <input
            type="date"
            className="form-control"
            required
            value={scheduleData.date}
            onChange={(e) =>
              setScheduleData({
                ...scheduleData,
                date: e.target.value,
              })
            }
          />
          {/* <textarea
            className="form-control"
            id="courseDescription"
            rows="3"
            value={scheduleData.course_description}
            onChange={(e) =>
              setScheduleData({
                ...scheduleData,
                course_description: e.target.value,
              })
            }
            required
          ></textarea> */}
        </div>

        <div className="mb-3">
          <label htmlFor="courseDescription" className="form-label">
            Course Time
          </label>
          <input
            type="time"
            className="form-control"
            required
            value={scheduleData.time}
            onChange={(e) => {
              const timeValue = e.target.value; // Get the HH:mm value
              const formattedTime = `${timeValue}:00`; // Append :00 to make it HH:mm:ss
              setScheduleData({
                ...scheduleData,
                time: formattedTime, // Save the formatted time in state
              });
            }}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {editIndex === null ? "Add Course" : "Update Course"}
        </button>
      </form>

      <hr />

      <h2>Schedule List</h2>
      {schedule.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <ul className="list-group">
          {schedule?.map((schedule, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5>Course : {schedule.course.course_name}</h5>
                <p>Date : {moment(schedule.Date).format("DD-MM-YYYY")}</p>
                <p>Time : {schedule.time}</p>
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

export default Schedule;
