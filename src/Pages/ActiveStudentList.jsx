import React, { useEffect, useState } from "react";
import { getAllPunchInStudents } from "../api/api";

const ActiveStudentList = () => {
  useEffect(() => {
    getAllPunchInStudentsFn();
  }, []);
  const [getAllPunchInStudentsList, setGetAllPunchInStudentsList] = useState([]);

  const getAllPunchInStudentsFn = async () => {
    try {
      const response = await getAllPunchInStudents();
      console.log(response.data.data);
      setGetAllPunchInStudentsList(response.data.data);
    } catch (error) {}
  };
  return (
    <div className="container">
      <h1 className="my-4">Punch In Student List</h1>
      <div className="courseList p-2 ">
        <div className="w-100">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Student Name</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody>
                {getAllPunchInStudentsList.map((val,i)=>(
                        <tr>
                        <td>{val.course.course_name}</td>
                        <td>{val.student.student_name}</td>
                        <td>Active</td>
                    </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActiveStudentList;
