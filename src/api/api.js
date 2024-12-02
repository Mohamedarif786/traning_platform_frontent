import { httpRequest } from "./axios";
export const Course_create = async (data) => {
    const res = await httpRequest({
      url: "/api/courses",
      method: "POST",
      data
    });
    return res;
};

export const getAllCourses = async () => {
    const res = await httpRequest({
      url: "/api/courses",
      method: "GET"
    });
    return res;
};


export const UpdateCourses = async (id,data) => {
    const res = await httpRequest({
      url: "/api/courses/"+id,
      method: "PUT",
      data
    });
    return res;
};

export const Delete_Courses = async (id) => {
    const res = await httpRequest({
      url: "/api/courses/"+id,
      method: "DELETE",
    });
    return res;
};


export const Student_create = async (data) => {
    const res = await httpRequest({
      url: "/api/student",
      method: "POST",
      data
    });
    return res;
};

export const getAllStudent = async () => {
    const res = await httpRequest({
      url: "/api/student",
      method: "GET"
    });
    return res;
};


export const UpdateStudent = async (id,data) => {
    const res = await httpRequest({
      url: "/api/student/"+id,
      method: "PUT",
      data
    });
    return res;
};

export const Delete_Student = async (id) => {
    const res = await httpRequest({
      url: "/api/student/"+id,
      method: "DELETE",
    });
    return res;
};


export const Schedule_create = async (data) => {
    const res = await httpRequest({
      url: "/api/schedule",
      method: "POST",
      data
    });
    return res;
};

export const getAllSchedule= async () => {
    const res = await httpRequest({
      url: "/api/schedule",
      method: "GET"
    });
    return res;
};


export const UpdateSchedule = async (id,data) => {
    const res = await httpRequest({
      url: "/api/schedule/"+id,
      method: "PUT",
      data
    });
    return res;
};

export const Delete_Schedule = async (id) => {
    const res = await httpRequest({
      url: "/api/schedule/"+id,
      method: "DELETE",
    });
    return res;
};


export const PunchInApi = async (data) => {
    const res = await httpRequest({
      url: "/api/opt-in",
      method: "POST",
      data
    });
    return res;
};


export const PunchOutApi = async (data) => {
    const res = await httpRequest({
      url: "/api/opt-out",
      method: "POST",
      data
    });
    return res;
};

export const getAllPunchInStudents = async (data) => {
    const res = await httpRequest({
      url: "/api/opt-in-list",
      method: "GET",
    });
    return res;
};


