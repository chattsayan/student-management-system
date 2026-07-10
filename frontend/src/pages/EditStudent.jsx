import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StudentForm from "../components/StudentForm";
import Spinner from "../components/Spinner";
import { getStudentById, updateStudent } from "../services/studentService";
import styles from "./EditStudent.module.css";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        setFetchError("");
        const response = await getStudentById(id);
        setStudent(response.data.data);
      } catch (err) {
        setFetchError("Failed to load student. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const handleUpdateStudent = async (studentData) => {
    try {
      setSubmitError("");
      await updateStudent(id, studentData);
      navigate(`/students/${id}`);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Failed to update student. Please try again.";
      setSubmitError(message);
    }
  };

  if (loading) return <Spinner />;

  if (fetchError) {
    return (
      <div className={styles.container}>
        <p className={styles.error}>{fetchError}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Edit Student</h2>
      {submitError && <p className={styles.error}>{submitError}</p>}
      <StudentForm
        key={student._id}
        onSubmit={handleUpdateStudent}
        initialData={{
          name: student.name,
          email: student.email,
          course: student.course,
          age: student.age,
          city: student.city,
        }}
        submitLabel="Update Student"
      />
    </div>
  );
}

export default EditStudent;
