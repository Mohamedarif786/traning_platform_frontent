import React, { useEffect, useState } from "react";
import { getAllSchedule, getAllStudent, PunchInApi, PunchOutApi } from "../api/api";
import moment from "moment";
import { toast } from "react-toastify"; // Assuming you're using react-toastify for notifications

const CoursesList = () => {
  const [courseList, setCourseList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState({});

  const handleStudentChange = (courseId, studentId) => {
    setSelectedStudents((prev) => ({
      ...prev,
      [courseId]: studentId, // Update the selected student for the specific course
    }));
  };

  useEffect(() => {
    getAllSheduleFn();
    getAllStudentList();
  }, []);

  const getAllSheduleFn = async () => {
    try {
      const response = await getAllSchedule();
      if (response.data) {
        setCourseList(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllStudentList = async () => {
    try {
      const response = await getAllStudent();
      if (response.data) {
        setStudentList(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const punchInFn = async (shedule_id,course_id) => {
    const selectedStudent = selectedStudents[shedule_id];
    if (!selectedStudent) {
      toast.error("Please select a student before punching in.");
      return;
    } else {
      try {
        let data = {
          student_id: selectedStudent,
          schedule_id: shedule_id,
          course_id:course_id
        };
        const response = await PunchInApi(data);
        console.log("data", response.data.message);

        if (response.data.success == true) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const punchOutFn = async (shedule_id,course_id) => {
    const selectedStudent = selectedStudents[shedule_id];
    if (!selectedStudent) {
      toast.error("Please select a student before punch Out.");
      return;
    } else {
      try {
        let data = {
          student_id: selectedStudent,
          schedule_id: shedule_id,
          course_id:course_id
        };
        const response = await PunchOutApi(data);

        if (response.data.success == true) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Course List</h1>
      <div className="courseList p-2 d-flex">
        {courseList.map((cLst, i) => (
          <div className="card m-2" style={{ width: "20%" }} key={i}>
            <div className="card-body">
              <h5>Course : {cLst.course.course_name}</h5>
              <p>Date : {moment(cLst.Date).format("DD-MM-YYYY")}</p>
              <p>Time : {cLst.time}</p>

              <div className="form-control">
                <label className="form-label">Select Student Name</label>
                <select
                  className="form-select"
                  required
                  value={selectedStudents[cLst.id] || ""}
                  onChange={(e) => handleStudentChange(cLst.id, e.target.value)}
                >
                  <option value="" disabled>
                    Select a Student
                  </option>
                  {studentList?.map((student, i) => (
                    <option value={student.id} key={i}>
                      {student.student_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="punch_punchout mt-2">
                <button
                  className="btn btn-success me-3"
                  onClick={() => punchInFn(cLst.id,cLst.course.id)}
                >
                  Punch In
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => punchOutFn(cLst.id,cLst.course.id)}
                >
                  Punch Out
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesList;
