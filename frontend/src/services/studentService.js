import api from "./api";

// Get all students
export const getAllStudents = () => api.get("/students");

// Get single student by ID
export const getStudentById = (id) => api.get(`/students/${id}`);

// Create a new student
export const createStudent = (studentData) =>
  api.post("/students", studentData);

// Update an existing student
export const updateStudent = (id, studentData) =>
  api.put(`/students/${id}`, studentData);

// Delete a student
export const deleteStudent = (id) => api.delete(`/students/${id}`);
