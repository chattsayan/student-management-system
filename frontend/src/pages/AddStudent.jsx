import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentForm from "../components/StudentForm";
import { createStudent } from "../services/studentService";
import styles from "./AddStudent.module.css";

function AddStudent() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAddStudent = async (studentData) => {
    try {
      setError("");
      await createStudent(studentData);
      navigate("/students");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Failed to add student. Please try again.";
      setError(message);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Add New Student</h2>
      {error && <p className={styles.error}>{error}</p>}
      <StudentForm onSubmit={handleAddStudent} submitLabel="Add Student" />
    </div>
  );
}

export default AddStudent;
